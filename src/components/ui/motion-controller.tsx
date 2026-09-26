"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// One observer for server-rendered content. Content is visible without JavaScript.
export function MotionController() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const setup = () => {
      observer?.disconnect();
      elements.forEach(element => element.classList.remove("reveal-pending"));
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      elements.forEach(element => {
        // Avoid hiding already-visible content during hydration.
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.classList.add("reveal-pending");
          observer?.observe(element);
        }
      });
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", setup);
      elements.forEach(element => element.classList.remove("reveal-pending"));
    };
  }, [pathname]);
  return null;
}
