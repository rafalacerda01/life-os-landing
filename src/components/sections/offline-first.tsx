import { Section } from "../ui/section";
import { Icon } from "../ui/icon";

export function OfflineFirst() {
  return <Section id="offline" className="offline-section"><div className="offline-panel" data-reveal="small"><div className="offline-visual" aria-hidden="true"><div className="offline-device"><Icon name="grid" size={30} /><span>Seu espaço local</span></div><div className="sync-connector"><i /><i /><i /><Icon name="habits" size={18} /></div><div className="offline-cloud"><Icon name="cloud" size={30} /><span>Sincronização</span></div></div><div className="offline-copy"><span className="eyebrow">PROJETADO PARA A VIDA REAL</span><h2>A rotina continua.<br />Mesmo sem conexão.</h2><p>Uma experiência pensada para funcionar localmente, com sincronização quando disponível. Para você seguir organizando o que importa, no seu ritmo.</p><span className="subtle-label"><Icon name="offline" size={16} />Offline-first, desde a base.</span></div></div></Section>;
}
