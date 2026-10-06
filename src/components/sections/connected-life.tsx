import type { CSSProperties } from "react";
import { Section, SectionHeading } from "../ui/section";
import { Icon, type IconName } from "../ui/icon";
import { LogoMark } from "../ui/logo";

const nodes: { label: string; icon: IconName; position: string }[] = [
  { label: "Tarefas", icon: "tasks", position: "node-one" }, { label: "Hábitos", icon: "habits", position: "node-two" }, { label: "Metas", icon: "goals", position: "node-three" }, { label: "Focus", icon: "focus", position: "node-four" }, { label: "Estudos", icon: "studies", position: "node-five" }, { label: "Finanças", icon: "finances", position: "node-six" }, { label: "Saúde", icon: "health", position: "node-seven" },
];
const contextNodes: { label: string; icon: IconName; premium?: boolean }[] = [
  { label: "Visão geral", icon: "grid" }, { label: "Check-in", icon: "checkin" }, { label: "Notificações", icon: "bell" }, { label: "Círculos", icon: "circles" }, { label: "Analytics", icon: "analytics", premium: true }, { label: "AI Companion", icon: "sparkle", premium: true },
];

export function ConnectedLife() {
  return <Section id="como-funciona" className="connected-section"><div className="split-layout">
    <div><SectionHeading eyebrow="02 / TUDO CONECTADO" title={<>Menos fragmentação.<br />Mais visão do todo.</>} description="Áreas pessoais, visão geral, check-ins e desafios em grupo encontram seu lugar no Life OS. Um centro para acompanhar sua rotina, sem perder seu próprio ritmo." />
      <div className="connected-points" data-reveal="small"><p><Icon name="grid" />Resumos para orientar seu próximo passo.</p><p><Icon name="focus" />Tarefas e estudos como alvos de Focus.</p><p><Icon name="circles" />Desafios compartilhados, com progresso próprio.</p></div>
      <p className="body-copy" data-reveal="small">Participar de Círculos não compartilha automaticamente seus dados pessoais de saúde ou finanças.</p>
    </div>
    <div className="ecosystem-map">
      <div className="system-map" data-reveal="map" role="img" aria-label="Life OS no centro, com tarefas, hábitos, metas, Focus, estudos, finanças e saúde ao redor. Diagrama conceitual das áreas, sem indicar automações.">
        <div className="map-orbit orbit-outer" /><div className="map-orbit orbit-inner" /><div className="map-cross cross-horizontal" /><div className="map-cross cross-vertical" />
        <div className="map-core"><LogoMark /><b>Life OS</b><span>SEU CENTRO</span></div>
        {nodes.map((node, index) => <div className={"map-node " + node.position} key={node.label} style={{ "--node-delay": (index * 15) + "ms" } as CSSProperties}><Icon name={node.icon} size={19} /><span>{node.label}</span></div>)}
        <span className="map-caption">Suas áreas pessoais, em um só lugar</span>
      </div>
      <ul className="map-extension" data-reveal="small" aria-label="Outros recursos do ecossistema">{contextNodes.map(node => <li key={node.label}><Icon name={node.icon} size={17} /><span>{node.label}{node.premium ? <small>Premium</small> : null}</span></li>)}</ul>
    </div>
  </div></Section>;
}
