import { features } from "@/content/home";
import { Icon } from "../ui/icon";
import { Section, SectionHeading } from "../ui/section";

function FeatureVisual({ name }: { name: string }) {
  if (name === "Tarefas") return <div className="mini-tasks" aria-hidden="true"><span><i className="checked"><Icon name="check" size={11} /></i>O importante, em primeiro lugar<span className="mini-tag">Hoje</span></span><span><i />Espaço para o próximo passo</span></div>;
  if (name === "Hábitos") return <div className="mini-week" aria-hidden="true">{["S", "T", "Q", "Q", "S", "S", "D"].map((day, i) => <span key={i}>{day}<i className={i < 4 ? "active" : ""}>{i < 4 ? <Icon name="check" size={12} /> : null}</i></span>)}</div>;
  if (name === "Focus") return <div className="mini-focus" aria-hidden="true"><div className="mini-focus-ring"><Icon name="play" size={17} /></div><span>Um momento de atenção.</span></div>;
  if (name === "Metas") return <div className="mini-goal" aria-hidden="true"><span>Um caminho que faz sentido<Icon name="arrowUp" size={16} /></span><div><i /></div></div>;
  if (name === "AI Companion") return <div className="mini-ai" aria-hidden="true"><Icon name="sparkle" size={16} /><span>Contexto. Perspectiva. Clareza.</span></div>;
  return null;
}
export function Features() {
  return (
    <Section id="recursos" className="features-section">
      <div className="section-top-row">
        <SectionHeading eyebrow="01 / SEU ECOSSISTEMA" title={<>A vida tem muitas partes.<br />Sua organização pode ser uma só.</>} description="Dê um lugar para cada área da sua rotina. Sem perder a visão do todo." />
        <span className="section-aside">Diferentes áreas.<br /><b>Uma única experiência.</b></span>
      </div>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <div className={`feature-reveal ${feature.className}`} key={feature.name} data-reveal style={{ "--reveal-delay": `${(index % 4) * 85}ms` } as React.CSSProperties}>
            <article className="feature-card">
              <div className="feature-card-top"><span className="icon-box"><Icon name={feature.icon} size={22} /></span>{feature.name === "AI Companion" ? <span className="premium-badge">PREMIUM</span> : <Icon name="arrowUp" size={16} className="muted-arrow" />}</div>
              <h3>{feature.name}</h3>
              <p className="feature-lead">{feature.description}</p>
              <p className="feature-detail">{feature.detail}</p>
              <FeatureVisual name={feature.name} />
            </article>
          </div>
        ))}
      </div>
      <p className="concept-note">Microelementos ilustrativos para apresentar o conceito. A interface final pode variar.</p>
    </Section>
  );
}
