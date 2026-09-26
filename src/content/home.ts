import type { IconName } from "@/components/ui/icon";

export const features: { name: string; icon: IconName; description: string; detail: string; className: string }[] = [
  { name: "Tarefas", icon: "tasks", description: "Tire da cabeça. Coloque em movimento.", detail: "Organize o que precisa ser feito e encontre seu próximo passo.", className: "feature-tasks" },
  { name: "Hábitos", icon: "habits", description: "Pequenos passos. Sua própria constância.", detail: "Acompanhe as práticas que você quer cultivar no dia a dia.", className: "feature-habits" },
  { name: "Metas", icon: "goals", description: "Dê direção ao que importa.", detail: "Mantenha seus objetivos por perto e acompanhe seu caminho.", className: "feature-goals" },
  { name: "Focus", icon: "focus", description: "Um momento para uma coisa de cada vez.", detail: "Reserve espaço para se concentrar no que merece sua atenção.", className: "feature-focus" },
  { name: "Estudos", icon: "studies", description: "Aprender também tem seu lugar.", detail: "Organize sua rotina de estudos dentro da mesma experiência.", className: "feature-studies" },
  { name: "Finanças", icon: "finances", description: "Clareza para sua organização financeira.", detail: "Tenha um espaço dedicado ao acompanhamento das suas finanças.", className: "feature-finances" },
  { name: "Saúde", icon: "health", description: "Cuide da rotina de cuidar de você.", detail: "Organize informações e práticas da sua rotina de saúde.", className: "feature-health" },
  { name: "AI Companion", icon: "sparkle", description: "Uma nova perspectiva sobre sua rotina.", detail: "Análises contextuais Premium, com consentimento e controles de privacidade.", className: "feature-ai" },
];

export const faqs = [
  { question: "O que é o Life OS?", answer: "É um aplicativo que reúne tarefas, hábitos, metas, foco, estudos, finanças e saúde em uma única experiência. A proposta é ajudar você a organizar diferentes áreas da vida com mais clareza." },
  { question: "Preciso estar online?", answer: "O Life OS tem uma arquitetura offline-first: a experiência é projetada para funcionar localmente, com dados disponíveis conforme o funcionamento de cada recurso. A sincronização ocorre quando disponível. Algumas funcionalidades, como análises por IA, podem depender de conexão." },
  { question: "O AI Companion está disponível para todos?", answer: "O AI Companion é um recurso Premium. Ele oferece análises com contexto das áreas do próprio Life OS, mediante consentimento e com controles de privacidade. Não é um chatbot generalista." },
  { question: "Como meus dados são tratados?", answer: "O produto é orientado por controle, transparência e consentimento, incluindo controles para o AI Companion. A Política de Privacidade detalhada ainda está pendente de revisão e publicação. Consulte a página de privacidade para acompanhar esse estado." },
  { question: "Como funciona o Premium?", answer: "O Premium inclui o AI Companion. Preços, condições, limites e a lista completa de recursos por plano serão informados quando confirmados. Não há preço, desconto ou período de teste anunciado nesta versão." },
  { question: "Onde posso baixar?", answer: "O lançamento inicial é focado em Android, pelo Google Play. A URL oficial ainda não foi confirmada. Por isso, o site exibe “Em breve no Google Play”. Não há disponibilidade para iOS anunciada aqui." },
  { question: "Como excluir minha conta?", answer: "A página de Exclusão de Conta está preparada para receber o procedimento oficial. As instruções, o canal de solicitação e os detalhes de retenção ainda precisam ser confirmados antes da publicação. Esta versão do site não recebe solicitações de exclusão." },
];
