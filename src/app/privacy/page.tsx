import { InstitutionalPage } from "@/components/layout/institutional-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Política de Privacidade", "Privacidade, armazenamento local, sincronização, consentimento para AI Companion e controles de conta no Life OS. Política oficial em revisão.", "/privacy", true);

export default function PrivacyPage() {
  return <InstitutionalPage title="Privacidade e seus controles" description="Comportamentos do app que ajudam você a entender suas escolhas e o uso dos seus registros." notice="As informações de produto abaixo foram verificadas no código atual. Esta página não constitui a Política de Privacidade oficial; identificação do responsável, bases legais, retenção e demais disposições exigem revisão jurídica final." sections={[
    { title: "Sua conta e seus registros", content: "O Life OS organiza tarefas, hábitos, metas, estudos, finanças, saúde e check-ins associados à sua conta. Círculos utilizam membros e contribuições em desafios; participar deles não compartilha automaticamente seus registros pessoais de saúde ou finanças." },
    { title: "Armazenamento local e sincronização", content: "A arquitetura offline-first mantém dados dos módulos suportados no dispositivo e sincroniza registros da conta quando há conexão. Alterações locais podem aguardar sincronização. Operações online e análises por IA exigem internet." },
    { title: "AI Companion e consentimento", content: "O AI Companion é opcional e Premium. Uma análise é acionada por você e utiliza os resumos necessários do contexto do Life OS. Antes de usar o recurso, é preciso aceitar o consentimento específico. Você pode revogar essa autorização no próprio AI Companion." },
    { title: "Controles de conta e exclusão", content: "Encerrar Sessão e Excluir Conta são ações separadas. A exclusão exige confirmação da identidade, solicitação remota e limpeza local após a confirmação. Consulte a página Exclusão de Conta para o caminho dentro do aplicativo." },
    { title: "Responsável, finalidades legais e contato", content: "A identificação do responsável, as bases legais, os fornecedores e o canal oficial para exercício de direitos ainda precisam de confirmação e revisão. Nenhum contato ou declaração de conformidade jurídica é apresentado como aprovado nesta página.", pending: true },
    { title: "Retenção e atualização da política", content: "Eventuais exceções de retenção, prazos aplicáveis, vigência e histórico da política serão publicados após aprovação. Estas pendências não alteram os controles já existentes no aplicativo.", pending: true },
  ]} />;
}
