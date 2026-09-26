import { InstitutionalPage } from "@/components/layout/institutional-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Política de Privacidade", "Estrutura da Política de Privacidade do Life OS. Conteúdo pendente de revisão e publicação.", "/privacy", true);
export default function PrivacyPage() {
  return <InstitutionalPage title="Política de Privacidade" description="Um espaço para explicar, com transparência, como os dados são tratados no Life OS." notice="Esta página é uma estrutura de trabalho. Não constitui a Política de Privacidade oficial do produto. O documento detalhado será publicado após revisão." sections={[
    { title: "Responsável e contato", placeholder: "Área reservada à identificação do responsável pelo tratamento de dados e aos canais oficiais de contato." },
    { title: "Dados e finalidades", placeholder: "Área reservada à descrição das categorias de dados, suas finalidades e bases aplicáveis, após confirmação e revisão." },
    { title: "Armazenamento e sincronização", placeholder: "Área reservada às informações confirmadas sobre armazenamento local, sincronização, retenção e fornecedores envolvidos." },
    { title: "AI Companion e consentimento", placeholder: "Área reservada aos detalhes de consentimento, contexto utilizado, processamento e controles de privacidade do AI Companion." },
    { title: "Direitos e exclusão", placeholder: "Área reservada às orientações oficiais para exercer direitos e solicitar a exclusão de dados e conta." },
    { title: "Atualizações do documento", placeholder: "Área reservada à data de vigência, histórico e procedimento de atualização da política aprovada." },
  ]} />;
}
