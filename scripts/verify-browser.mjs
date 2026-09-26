import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const siteOrigin = process.env.TEST_SITE_ORIGIN?.trim() ? new URL(process.env.TEST_SITE_ORIGIN).origin : null;
const scenario = siteOrigin ? "public-origin" : "prepublication";
const executable = process.env.BROWSER_EXECUTABLE_PATH ?? [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
].find(existsSync);
assert(process.env.BROWSER_CDP_URL || executable, "Configure BROWSER_CDP_URL ou BROWSER_EXECUTABLE_PATH para um navegador de teste.");
const browser = process.env.BROWSER_CDP_URL
  ? await chromium.connectOverCDP(process.env.BROWSER_CDP_URL)
  : await chromium.launch({ executablePath: executable, headless: true });
const results = [];
const errors = [];
const artifactDir = new URL(`../artifacts/premium-dynamic/${scenario}/`, import.meta.url);
await mkdir(artifactDir, { recursive: true });

function monitor(page) {
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  page.on("requestfailed", request => { if (!request.failure()?.errorText.includes("ERR_ABORTED")) errors.push(`${request.failure()?.errorText} ${request.url()}`); });
}

async function noOverflow(page, label) {
  const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
  assert(dimensions.content <= dimensions.viewport + 1, `${label}: overflow horizontal ${JSON.stringify(dimensions)}`);
}

async function verifyHomeMetadata(page) {
  assert.match(await page.title(), /Life OS/);
  assert((await page.locator('meta[name="description"]').getAttribute("content")).length > 30);
  assert.equal(await page.locator('meta[property="og:locale"]').getAttribute("content"), "pt_BR");
  const canonical = page.locator('link[rel="canonical"]');
  const jsonLd = page.locator('script[type="application/ld+json"]');
  if (siteOrigin) {
    assert.equal(new URL(await canonical.getAttribute("href")).href, new URL("/", siteOrigin).href);
    assert.equal(await jsonLd.count(), 1);
    const data = JSON.parse(await jsonLd.textContent());
    assert.equal(data["@type"], "WebSite");
    assert.equal(data.url, siteOrigin);
    assert.deepEqual(Object.keys(data).sort(), ["@context", "@type", "description", "inLanguage", "name", "url"]);
    assert.doesNotMatch(await page.locator('meta[name="robots"]').getAttribute("content"), /noindex/);
    assert.equal(await page.locator('meta[property="og:url"]').getAttribute("content"), siteOrigin);
    assert.equal(await page.locator('meta[property="og:image"]').getAttribute("content"), `${siteOrigin}/social-image`);
    assert.equal(await page.locator('meta[name="twitter:card"]').getAttribute("content"), "summary_large_image");
  } else {
    assert.equal(await canonical.count(), 0);
    assert.equal(await jsonLd.count(), 0);
    assert.match(await page.locator('meta[name="robots"]').getAttribute("content"), /noindex/);
    assert.equal(await page.locator('meta[property="og:url"]').count(), 0);
    assert.equal(await page.locator('meta[property="og:image"]').count(), 0);
  }
}

async function verifyMobileMenu(page, viewport) {
  const toggle = page.locator(".menu-toggle");
  const panel = page.locator("#mobile-navigation");
  await toggle.focus();
  await page.keyboard.press("Space");
  assert.equal(await toggle.getAttribute("aria-expanded"), "true");
  const bounds = await panel.boundingBox();
  assert(bounds.y + bounds.height <= viewport.height + 1, "Painel excede a viewport real");
  const closeBounds = await toggle.boundingBox();
  assert(closeBounds.y >= 0 && closeBounds.y + closeBounds.height <= viewport.height, "Fechar deve continuar acessível");
  if (viewport.height <= 320) {
    assert(await panel.evaluate(element => element.scrollHeight > element.clientHeight), "Menu baixo deve oferecer scroll interno");
    await panel.evaluate(element => { element.scrollTop = element.scrollHeight; });
    const status = await panel.locator(".cta-pending").boundingBox();
    assert(status.y >= bounds.y && status.y + status.height <= viewport.height + 1, "CTA inferior deve ser visível ao rolar");
    assert.deepEqual(await toggle.boundingBox(), closeBounds, "Scroll interno não deve mover o botão de fechar");
    await panel.evaluate(element => { element.scrollTop = 0; });
    await page.screenshot({ path: fileURLToPath(new URL(`${viewport.name}-menu-open.png`, artifactDir)) });
    await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(150);
    assert(await panel.evaluate(element => element.scrollTop > 0), "Wheel deve rolar o painel");
  }
  await toggle.focus();
  for (let index = 0; index < 4; index++) await page.keyboard.press("Tab");
  const faq = panel.getByRole("link", { name: "FAQ" });
  assert(await faq.evaluate(element => element === document.activeElement), "Todos os itens devem ser acessíveis com Tab");
  const faqBounds = await faq.boundingBox();
  assert(faqBounds.y >= bounds.y - 1 && faqBounds.y + faqBounds.height <= viewport.height + 1, "Foco deve rolar o item para dentro do painel");
  await page.keyboard.press("Escape");
  assert.equal(await toggle.getAttribute("aria-expanded"), "false");
  assert(await toggle.evaluate(element => element === document.activeElement));
  await toggle.click();
  await toggle.click();
  assert.equal(await toggle.getAttribute("aria-expanded"), "false");
  assert(await toggle.evaluate(element => element === document.activeElement));
  await toggle.click();
  await panel.getByRole("link", { name: "Recursos" }).click();
  await page.waitForURL("**/#recursos");
  assert.equal(await toggle.getAttribute("aria-expanded"), "false");
  assert(await toggle.evaluate(element => element === document.activeElement));
  await noOverflow(page, `${viewport.name} menu`);
}

