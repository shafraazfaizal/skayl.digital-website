"use client";

export default function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="text-left text-cream/80 transition-colors hover:text-cream md:text-right"
    >
      Back to top
    </button>
  );
}
