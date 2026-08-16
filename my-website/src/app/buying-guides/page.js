"use client";

// PATH: my-website/src/app/buying-guides/page.js
// NEW FILE — /buying-guides listing page

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBuyingGuides, urlFor } from "../../sanity";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

export default function BuyingGuidesPage() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBuyingGuides()
      .then(setGuides)
      .catch((err) => {
        console.error("[Pickify] buying guides fetch failed:", err);
        setGuides([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pk-no-scroll-x">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="pk-section" style={{ marginTop: 70, textAlign: "center" }}>
        <div className="pk-container">
          <div className="pk-eyebrow" style={{ justifyContent: "center", display: "flex" }}>
            In-depth research
          </div>
          <h1
            className="pk-section-title"
            style={{ fontSize: "clamp(30px, 4vw, 44px)" }}
          >
            Buying Guides
          </h1>
          <p className="pk-section-sub" style={{ margin: "12px auto 0" }}>
            Everything you need to choose the right home organisation product —
            expert criteria, top picks, and honest comparisons.
          </p>
        </div>
      </section>

      {/* GUIDE CARDS GRID */}
      <section className="pk-section">
        <div className="pk-container">
          {loading ? (
            <p style={{ textAlign: "center", color: "#6b5d52" }}>
              Loading guides…
            </p>
          ) : guides.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6b5d52" }}>
              Buying guides coming soon — check back shortly.
            </p>
          ) : (
            <div className="pk-grid">
              {guides.map((guide, i) => (
                <Reveal key={guide._id} delay={(i % 4) * 70}>
                  <Link
                    href={`/buying-guides/${guide.slug?.current}`}
                    style={{ textDecoration: "none" }}
                  >
                    <article className="pk-card pk-hover-lift">
                      {guide.heroImage ? (
                        <div className="pk-img-zoom" style={{ borderRadius: 15 }}>
                          <img
                            src={urlFor(guide.heroImage).width(420).height(280).url()}
                            alt={guide.heroImage?.alt || guide.title}
                            className="pk-card-img"
                          />
                        </div>
                      ) : (
                        /* Fallback placeholder matching existing card style */
                        <div
                          style={{
                            width: "100%",
                            height: 220,
                            borderRadius: 15,
                            background: "var(--linen)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 36,
                          }}
                        >
                          📋
                        </div>
                      )}

                      <div className="pk-card-body">
                        {guide.category && (
                          <span
                            style={{
                              fontSize: 11,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: "var(--gold)",
                              fontWeight: 600,
                            }}
                          >
                            {guide.category}
                          </span>
                        )}

                        <h3 className="pk-card-title" style={{ marginTop: 8 }}>
                          {guide.title}
                        </h3>

                        {guide.shortDescription && (
                          <p className="pk-card-desc">{guide.shortDescription}</p>
                        )}

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 16,
                          }}
                        >
                          <span style={{ fontSize: 12, color: "#8a7a6d" }}>
                            {guide.publishedAt
                              ? new Date(guide.publishedAt).toLocaleDateString(
                                  "en-US",
                                  { month: "short", day: "numeric", year: "numeric" }
                                )
                              : ""}
                          </span>
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "var(--espresso)",
                            }}
                          >
                            View Guide →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}