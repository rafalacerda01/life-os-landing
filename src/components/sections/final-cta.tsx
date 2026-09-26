import { Section } from "../ui/section";
import { CTAButton } from "../ui/cta-button";
import { LogoMark } from "../ui/logo";

export function FinalCTA() {
  return <Section id="comece" className="final-cta-section"><div className="final-cta" data-reveal><LogoMark /><span className="eyebrow">ESPAÇO PARA O QUE IMPORTA</span><h2>Mais clareza.<br /><span>Mais vida.</span></h2><p>Sua rotina tem um novo lugar para acontecer.</p><CTAButton /><span className="launch-note">Lançamento inicial para Android.</span></div></Section>;
}
