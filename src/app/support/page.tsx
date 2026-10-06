import { InstitutionalPage } from "@/components/layout/institutional-page";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata("Suporte", "Orientações sobre conta, sincronização, notificações, AI Companion e exclusão no Life OS. Canal oficial de suporte ainda em confirmação.", "/support", true);

export default function SupportPage() {
  return <InstitutionalPage title="Como podemos ajudar?" description="Orientações para entender sua conta e os principais controles do Life OS." noticeTitle="Canal de atendimento pendente de confirmação" notice={siteConfig.contactEmail ? "O contato configurado é " + siteConfig.contactEmail + ". As condições de atendimento ainda dependem de revisão." : "O canal externo oficial ainda não foi confirmado. Esta página não recebe mensagens ou solicitações. As orientações abaixo descrevem comportamentos atuais do aplicativo."} sections={[
    { title: "Conta e sincronização", content: "O acesso ao Life OS exige conta. Os registros locais dos módulos suportados permitem continuar a rotina offline após o acesso inicial. Para sincronizar alterações ou confirmar operações de conta, mantenha conexão. Uma alteração pendente não significa que já esteja disponível em outro dispositivo." },
    { title: "Central de Notificações", content: "A Central reúne lembretes internos de hábitos, provas e medicamentos. Notificações do Android são diferentes: verifique também as permissões e configurações do dispositivo, especialmente para lembretes de medicamentos." },
    { title: "Premium e AI Companion", content: "O AI Companion e o analytics avançado exigem acesso Premium. Para gerar uma análise, o AI Companion também precisa de conexão e consentimento específico. Você pode revogar a autorização no próprio recurso. Preços e condições comerciais ainda serão anunciados." },
    { title: "Encerrar Sessão ou excluir a conta", content: "Em Configurações, abra Gerenciamento da Conta. Encerrar Sessão desconecta você. Excluir Conta inicia um fluxo separado com confirmação da identidade e conexão obrigatória. A página Exclusão de Conta detalha os passos e o resultado esperado." },
    { title: "Download e contato oficial", content: siteConfig.contactEmail ? "Contato configurado: " + siteConfig.contactEmail + ". A URL do Google Play e as condições de atendimento ainda precisam de confirmação." : "O lançamento inicial será no Android. Enquanto a URL oficial do Google Play e o canal de suporte não forem confirmados, não há link de download, e-mail ou formulário de atendimento nesta versão.", pending: true },
  ]} />;
}
