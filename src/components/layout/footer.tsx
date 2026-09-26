import Link from "next/link";
import { institutionalLinks, siteConfig } from "@/lib/site-config";
import { Container } from "./container";
import { Logo } from "../ui/logo";

export function Footer() {
  return <footer className="footer"><Container>
    <div className="footer-top"><div><Logo /><p>Mais clareza para o seu dia.<br />Mais espaço para a sua vida.</p></div><nav aria-label="Links institucionais">{institutionalLinks.map(link => <Link href={link.href} key={link.href}>{link.label}</Link>)}{siteConfig.socialLinks.map(link => <a href={link.url} key={link.url} rel="noopener noreferrer" target="_blank">{link.label}</a>)}</nav></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Life OS</span><span>Feito para a vida real.<span className="footer-dot" /></span></div>
  </Container></footer>;
}
