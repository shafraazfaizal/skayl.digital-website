"use client";

import { useEffect, useRef } from "react";

/** A thin orange line along the top of the screen that fills as you read. */
export default function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(target);
    if (!el || !bar.current) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [target]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-orange" />
    </div>
  );
}
