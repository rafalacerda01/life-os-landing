import { InstitutionalPage } from "@/components/layout/institutional-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Termos de Uso", "Estrutura dos Termos de Uso do Life OS. Conteúdo pendente de revisão e publicação.", "/terms", true);
export default function TermsPage() {
  return <InstitutionalPage title="Termos de Uso" description="Um espaço para apresentar as condições de uso do Life OS de forma clara." notice="Esta página é uma estrutura editorial. Não constitui um contrato ou os Termos de Uso oficiais. O conteúdo depende de confirmação e revisão jurídica." sections={[
    { title: "Apresentação e elegibilidade", placeholder: "Área reservada à identificação do serviço, responsável e critérios de elegibilidade aprovados." },
    { title: "Uso do aplicativo", placeholder: "Área reservada às regras de conta, uso permitido e responsabilidades, após revisão." },
    { title: "Free e Premium", placeholder: "Área reservada à composição dos planos e às condições confirmadas de assinatura, cobrança, cancelamento e reembolso." },
    { title: "AI Companion", placeholder: "Área reservada às condições específicas, limites e responsabilidades relacionados ao recurso Premium." },
    { title: "Disponibilidade e encerramento", placeholder: "Área reservada às condições revisadas de disponibilidade, alterações do serviço e encerramento de conta." },
    { title: "Contato e vigência", placeholder: "Área reservada ao canal oficial, à data de vigência e às disposições finais do documento aprovado." },
  ]} />;
}
