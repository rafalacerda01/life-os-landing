import { Icon } from "../ui/icon";
import { Section, SectionHeading } from "../ui/section";

const plans = [
  { name: "Free", icon: "grid" as const, description: "Uma base para organizar o que importa.", value: "O essencial, por perto.", items: ["Tarefas, hábitos, metas e Focus", "Estudos, finanças, saúde e check-ins", "Central de Notificações e Círculos"], note: "Acesso aos módulos essenciais dentro das regras e limites do plano." },
  { name: "Premium", icon: "sparkle" as const, description: "Mais contexto e espaço para sua rotina.", value: "Mais perspectiva para você.", items: ["AI Companion opcional", "Analytics avançado e visão semanal", "Limites ampliados nos recursos suportados"], note: "AI Companion exige conexão e consentimento. O acesso e os limites seguem as condições do plano." },
];

export function Pricing() {
  return <Section id="premium"><SectionHeading eyebrow="04 / ESCOLHA SEU CAMINHO" title="Seu ritmo. Seu Life OS." description="Uma base para começar. Mais perspectivas para acompanhar seu caminho." centered />
    <div className="pricing-grid">{plans.map((plan, index) => <article key={plan.name} className={"plan-card" + (index ? " plan-premium" : "")} data-reveal style={{ "--reveal-delay": index * 80 + "ms" } as React.CSSProperties}>
      <div className="plan-top"><span className="plan-icon"><Icon name={plan.icon} size={24} /></span>{index ? <span className="premium-badge">MAIS PERSPECTIVA</span> : null}</div>
      <h3>{plan.name}</h3><p>{plan.description}</p><div className="plan-value">{plan.value}</div><div className="plan-divider" />
      <ul className="plan-features">{plan.items.map(item => <li key={item}><Icon name="check" size={17} />{item}</li>)}</ul>
      <p className="plan-pending">{plan.note}</p><span className="plan-status">Condições no lançamento<Icon name="arrow" size={16} /></span>
    </article>)}</div>
    <p className="pricing-note">Preços e condições serão anunciados no lançamento. Nenhuma assinatura está à venda nesta página.</p>
  </Section>;
}
