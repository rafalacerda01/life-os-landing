import Link from "next/link";
import Image from "next/image";

export function LogoMark({ className = "", eager = false }: { className?: string; eager?: boolean }) {
  return <span className={["logo-mark", className].join(" ")} aria-hidden="true"><Image src="/branding/life-os-mark.png" alt="" width={256} height={256} sizes="64px" loading={eager ? "eager" : "lazy"} /></span>;
}
export function Logo() {
  return <Link href="/" className="brand" aria-label="Life OS — página inicial"><LogoMark eager /><span>Life <span className="brand-os">OS</span></span></Link>;
}
