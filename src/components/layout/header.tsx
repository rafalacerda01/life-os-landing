"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "../ui/logo";
import { Icon } from "../ui/icon";
import { CTAButton } from "../ui/cta-button";

const navigation = [{ label: "Recursos", href: "/#recursos" }, { label: "Como funciona", href: "/#como-funciona" }, { label: "AI Companion", href: "/#ai-companion" }, { label: "Premium", href: "/#premium" }, { label: "FAQ", href: "/#faq" }];

export function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const closeAndRestoreFocus = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  }, []);
  useEffect(() => {
    const update = () => headerRef.current?.classList.toggle("header-scrolled", window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAndRestoreFocus();
    };
    const outside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, [open, closeAndRestoreFocus]);
  return <header className="header" ref={headerRef}>
    <div className="container header-inner" onClick={event => { if (open && (event.target as HTMLElement).closest("a")) closeAndRestoreFocus(); }}>
      <Logo />
      <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
      <div className="header-cta"><CTAButton compact /></div>
      <button ref={toggleRef} type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} size={23} /></button>
    </div>
    <nav id="mobile-navigation" className="mobile-nav container" hidden={!open} aria-label="Navegação mobile" key={pathname}>
      {navigation.map(item => <Link key={item.href} href={item.href} onClick={closeAndRestoreFocus}>{item.label}<Icon name="arrow" size={18} /></Link>)}
      <CTAButton compact />
    </nav>
  </header>;
}
