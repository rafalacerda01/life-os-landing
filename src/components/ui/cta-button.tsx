import { siteConfig } from "@/lib/site-config";
import { Icon } from "./icon";

export function CTAButton({ compact = false }: { compact?: boolean }) {
  const className = `cta-button ${compact ? "cta-compact" : ""}`;
  return siteConfig.googlePlayUrl
    ? <a className={className} href={siteConfig.googlePlayUrl} target="_blank" rel="noopener noreferrer"><Icon name="play" size={18} />Baixar no Google Play<Icon name="arrowUp" size={16} /></a>
    : <span className={`${className} cta-pending`}><Icon name="play" size={18} /><span>Em breve no Google Play</span></span>;
}
