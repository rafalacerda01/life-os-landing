function publicOrigin(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null;
    return url.origin;
  } catch { return null; }
}

export const siteConfig = {
  name: "Life OS",
  description: "Organize tarefas, estudos, finanças, saúde e check-ins com o Life OS. Uma rotina integrada, offline-first, com Círculos e inteligência opcional.",
  url: publicOrigin(process.env.NEXT_PUBLIC_SITE_URL),
  googlePlayUrl: null as string | null,
  pricing: null as { monthly: string | null; annual: string | null } | null,
  contactEmail: null as string | null,
  socialLinks: [] as { label: string; url: string }[],
};

export const institutionalLinks = [
  { href: "/privacy", label: "Política de Privacidade" },
  { href: "/terms", label: "Termos de Uso" },
  { href: "/support", label: "Suporte" },
  { href: "/account-deletion", label: "Exclusão de Conta" },
];
