import { Container } from "../layout/container";
import { Icon, type IconName } from "../ui/icon";
import { LogoMark } from "../ui/logo";
import { features } from "@/content/home";

const areas = features.map(({ name, icon, premium }) => ({ name: name === "Central de Notificações" ? "Notificações" : name, icon, premium }));
const summaries: { label: string; title: string; icon: IconName }[] = [
  { label: "Tarefas", title: "Seu próximo passo", icon: "tasks" },
  { label: "Hábitos", title: "Construa constância", icon: "habits" },
  { label: "Estudos", title: "Aprender e revisar", icon: "studies" },
  { label: "Finanças", title: "Uma visão do mês", icon: "finances" },
  { label: "Saúde", title: "Cuidar da rotina", icon: "health" },
  { label: "Check-in", title: "Como você está?", icon: "checkin" },
];

function ConceptPreview() {
  return <div className="concept-app" aria-hidden="true">
    <aside className="concept-sidebar"><div className="concept-brand"><LogoMark /><b>Life OS</b></div><div className="concept-nav">{areas.map((area, index) => <div key={area.name} className={index === 0 ? "selected" : ""}><Icon name={area.icon} size={16} /><span>{area.name}</span>{area.premium ? <span className="tiny-badge">PREMIUM</span> : null}</div>)}</div></aside>
    <div className="concept-main">
      <div className="concept-topline"><span>SEU ESPAÇO, SEU RITMO</span><div><Icon name="bell" size={17} /><span className="concept-avatar"><Icon name="circles" size={14} /></span></div></div>
      <div className="concept-welcome"><div><p>Uma rotina. Muitas possibilidades.</p><h3>O que importa hoje?</h3></div><span className="concept-tag"><span className="status-dot" />Visão geral</span></div>
      <div className="concept-stats">{summaries.map(item => <div key={item.label}><Icon name={item.icon} /><span>{item.label}</span><b>{item.title}</b><div className="skeleton-line" /></div>)}</div>
      <div className="concept-bottom"><div className="concept-tasks"><span className="concept-card-title">Espaço para suas prioridades<Icon name="tasks" size={16} /></span>{["Planeje seu dia", "Revise seus flashcards", "Registre sua hidratação"].map((task, i) => <div key={task} className="concept-task"><span className={"task-check " + (i === 0 ? "done" : "")}>{i === 0 ? <Icon name="check" size={12} /> : null}</span><span>{task}</span><span className="task-category">{["Rotina", "Estudos", "Saúde"][i]}</span></div>)}</div><div className="concept-focus"><Icon name="focus" size={21} /><span>UMA COISA DE CADA VEZ</span><b>Seu momento.</b><p>Focus com tarefa ou estudo.</p><div className="focus-ring"><span>25 min</span></div></div></div>
      <div className="concept-context"><span><Icon name="circles" size={15} />Círculos · desafios em comum</span><span><Icon name="bell" size={15} />Sua central de lembretes</span><span><Icon name="analytics" size={15} />Analytics · Premium</span><span><Icon name="sparkle" size={15} />AI Companion · opcional / Premium</span></div>
    </div>
  </div>;
}

export function ProductPreview() {
  return <section id="produto" className="preview-section" aria-labelledby="preview-heading"><Container><h2 id="preview-heading" className="sr-only">Uma visão do ecossistema Life OS</h2><div className="preview-float"><figure className="product-preview" data-reveal><div className="preview-top"><div className="window-dots"><i /><i /><i /></div><span>LIFE OS · VISÃO DO ECOSSISTEMA</span><span className="preview-label">Prévia conceitual</span></div><ConceptPreview /><figcaption>Composição ilustrativa da landing. Não representa uma tela real do aplicativo.</figcaption></figure></div>
    <div className="ecosystem-rail"><span>UM LUGAR PARA</span>{areas.slice(1).map(area => <span key={area.name}><Icon name={area.icon} size={17} />{area.name}{area.premium ? <small>Premium</small> : null}</span>)}</div>
  </Container></section>;
}
