import Link from "next/link";
import { Icon } from "../ui/icon";
import { Section } from "../ui/section";

export function Privacy() {
  return <Section id="privacidade" className="privacy-section"><div className="privacy-panel" data-reveal="small"><span className="privacy-symbol"><Icon name="shield" size={34} /></span><div className="privacy-copy"><span className="eyebrow">PRIVACIDADE FAZ PARTE</span><h2>Sua vida. Suas escolhas.</h2><p>Projetado com privacidade, consentimento e controle como princípios. A IA é opcional, com autorização específica e revogável. Encerrar Sessão e Excluir Conta são fluxos separados.</p><Link href="/privacy" className="text-button">Privacidade e seus controles<Icon name="arrow" size={17} /></Link></div><div className="privacy-principles"><span><Icon name="check" size={17} />Consentimento para IA</span><span><Icon name="check" size={17} />Controles de privacidade</span><span><Icon name="check" size={17} />Exclusão com confirmação</span><small>Política oficial pendente de revisão jurídica.</small></div></div></Section>;
}
