import { Container } from "../layout/container";
import { CTAButton } from "../ui/cta-button";
import { Icon } from "../ui/icon";

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title"><div className="hero-aura" aria-hidden="true" /><Container>
    <div className="hero-pill"><span className="status-dot" />Sua vida, com mais clareza<span className="pill-divider" /><span>Life OS</span></div>
    <h1 id="hero-title">Organize sua vida.<br /><span>Em um só lugar.</span></h1>
    <p className="hero-description">Tarefas, hábitos, metas, foco, estudos, finanças e saúde.<br className="desktop-break" /> Tudo em uma experiência que acompanha o seu ritmo.</p>
    <div className="hero-actions"><CTAButton /><a href="#produto" className="text-button">Conheça o Life OS<Icon name="arrow" size={18} /></a></div>
    <div className="hero-notes"><span><Icon name="grid" size={15} />Uma experiência integrada</span><span><Icon name="offline" size={15} />Pensado para funcionar offline</span></div>
  </Container></section>;
}
