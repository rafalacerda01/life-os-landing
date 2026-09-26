import Image from "next/image";
import { Container } from "../layout/container";
import { Icon, type IconName } from "../ui/icon";
import { LogoMark } from "../ui/logo";

// Replace null with an approved screenshot in public/mockups, keeping dimensions.
const screenshot: { src: string; alt: string } | null = null;
const areas: { name: string; icon: IconName }[] = [ { name: "Visão geral", icon: "grid" }, { name: "Tarefas", icon: "tasks" }, { name: "Hábitos", icon: "habits" }, { name: "Metas", icon: "goals" }, { name: "Focus", icon: "focus" }, { name: "Estudos", icon: "studies" }, { name: "Finanças", icon: "finances" }, { name: "Saúde", icon: "health" } ];

function ConceptPreview() {
  return <div className="concept-app" aria-hidden="true">
    <aside className="concept-sidebar"><div className="concept-brand"><LogoMark /><b>Life OS</b></div><div className="concept-nav">{areas.map((area, index) => <div key={area.name} className={index === 0 ? "selected" : ""}><Icon name={area.icon} size={17} />{area.name}</div>)}</div><div className="concept-sidebar-bottom"><Icon name="sparkle" size={16} /><span>AI Companion</span><span className="tiny-badge">PRO</span></div></aside>
    <div className="concept-main"><div className="concept-topline"><span>SEU ESPAÇO, SEU RITMO</span><div><Icon name="bell" size={17} /><span className="concept-avatar">L</span></div></div><div className="concept-welcome"><div><p>Um novo dia. Novas possibilidades.</p><h3>O que importa hoje?</h3></div><span className="concept-tag"><span className="status-dot" />Visão geral</span></div>
      <div className="concept-stats"><div><Icon name="tasks" /><span>Suas tarefas</span><b>Um passo de cada vez</b><div className="skeleton-line" /></div><div><Icon name="habits" /><span>Seus hábitos</span><b>Construa constância</b><div className="habit-dots">{Array.from({ length: 7 }, (_, i) => <span key={i} className={i < 4 ? "filled" : ""} />)}</div></div><div><Icon name="goals" /><span>Suas metas</span><b>Encontre sua direção</b><div className="skeleton-line goals-line" /></div></div>
      <div className="concept-bottom"><div className="concept-tasks"><span className="concept-card-title">Espaço para suas prioridades<Icon name="tasks" size={16} /></span>{["Planeje seu dia", "Reserve um tempo para aprender", "Cuide de você"].map((task, i) => <div key={task} className="concept-task"><span className={`task-check ${i === 0 ? "done" : ""}`}>{i === 0 ? <Icon name="check" size={12} /> : null}</span><span>{task}</span><span className="task-category">{["Rotina", "Estudos", "Saúde"][i]}</span></div>)}</div><div className="concept-focus"><Icon name="focus" size={21} /><span>MENOS DISTRAÇÕES</span><b>Mais presença.</b><p>Um espaço para focar.</p><div className="focus-ring"><span>Focus</span></div></div></div>
    </div>
  </div>;
}

export function ProductPreview() {
  const asset = screenshot as { src: string; alt: string } | null;
  return <section id="produto" className="preview-section" aria-labelledby="preview-heading"><Container><h2 id="preview-heading" className="sr-only">Uma visão do ecossistema Life OS</h2><div className="preview-float"><figure className="product-preview" data-reveal><div className="preview-top"><div className="window-dots"><i /><i /><i /></div><span>LIFE OS · PRODUCT CONCEPT</span><span className="preview-label">Prévia conceitual</span></div>{asset ? <Image src={asset.src} alt={asset.alt} width={1440} height={840} priority sizes="(max-width: 768px) 95vw, 1120px" /> : <ConceptPreview />}<figcaption>Composição ilustrativa da landing. Não representa uma tela real do aplicativo.</figcaption></figure></div>
    <div className="ecosystem-rail"><span>UM LUGAR PARA</span>{areas.slice(1).map(area => <span key={area.name}><Icon name={area.icon} size={17} />{area.name}</span>)}</div>
  </Container></section>;
}
