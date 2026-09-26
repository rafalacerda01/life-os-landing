import type { CSSProperties } from "react";
import { Section, SectionHeading } from "../ui/section";
import { Icon, type IconName } from "../ui/icon";
import { LogoMark } from "../ui/logo";

const nodes: { label: string; icon: IconName; position: string }[] = [{ label: "Tarefas", icon: "tasks", position: "node-one" }, { label: "Hábitos", icon: "habits", position: "node-two" }, { label: "Metas", icon: "goals", position: "node-three" }, { label: "Focus", icon: "focus", position: "node-four" }, { label: "Estudos", icon: "studies", position: "node-five" }, { label: "Finanças", icon: "finances", position: "node-six" }, { label: "Saúde", icon: "health", position: "node-seven" }];
export function ConnectedLife() {
  return (
    <Section id="como-funciona" className="connected-section">
      <div className="split-layout">
        <div>
          <SectionHeading eyebrow="02 / TUDO CONECTADO" title={<>Menos fragmentação.<br />Mais visão do todo.</>} description="Seu dia não acontece em compartimentos. O Life OS reúne diferentes áreas importantes da vida em um sistema que faz sentido para você." />
          <div className="connected-points" data-reveal="small">
            <p><Icon name="grid" />Um espaço para organizar sua rotina.</p>
            <p><Icon name="goals" />Uma visão para manter suas prioridades por perto.</p>
            <p><Icon name="leaf" />Seu ritmo como ponto de partida.</p>
          </div>
        </div>
        <div className="system-map" data-reveal="map" role="img" aria-label="Diagrama conceitual: tarefas, hábitos, metas, foco, estudos, finanças e saúde reunidos no Life OS.">
          <div className="map-orbit orbit-outer" /><div className="map-orbit orbit-inner" />
          <div className="map-cross cross-horizontal" /><div className="map-cross cross-vertical" />
          <div className="map-core"><LogoMark /><b>Life OS</b><span>SEU CENTRO</span></div>
          {nodes.map((node, index) => <div className={`map-node ${node.position}`} key={node.label} style={{ "--node-delay": `${index * 15}ms` } as CSSProperties}><Icon name={node.icon} size={19} /><span>{node.label}</span></div>)}
          <span className="map-caption">Uma representação do ecossistema</span>
        </div>
      </div>
    </Section>
  );
}
