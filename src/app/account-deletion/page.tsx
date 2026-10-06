import { InstitutionalPage } from "@/components/layout/institutional-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Exclusão de Conta", "Como iniciar a exclusão de conta no Life OS, confirmar sua identidade e acompanhar o resultado no aplicativo.", "/account-deletion", true);

export default function AccountDeletionPage() {
  return <InstitutionalPage title="Exclusão de Conta" description="A exclusão é iniciada no próprio Life OS. Veja o caminho e o que acontece durante o procedimento." noticeTitle="Orientações verificadas no aplicativo" notice="O fluxo abaixo existe no app atual. Esta página informa os passos; não recebe solicitações nem executa exclusões. Contato externo, eventuais retenções e detalhes jurídicos ainda dependem de confirmação e revisão." sections={[
    { title: "Como iniciar no aplicativo", content: "Entre na sua conta e mantenha conexão com a internet para confirmar a identidade e concluir a solicitação.", steps: ["Abra Configurações no Life OS.", "Selecione Gerenciamento da Conta.", "Na área Segurança, toque em Excluir Conta.", "Leia o aviso de ação irreversível e confirme somente se quiser excluir a conta."] },
    { title: "Confirmação da identidade", content: "Para contas com e-mail e senha, informe a senha atual no diálogo de exclusão. Para acesso com Google, o aplicativo solicita uma nova confirmação pelo provedor antes de continuar. Cancelar a confirmação interrompe a solicitação." },
    { title: "Resultado e dados associados", content: "O app solicita a exclusão da conta e dos dados associados no serviço remoto. Após a confirmação, conclui a limpeza dos dados locais vinculados à conta e retorna ao acesso não autenticado. Se houver erro ou o resultado não puder ser confirmado, o aplicativo informa a falha; isso não deve ser interpretado como exclusão concluída. Siga a orientação apresentada no app." },
    { title: "Encerrar Sessão é uma ação diferente", content: "Encerrar Sessão desconecta você da conta e não solicita a exclusão dos dados remotos. Para excluir a conta, use a opção Excluir Conta e conclua a confirmação específica." },
    { title: "Contato, retenção e informações jurídicas", content: "O canal externo de atendimento, eventuais exceções de retenção e os prazos aplicáveis ainda estão pendentes de confirmação e revisão jurídica. Nenhum prazo ou garantia de eliminação universal é anunciado aqui.", pending: true },
  ]} />;
}
