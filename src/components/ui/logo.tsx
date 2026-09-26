import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  return <span className={`logo-mark ${className}`} aria-hidden="true"><svg viewBox="0 0 28 28" fill="none"><path d="M8 6v15h13M13 6v10h8" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>;
}
export function Logo() {
  return <Link href="/" className="brand" aria-label="Life OS — página inicial"><LogoMark /><span>Life <span className="brand-os">OS</span></span></Link>;
}
