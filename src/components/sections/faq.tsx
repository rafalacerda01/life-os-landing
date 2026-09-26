import { faqs } from "@/content/home";
import { Section, SectionHeading } from "../ui/section";
import { Icon } from "../ui/icon";
import Link from "next/link";

export function FAQ() {
  return <Section id="faq"><div className="faq-layout"><div><SectionHeading eyebrow="05 / SEM COMPLICAÇÃO" title={<>Algumas perguntas.<br />Respostas claras.</>} description="O que você precisa saber sobre o Life OS nesta primeira etapa." /><Link href="/support" className="text-button">Central de suporte<Icon name="arrow" size={17} /></Link></div><div className="faq-list" data-reveal="small">{faqs.map(faq => <details key={faq.question} className="faq-item"><summary>{faq.question}<Icon name="plus" size={18} /></summary><p>{faq.answer}</p></details>)}</div></div></Section>;
}
