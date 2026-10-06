import { Section, SectionHeading } from "../ui/section";
import { Icon } from "../ui/icon";
import Link from "next/link";

export function AICompanion() {
  return <Section id="ai-companion" className="ai-section"><div className="split-layout ai-layout">
    <div className="ai-visual" data-reveal>
      <div className="ai-visual-header"><span className="ai-symbol"><Icon name="sparkle" size={27} /></span><span>AI Companion<small>ANÁLISES DO SEU CONTEXTO</small></span><span className="premium-badge">PREMIUM</span></div>
      <div className="ai-context-chips"><span><Icon name="tasks" size={14} />Sua rotina</span><span><Icon name="checkin" size={14} />Seus registros</span><span><Icon name="shield" size={14} />Sua escolha</span></div>
      <div className="ai-perspective"><span className="eyebrow">ESCOLHA UMA PERSPECTIVA</span><h3>Um hub para olhar<br />para o que importa.</h3><div className="ai-analysis-list"><span><Icon name="grid" size={18} /><span>Analisar meu dia<small>Um panorama da rotina</small></span></span><span><Icon name="analytics" size={18} /><span>Ver minha semana<small>Constância dos últimos dias</small></span></span><span><Icon name="finances" size={18} /><span>Analisar minhas finanças<small>Resumo do mês atual</small></span></span></div></div>
      <div className="ai-consent"><Icon name="shield" size={17} /><span>Você solicita a análise.<br /><b>Você controla o consentimento.</b></span></div><span className="ai-concept-label">Visual conceitual · sem análise de dados reais</span>
    </div>
    <div><SectionHeading eyebrow="03 / AI COMPANION · PREMIUM" title={<>Mais contexto.<br />Uma nova perspectiva.</>} description="Análises do dia, da semana e das finanças do mês, a partir dos resumos necessários do próprio Life OS." />
      <p className="body-copy" data-reveal="small">Você escolhe qual análise gerar. O AI Companion é opcional, exige Premium, conexão e consentimento específico. A autorização pode ser revogada no aplicativo.</p>
      <p className="body-copy" data-reveal="small">A IA oferece uma perspectiva para sua reflexão. Não toma decisões ou executa ações por você, nem substitui orientação profissional de saúde ou finanças.</p>
      <Link href="/privacy" className="text-button" data-reveal>Conheça os controles de privacidade<Icon name="arrow" size={18} /></Link>
    </div>
  </div></Section>;
}
