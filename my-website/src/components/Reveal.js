"use client";

// FILE PATH: src/components/Reveal.js
// STATUS: NEW FILE

// FILE PATH: src/components/Reveal.js
// STATUS: REPLACE EXISTING FILE

import { useEffect, useRef, useState } from "react";

/**
 * Fade-up reveal on scroll.
 * Default state is VISIBLE — only elements that start off-screen are hidden first.
 * A 1.5s safety timeout ensures nothing can ever get stuck invisible.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const [state, setState] = useState("visible"); // "visible" | "pending" | "in"

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    // If element is already in the viewport on mount — never hide it
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) return;

    setState("pending");

    const timer = setTimeout(() => setState("in"), 1500); // safety fallback

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("in");
          io.disconnect();
          clearTimeout(timer);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(node);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const cls = [
    "pk-reveal",
    state === "pending" ? "pk-pending" : "",
    state === "in" ? "pk-in" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={ref}
      className={cls}
      style={{ animationDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}