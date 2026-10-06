import Link from "next/link";
import { Container } from "./container";
import { Icon } from "../ui/icon";
import { institutionalLinks } from "@/lib/site-config";

export type InstitutionalSection = { title: string; content: string; steps?: string[]; pending?: boolean };

export function InstitutionalPage({ title, description, notice, noticeTitle = "Conteúdo jurídico pendente de revisão e publicação", sections }: { title: string; description: string; notice: string; noticeTitle?: string; sections: InstitutionalSection[] }) {
  return <Container className="institutional-page">
    <Link href="/" className="text-button back-link"><Icon name="arrow" className="back-arrow" size={17} />Voltar ao Life OS</Link><span className="eyebrow">LIFE OS / INSTITUCIONAL</span><h1>{title}</h1><p className="institutional-description">{description}</p>
    <div className="pending-notice"><Icon name="shield" size={22} /><div><b>{noticeTitle}</b><p>{notice}</p></div></div>
    <div className="institutional-layout">
      <nav aria-label="Nesta página" className="institutional-toc"><span className="eyebrow">NESTA PÁGINA</span>{sections.map((section, i) => <a href={"#section-" + (i + 1)} key={section.title}>{String(i + 1).padStart(2, "0")} · {section.title}</a>)}</nav>
      <div className="institutional-content">{sections.map((section, i) => <section id={"section-" + (i + 1)} key={section.title}><h2>{section.title}</h2><p>{section.content}</p>{section.steps ? <ol className="institutional-steps">{section.steps.map(step => <li key={step}>{step}</li>)}</ol> : null}{section.pending ? <span className="draft-label">Esta parte depende de confirmação e revisão</span> : null}</section>)}</div>
    </div>
    <nav aria-label="Outras páginas institucionais" className="institutional-related">{institutionalLinks.map(link => <Link key={link.href} href={link.href}>{link.label}<Icon name="arrowUp" size={15} /></Link>)}</nav>
  </Container>;
}
