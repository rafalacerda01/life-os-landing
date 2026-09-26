import Link from "next/link";
import { Container } from "@/components/layout/container";
export default function NotFound() {
  return <Container className="not-found"><span className="eyebrow">404 / PÁGINA NÃO ENCONTRADA</span><h1>Vamos voltar<br />ao que importa.</h1><p>Este endereço não está disponível.</p><Link href="/" className="text-button">Voltar à página inicial →</Link></Container>;
}
