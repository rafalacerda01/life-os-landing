import { InstitutionalPage } from "@/components/layout/institutional-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Termos de Uso", "Informações sobre o uso do Life OS, recursos opcionais e planos. Termos oficiais pendentes de revisão jurídica.", "/terms", true);

export default function TermsPage() {
  return <InstitutionalPage title="Termos de Uso" description="Informações sobre o produto atual e o estado de revisão das condições de uso." notice="Esta página reúne informações de produto e partes ainda em revisão. Não constitui um contrato nem os Termos de Uso oficiais. As condições jurídicas exigem confirmação e aprovação." sections={[
    { title: "Uso do aplicativo", content: "O Life OS é um aplicativo de organização pessoal com conta, recursos locais e sincronização nos módulos suportados. O lançamento inicial é focado em Android. Este site apresenta o produto e não implementa seus recursos." },
    { title: "Free e Premium", content: "O Free dá acesso à base do Life OS dentro dos limites do plano. O Premium inclui AI Companion, analytics avançado e limites ampliados nos recursos suportados. Preços e condições serão anunciados no lançamento. Esta página não vende assinaturas." },
    { title: "AI Companion e decisões pessoais", content: "As análises são opcionais, Premium, exigem conexão e consentimento específico. Você solicita cada análise e mantém a decisão sobre como usar as informações. O recurso não executa ações autônomas e não substitui orientação médica ou financeira profissional." },
    { title: "Saúde, finanças e Círculos", content: "Saúde e finanças são espaços para organizar registros pessoais. Círculos permitem participar de desafios com outros membros, sem compartilhar automaticamente dados privados desses módulos." },
    { title: "Condições jurídicas e comerciais", content: "Identificação do responsável, elegibilidade, responsabilidades, cobrança, cancelamento, reembolso e condições de disponibilidade ainda dependem de confirmação e revisão jurídica. Nenhuma oferta ou condição comercial definitiva é anunciada.", pending: true },
    { title: "Contato e vigência", content: "O canal oficial, a data de vigência e as disposições finais serão apresentados com os Termos de Uso aprovados.", pending: true },
  ]} />;
}
