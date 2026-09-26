import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir, open, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const nextCli = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const worker = fileURLToPath(new URL("./verify-browser.mjs", import.meta.url));
const artifactDir = new URL("../artifacts/premium-dynamic/", import.meta.url);
await mkdir(artifactDir, { recursive: true });

async function freePort() {
  const server = createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const port = server.address().port;
  await new Promise(resolve => server.close(resolve));
  return port;
}

async function run(args, env, logName) {
  const log = await open(new URL(logName, artifactDir), "w");
  try {
    const child = spawn(process.execPath, args, { cwd: root, env, stdio: ["ignore", log.fd, log.fd], windowsHide: true });
    const [code] = await once(child, "exit");
    assert.equal(code, 0, `Falha: ${args.join(" ")}. Consulte artifacts/premium-dynamic/${logName}`);
  } finally { await log.close(); }
}

async function waitForServer(url, server) {
  const timeout = Date.now() + 60_000;
  while (Date.now() < timeout) {
    assert.equal(server.exitCode, null, "O servidor de teste encerrou antes de ficar pronto.");
    try { if ((await fetch(url, { signal: AbortSignal.timeout(1500) })).ok) return; } catch { /* Starting. */ }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error(`Servidor de teste indisponível: ${url}`);
}

// Next.js may update generated type paths for a custom distDir. Restore only
// the local files it touches so test paths never leak into normal development.
const configPaths = ["tsconfig.json", "next-env.d.ts"];
const configSnapshots = await Promise.all(configPaths.map(path => readFile(new URL(`../${path}`, import.meta.url))));
try {
for (const scenario of [
  { name: "prepublication", origin: "" },
  // .test is reserved for testing. Never persisted to .env or site configuration.
  { name: "public-origin", origin: "https://life-os-landing.test" },
]) {
  console.log(`[${scenario.name}] Gerando build de produção isolado…`);
  const env = { ...process.env, NEXT_PUBLIC_SITE_URL: scenario.origin, LIFE_OS_BROWSER_TEST: scenario.name, NEXT_TELEMETRY_DISABLED: "1" };
  await run([nextCli, "build"], env, `build-${scenario.name}.log`);
  const port = await freePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const log = await open(new URL(`server-${scenario.name}.log`, artifactDir), "w");
  const server = spawn(process.execPath, [nextCli, "start", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: root, env, stdio: ["ignore", log.fd, log.fd], windowsHide: true });
  try {
    await waitForServer(baseUrl, server);
    console.log(`[${scenario.name}] Verificando menu baixo, motion, acessibilidade funcional e SEO…`);
    await run([worker], { ...env, TEST_BASE_URL: baseUrl, TEST_SITE_ORIGIN: scenario.origin, TEST_SCENARIO: scenario.name }, `browser-${scenario.name}.log`);
    console.log(`[${scenario.name}] PASS — evidências em artifacts/premium-dynamic/${scenario.name}/`);
  } finally {
    if (server.exitCode === null) { server.kill(); await once(server, "exit"); }
    await log.close();
  }
}
} finally {
  await Promise.all(configPaths.map((path, index) => writeFile(new URL(`../${path}`, import.meta.url), configSnapshots[index])));
}

console.log("PASS — os dois estados SEO foram validados em produção local. A configuração normal permanece sem domínio presumido.");
