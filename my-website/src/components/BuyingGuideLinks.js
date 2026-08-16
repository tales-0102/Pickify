"use client";

// PATH: my-website/src/components/BuyingGuideLinks.js
// NEW FILE — drop-in component for product pages and blog posts
// Fetches and renders links to buying guides that feature this product.
// Uses existing design tokens (pk-* classes) — zero new styling.

import { useEffect, useState } from "react";
import Link from "next/link";
import { getGuidesForProduct } from "../sanity";

export default function BuyingGuideLinks({ productId }) {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    if (!productId) return;
    getGuidesForProduct(productId)
      .then(setGuides)
      .catch(() => setGuides([]));
  }, [productId]);

  if (guides.length === 0) return null;

  return (
    <section className="pk-section" style={{ background: "var(--linen)", paddingTop: 40, paddingBottom: 40 }}>
      <div className="pk-container" style={{ maxWidth: 720 }}>
        <div className="pk-eyebrow">Research before you buy</div>
        <h2 className="pk-section-title" style={{ fontSize: "clamp(18px,2.5vw,24px)", marginBottom: 18 }}>
          Featured In Our Buying Guides
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {guides.map((g) => (
            <Link
              key={g._id}
              href={`/buying-guides/${g.slug?.current}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="pk-hover-lift"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "16px 20px",
                  background: "#fff",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-soft)",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  {g.category && (
                    <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, display: "block", marginBottom: 4 }}>
                      {g.category}
                    </span>
                  )}
                  <span style={{ fontSize: 15, fontWeight: 600, color: "var(--espresso)", fontFamily: "var(--font-heading), serif" }}>
                    {g.title}
                  </span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--gold)", flexShrink: 0 }}>
                  View Guide →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}