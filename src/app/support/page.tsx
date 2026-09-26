import { InstitutionalPage } from "@/components/layout/institutional-page";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
export const metadata = pageMetadata("Suporte", "Central de suporte do Life OS em preparação. Canais e orientações aguardam confirmação.", "/support", true);
export default function SupportPage() {
  return <InstitutionalPage title="Como podemos ajudar?" description="A central de suporte do Life OS está sendo preparada para acompanhar você." notice={siteConfig.contactEmail ? `Contato configurado: ${siteConfig.contactEmail}. As orientações de atendimento aguardam publicação.` : "O canal oficial de contato ainda não foi confirmado. Esta página não recebe mensagens ou solicitações. Consulte as perguntas frequentes da home para informações sobre esta etapa."} sections={[
    { title: "Primeiros passos", placeholder: "Área reservada às orientações de instalação e início de uso, após a confirmação da publicação no Google Play." },
    { title: "Conta e sincronização", placeholder: "Área reservada a orientações verificadas sobre conta, experiência local e sincronização." },
    { title: "Premium e AI Companion", placeholder: "Área reservada a dúvidas sobre assinatura, consentimento e controles do AI Companion, conforme condições confirmadas." },
    { title: "Contato oficial", placeholder: siteConfig.contactEmail ? `Canal configurado: ${siteConfig.contactEmail}. Procedimento e condições de atendimento a confirmar.` : "Área reservada ao canal oficial de suporte. Não há e-mail ou formulário de atendimento publicado nesta versão." },
  ]} />;
}
