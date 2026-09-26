import { Hero } from "@/components/sections/hero";
import { ProductPreview } from "@/components/sections/product-preview";
import { Features } from "@/components/sections/features";
import { ConnectedLife } from "@/components/sections/connected-life";
import { OfflineFirst } from "@/components/sections/offline-first";
import { AICompanion } from "@/components/sections/ai-companion";
import { Privacy } from "@/components/sections/privacy";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return <>{siteConfig.url ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "Life OS", url: siteConfig.url, inLanguage: "pt-BR", description: siteConfig.description }).replace(/</g, "\\u003c") }} /> : null}<Hero /><ProductPreview /><Features /><ConnectedLife /><OfflineFirst /><AICompanion /><Privacy /><Pricing /><FAQ /><FinalCTA /></>;
}
