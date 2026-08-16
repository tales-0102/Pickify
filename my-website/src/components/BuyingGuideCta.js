// PATH: my-website/src/components/BuyingGuideCta.js
// NEW FILE — inline CTA card placed inside blog/article pages
// linking readers to a related buying guide.
// Accepts a guideSlug prop and resolves the guide title from Sanity,
// OR accepts title + slug as direct props for manual use.
// Uses existing pk-* classes — no new styling required.

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { client } from "../sanity";

export default function BuyingGuideCta({ guideSlug, guideTitle }) {
  const [title, setTitle] = useState(guideTitle || "");

  useEffect(() => {
    if (guideTitle || !guideSlug) return;
    // Fetch just the title if not provided
    client
      .fetch(
        `*[_type == "buyingGuide" && slug.current == $slug][0]{ title }`,
        { slug: guideSlug }
      )
      .then((g) => { if (g?.title) setTitle(g.title); })
      .catch(() => {});
  }, [guideSlug, guideTitle]);

  if (!guideSlug) return null;

  return (
    <div
      style={{
        margin: "32px 0",
        padding: "22px 24px",
        background: "var(--linen)",
        borderRadius: "var(--radius-md)",
        borderLeft: "3px solid var(--gold)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 14,
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>
          Buying Guide
        </p>
        <p style={{ fontSize: 16, fontWeight: 600, color: "var(--espresso)", fontFamily: "var(--font-heading), serif", margin: 0 }}>
          {title || "View the Full Buying Guide"}
        </p>
      </div>
      <Link
        href={`/buying-guides/${guideSlug}`}
        className="pk-btn pk-btn-primary"
        style={{ fontSize: 13, padding: "11px 22px", flexShrink: 0 }}
      >
        View Guide →
      </Link>
    </div>
  );
}