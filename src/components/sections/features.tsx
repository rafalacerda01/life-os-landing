import type { CSSProperties } from "react";
import { features, featureGroups } from "@/content/home";
import { Icon } from "../ui/icon";
import { Section, SectionHeading } from "../ui/section";

function FeatureVisual({ name }: { name: string }) {
  if (name === "Tarefas") return <div className="mini-tasks" aria-hidden="true"><span><i className="checked"><Icon name="check" size={11} /></i>O importante, em primeiro lugar<span className="mini-tag">Hoje</span></span><span><i />Espaço para o próximo passo</span></div>;
  if (name === "Hábitos") return <div className="mini-week" aria-hidden="true">{["S", "T", "Q", "Q", "S", "S", "D"].map((day, i) => <span key={i}>{day}<i className={i < 4 ? "active" : ""}>{i < 4 ? <Icon name="check" size={12} /> : null}</i></span>)}</div>;
  if (name === "Focus") return <div className="mini-focus" aria-hidden="true"><div className="mini-focus-ring"><Icon name="play" size={17} /></div><span>Seu tempo. Sua atenção.</span></div>;
  if (name === "Metas") return <div className="mini-goal" aria-hidden="true"><span>Um caminho que faz sentido<Icon name="arrowUp" size={16} /></span><div><i /></div></div>;
  if (name === "AI Companion") return <div className="mini-ai" aria-hidden="true"><Icon name="sparkle" size={16} /><span>Seu dia · Sua semana · Suas finanças</span></div>;
  if (name === "Check-in") return <div className="mini-checkin" aria-hidden="true">{["Energia", "Foco", "Motivação"].map((label, i) => <span key={label}>{label}<i style={{ width: [70, 55, 80][i] + "%" }} /></span>)}</div>;
  if (name === "Círculos") return <div className="mini-circle" aria-hidden="true"><span><Icon name="circles" size={18} />Um desafio em comum</span><div><i /><i /><i /></div></div>;
  return null;
}

export function Features() {
  return <Section id="recursos" className="features-section">
    <div className="section-top-row">
      <SectionHeading eyebrow="01 / SEU ECOSSISTEMA" title={<>A vida tem muitas partes.<br />Sua organização pode ser uma só.</>} description="Dê um lugar para cada área da sua rotina. Sem perder a visão do todo." />
      <span className="section-aside">Diferentes áreas.<br /><b>Uma única experiência.</b></span>
    </div>
    {featureGroups.map(group => <section className="feature-group" key={group.id} aria-labelledby={"group-" + group.id}>
      <div className="feature-group-heading" data-reveal="small"><span className="eyebrow">{group.label}</span><h3 id={"group-" + group.id}>{group.title}</h3><p>{group.description}</p></div>
      <div className="feature-grid">
        {features.filter(feature => feature.group === group.id).map((feature, index) => <div className={"feature-reveal " + feature.className} key={feature.name} data-reveal style={{ "--reveal-delay": ((index % 3) * 85) + "ms" } as CSSProperties}>
          <article className="feature-card">
            <div className="feature-card-top"><span className="icon-box"><Icon name={feature.icon} size={22} /></span>{feature.premium ? <span className="premium-badge">PREMIUM</span> : <Icon name="arrowUp" size={16} className="muted-arrow" />}</div>
            <h4>{feature.name}</h4><p className="feature-lead">{feature.description}</p><p className="feature-detail">{feature.detail}</p>
            {feature.highlights ? <ul className="feature-highlights">{feature.highlights.map(label => <li key={label}><Icon name="check" size={13} />{label}</li>)}</ul> : null}
            <FeatureVisual name={feature.name} />
          </article>
        </div>)}
      </div>
    </section>)}
    <p className="concept-note">Microelementos ilustrativos. Saúde e finanças são ferramentas de organização pessoal; não substituem orientação profissional.</p>
  </Section>;
}
