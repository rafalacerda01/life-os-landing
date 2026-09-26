import type { ReactNode } from "react";
import { Container } from "../layout/container";

export function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`section ${className}`}><Container>{children}</Container></section>;
}
export function SectionHeading({ eyebrow, title, description, centered = false }: { eyebrow: string; title: ReactNode; description?: string; centered?: boolean }) {
  return <div className={`section-heading ${centered ? "centered" : ""}`}><div data-reveal><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{description ? <p data-reveal="small" style={{ "--reveal-delay": "85ms" } as React.CSSProperties}>{description}</p> : null}</div>;
}