function contrast(foreground, background) {
  const luminance = hex => {
    const rgb = hex.match(/[a-f\d]{2}/gi).map(channel => parseInt(channel, 16) / 255).map(channel => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4);
    return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
  };
  const a = luminance(foreground), b = luminance(background);
  return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
}

try {
  const context = await browser.newContext();
  const page = await context.newPage();
  monitor(page);
  for (const viewport of [{ width: 568, height: 256, name: "landscape-256" }, { width: 568, height: 320, name: "landscape-320" }, { width: 320, height: 568, name: "small-mobile" }, { width: 390, height: 844, name: "mobile" }, { width: 768, height: 1024, name: "tablet" }, { width: 1440, height: 1000, name: "desktop" }, { width: 1920, height: 1080, name: "wide" }]) {
    await page.setViewportSize(viewport);
    const response = await page.goto(baseUrl, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200);
    assert.equal(await page.locator("main h1").count(), 1);
    assert.equal(await page.locator('html').getAttribute("lang"), "pt-BR");
    assert.equal(await page.locator('a[href="#"]').count(), 0);
    assert.equal(await page.locator('a[href*="play.google"]').count(), 0);
    await verifyHomeMetadata(page);
    assert.match(await page.locator(".product-preview figcaption").innerText(), /Não representa uma tela real/);
    await noOverflow(page, viewport.name);

    if (viewport.width < 900) {
      await verifyMobileMenu(page, viewport);
    }

    await page.locator(".feature-card").first().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => {
      const element = document.querySelector(".feature-reveal");
      return element && !element.classList.contains("reveal-pending") && Number(getComputedStyle(element).opacity) >= .999;
    });
    assert.equal(await page.locator(".feature-card").first().evaluate(element => getComputedStyle(element).opacity), "1");
    assert(Number(await page.locator(".feature-reveal").first().evaluate(element => getComputedStyle(element).opacity)) >= .999);
    if (viewport.width >= 900) {
      const card = page.locator(".feature-card").first();
      await page.mouse.move(0, 0);
      await page.waitForTimeout(250);
      const before = await card.boundingBox();
      await card.hover();
      await page.waitForTimeout(300);
      const after = await card.boundingBox();
      assert(Math.abs((before.y - after.y) - 3) < .5, "Hover deve elevar apenas 3 px");
      assert.equal(before.width, after.width);
      assert.equal(before.height, after.height);
      await page.mouse.move(0, 0);
    }

    // Visit every section with motion enabled; verify reveal never leaves content hidden.
    for (const id of ["recursos", "como-funciona", "offline", "ai-companion", "privacidade", "premium", "faq", "comece"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      await noOverflow(page, `${viewport.name} ${id}`);
    }
    await page.locator(".system-map").scrollIntoViewIfNeeded();
    await page.waitForTimeout(850);
    assert(Number(await page.locator(".map-core").evaluate(element => getComputedStyle(element).opacity)) >= .999);
    assert(await page.locator(".map-node > span").evaluateAll(elements => elements.every(element => Number(getComputedStyle(element).opacity) >= .999)));
    const details = page.locator(".faq-item").first();
    await details.locator("summary").focus();
    await page.keyboard.press("Enter");
    assert.equal(await details.getAttribute("open"), "");
    assert(await details.locator("p").isVisible());
    await page.keyboard.press("Enter");
    assert.equal(await details.getAttribute("open"), null);
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
    assert(await page.locator(".header").evaluate(element => element.classList.contains("header-scrolled")));
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(700);
    await page.screenshot({ path: new URL(`${viewport.name}.png`, artifactDir).pathname.replace(/^\/(\w:)/, "$1") });
    if (["small-mobile", "mobile", "tablet", "desktop", "wide"].includes(viewport.name)) {
      // Full captures show all conceptual elements, independent of animation timing.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.screenshot({ path: new URL(`${viewport.name}-full.png`, artifactDir).pathname.replace(/^\/(\w:)/, "$1"), fullPage: true });
      await page.emulateMedia({ reducedMotion: "no-preference" });
    }
    if (["small-mobile", "mobile", "tablet", "desktop", "wide"].includes(viewport.name)) {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); });
      for (const id of ["produto", "recursos", "como-funciona", "offline", "ai-companion", "privacidade", "premium", "faq", "comece"]) {
        await page.locator(`#${id}`).screenshot({ path: fileURLToPath(new URL(`${viewport.name}-${id}.png`, artifactDir)), style: ".header, .skip-link { visibility: hidden !important; }" });
      }
      await page.locator(".footer").screenshot({ path: fileURLToPath(new URL(`${viewport.name}-footer.png`, artifactDir)) });
      await page.emulateMedia({ reducedMotion: "no-preference" });
    }
    results.push({ viewport: viewport.name, dimensions: `${viewport.width}x${viewport.height}`, result: "PASS", checks: "render, overflow, menu baixo/scroll interno, foco, teclado, FAQ, header, reveal e mapa" });
  }

  // Real touch events in the exact short landscape viewport reported by review.
  const touch = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 568, height: 256 } });
  const touchPage = await touch.newPage();
  monitor(touchPage);
  await touchPage.goto(baseUrl, { waitUntil: "networkidle" });
  await touchPage.locator(".menu-toggle").tap();
  const touchPanel = touchPage.locator("#mobile-navigation");
  const panelBounds = await touchPanel.boundingBox();
  const cdp = await touch.newCDPSession(touchPage);
  const x = panelBounds.x + panelBounds.width / 2;
  const startY = panelBounds.y + panelBounds.height - 20;
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y: startY }] });
  for (let step = 1; step <= 6; step++) {
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: startY - step * 20 }] });
    await touchPage.waitForTimeout(25);
  }
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await touchPage.waitForTimeout(200);
  assert(await touchPanel.evaluate(element => element.scrollTop > 0), "Gesto de toque deve rolar o menu");
  await touchPanel.getByRole("link", { name: "FAQ" }).tap();
  await touchPage.waitForURL("**/#faq");
  assert.equal(await touchPage.locator(".menu-toggle").getAttribute("aria-expanded"), "false");
  await noOverflow(touchPage, "Toque landscape");
  await touch.close();
  results.push({ scenario: "Toque 568x256", result: "PASS", checks: "tap, swipe interno, último link e fechamento" });

  for (const route of ["privacy", "terms", "support", "account-deletion"]) {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`${baseUrl}/${route}`, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200);
    assert.equal(await page.locator("main h1").count(), 1);
    assert.match(await page.locator(".pending-notice").innerText(), /pendente de revisão/);
    assert.match(await page.locator('meta[name="robots"]').getAttribute("content"), /noindex/);
    const crawlerResponse = await context.request.get(`${baseUrl}/${route}`, { headers: { "User-Agent": "Googlebot" } });
    assert.equal(crawlerResponse.status(), 200);
    assert.match(await crawlerResponse.text(), /name="robots" content="noindex, follow"/);
    if (siteOrigin) assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `${siteOrigin}/${route}`);
    await noOverflow(page, route);
    results.push({ route: `/${route}`, result: "PASS", checks: "HTTP 200, metadata, aviso editorial, overflow mobile" });
  }
  await page.screenshot({ path: new URL("institutional-mobile.png", artifactDir).pathname.replace(/^\/(\w:)/, "$1"), fullPage: true });

  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJsPage = await noJs.newPage();
  await noJsPage.goto(baseUrl, { waitUntil: "networkidle" });
  assert.match(await noJsPage.locator("h1").innerText(), /Organize sua vida/);
  assert.equal(await noJsPage.locator(".reveal-pending").count(), 0);
  assert(await noJsPage.locator(".feature-card").first().isVisible());
  await noJsPage.locator(".faq-item summary").first().click();
  assert.equal(await noJsPage.locator(".faq-item").first().getAttribute("open"), "");
  await noJs.close();
  results.push({ scenario: "Sem JavaScript", result: "PASS", checks: "conteúdo visível e FAQ nativo" });

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  assert(await page.locator(".reveal-pending").count() > 0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(() => document.querySelectorAll(".reveal-pending").length === 0);
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  assert.equal(await page.locator(".reveal-pending").count(), 0);
  assert.equal(await page.locator(".hero-aura").evaluate(element => getComputedStyle(element, "::before").animationName), "none");
  assert.equal(await page.locator(".preview-float").evaluate(element => getComputedStyle(element).animationName), "none");
  assert.equal(await page.locator(".map-core").evaluate(element => getComputedStyle(element, "::before").animationName), "none");
  assert.equal(await page.locator(".final-cta").evaluate(element => getComputedStyle(element, "::before").animationName), "none");
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), "auto");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.waitForFunction(() => document.querySelectorAll(".reveal-pending").length > 0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(() => document.querySelectorAll(".reveal-pending").length === 0);
  results.push({ scenario: "Prefers reduced motion", result: "PASS", checks: "preferência inicial e mudança em runtime, sem floating, breathing ou conteúdo oculto" });

  const brokenAnchors = await page.evaluate(() => Array.from(document.querySelectorAll('a[href*="#"]')).map(link => new URL(link.href)).filter(url => url.pathname === "/" && url.hash && !document.getElementById(url.hash.slice(1))).map(url => url.hash));
  assert.deepEqual(brokenAnchors, []);
  const robots = await context.request.get(`${baseUrl}/robots.txt`);
  assert.equal(robots.status(), 200);
  const robotsText = await robots.text();
  if (siteOrigin) {
    assert.match(robotsText, /^Allow: \/$/m);
    assert.doesNotMatch(robotsText, /^Disallow:\s*\S+/m);
    assert(robotsText.includes(`Sitemap: ${siteOrigin}/sitemap.xml`));
  } else {
    assert.match(robotsText, /^Disallow: \/$/m);
    assert.doesNotMatch(robotsText, /Sitemap:/);
  }
  const sitemap = await context.request.get(`${baseUrl}/sitemap.xml`);
  assert.equal(sitemap.status(), 200);
  const sitemapText = await sitemap.text();
  const locations = Array.from(sitemapText.matchAll(/<loc>(.*?)<\/loc>/g), match => new URL(match[1]).href);
  assert.deepEqual(locations, siteOrigin ? [new URL("/", siteOrigin).href] : []);
  for (const route of ["privacy", "terms", "support", "account-deletion"]) assert(!locations.some(url => new URL(url).pathname === `/${route}`));
  const social = await context.request.get(`${baseUrl}/social-image`);
  assert.equal(social.status(), 200);
  assert.match(social.headers()["content-type"], /image\/png/);
  const missing = await context.request.get(`${baseUrl}/pagina-inexistente`);
  assert.equal(missing.status(), 404);
  results.push({ scenario: `SEO ${scenario}`, result: "PASS", checks: "canonical, metadata, JSON-LD, crawling, noindex, sitemap e PNG social", robots: robotsText.trim(), sitemapLocations: locations });

  // Worst stops of the gradient and actual solid text/surface tokens.
  for (const [label, foreground, background] of [["CTA / final roxo", "#ffffff", "#B026FF"], ["CTA / início roxo", "#ffffff", "#5D0EFF"], ["Texto secundário / surface", "#939eb4", "#11182E"], ["Hero / gradiente", "#a675e7", "#070B14"], ["Texto secundário / Premium", "#8f9bb1", "#211532"]]) {
    const ratio = contrast(foreground, background);
    assert(ratio >= 4.5, `${label}: contraste ${ratio.toFixed(2)} abaixo de 4.5`);
    results.push({ contrast: label, ratio: Number(ratio.toFixed(2)), result: "PASS" });
  }
  assert.deepEqual(errors, [], "Erros de console, runtime, requisições ou HTTP");
  results.push({ scenario: "Console e runtime", result: "PASS", errors: 0 });
  await context.close();
  await writeFile(new URL("verification.json", artifactDir), JSON.stringify({ baseUrl, siteOrigin, results }, null, 2));
  console.log(JSON.stringify({ baseUrl, siteOrigin, results }, null, 2));
} finally {
  await browser.close();
}
