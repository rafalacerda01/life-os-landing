import { InstitutionalPage } from "@/components/layout/institutional-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Exclusão de Conta", "Página de exclusão de conta do Life OS. Procedimento oficial pendente de confirmação e publicação.", "/account-deletion", true);
export default function AccountDeletionPage() {
  return <InstitutionalPage title="Exclusão de Conta" description="Um espaço para as instruções oficiais de exclusão de conta e dados do Life OS." notice="O procedimento oficial ainda precisa ser confirmado. Esta página não recebe solicitações e não executa exclusão de conta ou dados. As instruções deverão estar completas antes do lançamento público." sections={[
    { title: "Como solicitar a exclusão", placeholder: "Área reservada aos passos confirmados dentro do aplicativo e ao canal externo oficial de solicitação." },
    { title: "Verificação da solicitação", placeholder: "Área reservada à descrição do procedimento oficial para verificar a titularidade e dar andamento à solicitação." },
    { title: "Dados excluídos e retidos", placeholder: "Área reservada às categorias de dados abrangidas, eventuais exceções e períodos de retenção, após confirmação e revisão." },
    { title: "Prazos e confirmação", placeholder: "Área reservada aos prazos oficiais, efeitos da exclusão e forma de confirmação. Nenhum prazo é anunciado nesta versão." },
  ]} />;
}
