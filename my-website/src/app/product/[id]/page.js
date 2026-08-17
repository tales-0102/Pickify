"use client";

// FILE PATH: src/app/product/[id]/page.js
// STATUS: REPLACE EXISTING FILE — luxury UI redesign, logic unchanged

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProductById, urlFor } from "../../../sanity";
import { getAffiliateCta, getAffiliateLabel } from "../../../lib/affiliateUtils";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";
import FaqAccordion from "../../../components/FaqAccordion";

/* ─── Static FAQ ─── */
const STATIC_FAQ = [
  { q: "Does Pickify ship this product?",       a: "No — Pickify links directly to Amazon, who handles all shipping, payment, and returns." },
  { q: "Is this product covered by a warranty?",a: "Warranty terms are set by the seller on Amazon and visible on the product listing before checkout." },
  { q: "Will this fit in my space?",             a: "Check the exact dimensions listed on this page and on the Amazon listing before ordering." },
  { q: "How does Pickify choose its products?",  a: "Every product is hand-reviewed for build quality, real customer reviews, and practical value in everyday homes." },
];

/* ─── Badge colour map ─── */
const BADGE_COLORS = {
  "Best Seller":     { bg: "#C9A96E", color: "#2C1810" },
  "Editor's Choice": { bg: "#2C1810", color: "#FAF7F2" },
  "Best Value":      { bg: "#4a7c59", color: "#fff"    },
  "Budget Pick":     { bg: "#6b8cba", color: "#fff"    },
  "Most Popular":    { bg: "#C9A96E", color: "#2C1810" },
  "Trending":        { bg: "#c0392b", color: "#fff"    },
  "New Arrival":     { bg: "#8e44ad", color: "#fff"    },
};

/* ─── Decorative components ─── */
function GoldDivider() {
  return (
    <div className="pk-lux-divider" aria-hidden="true">
      <span className="pk-lux-divider-line" />
      <span className="pk-lux-divider-diamond">◆</span>
      <span className="pk-lux-divider-line" />
    </div>
  );
}

function BotanicalBranch({ className = "" }) {
  return (
    <svg viewBox="0 0 160 380" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" className={`pk-lux-botanical ${className}`}>
      <path d="M80 375 C78 335 75 285 80 240 C85 195 83 160 80 120 C77 80 80 48 82 14"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M80 295 Q56 278 36 283" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M80 255 Q53 238 33 242" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M80 210 Q57 194 38 197" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M80 168 Q57 152 39 155" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M80 275 Q104 256 124 260" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M80 232 Q107 214 128 218" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M80 188 Q102 170 122 173" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M80 145 Q103 127 122 130" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <ellipse cx="30" cy="282" rx="12" ry="5" transform="rotate(-22 30 282)" fill="currentColor" opacity="0.5"/>
      <ellipse cx="26" cy="241" rx="11" ry="5" transform="rotate(-26 26 241)" fill="currentColor" opacity="0.5"/>
      <ellipse cx="31" cy="196" rx="12" ry="5" transform="rotate(-20 31 196)" fill="currentColor" opacity="0.5"/>
      <ellipse cx="32" cy="154" rx="11" ry="4" transform="rotate(-24 32 154)" fill="currentColor" opacity="0.5"/>
      <ellipse cx="130" cy="258" rx="12" ry="5" transform="rotate(20 130 258)" fill="currentColor" opacity="0.5"/>
      <ellipse cx="135" cy="216" rx="11" ry="5" transform="rotate(24 135 216)" fill="currentColor" opacity="0.5"/>
      <ellipse cx="129" cy="171" rx="12" ry="5" transform="rotate(22 129 171)" fill="currentColor" opacity="0.5"/>
      <ellipse cx="128" cy="128" rx="11" ry="4" transform="rotate(20 128 128)" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────
   MAIN COMPONENT — all fetch/state logic unchanged
───────────────────────────────────────────────── */
export default function ProductPage() {
  const { id } = useParams();

  const [product,   setProduct]   = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setActiveImg(0);
    getProductById(id)
      .then((p) => {
        console.log("[Pickify] product loaded:", p);
        setProduct(p || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[Pickify] product fetch failed:", err);
        setError(err.message || "Failed to load product.");
        setLoading(false);
      });
  }, [id]);

  /* Loading */
  if (loading) {
    return (
      <div className="pk-no-scroll-x">
        <Navbar />
        <div className="pk-lux-loading">
          <div className="pk-pdp-spinner" />
          <p>Curating your product…</p>
        </div>
        <Footer />
      </div>
    );
  }

  /* Error / not found */
  if (error || !product) {
    return (
      <div className="pk-no-scroll-x">
        <Navbar />
        <div className="pk-lux-loading">
          <h2 className="pk-section-title">Product not found</h2>
          <p style={{ color: "#6b5d52", marginTop: 12, fontSize: 14 }}>
            {error || "This product may have been removed or is unavailable."}
          </p>
          <Link href="/" className="pk-btn pk-btn-primary" style={{ marginTop: 28, display: "inline-flex" }}>
            ← Back to Pickify
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  /* ── Null-safe field extraction ── */
  const title            = product.title            || "";
  const brand            = product.brand            || "";
  const category         = product.category         || "";
  const shortDescription = product.shortDescription || "";
  const description      = product.description      || "";
  const link             = product.link             || "#";
  const affilCta         = getAffiliateCta(product);
  const material         = product.material         || "";
  const color            = product.color            || "";
  const dimensions       = product.dimensions       || "";
  const tiers            = product.tiers            || "";
  const badge            = product.badge            || "";

  const images          = product.images          || [];
  const features        = product.features        || [];
  const benefits        = product.benefits        || [];
  const pros            = product.pros            || [];
  const cons            = product.cons            || [];
  const bestFor         = product.bestFor         || [];
  const relatedProducts = product.relatedProducts || [];

  const badgeStyle = badge ? (BADGE_COLORS[badge] || { bg: "#C9A96E", color: "#2C1810" }) : null;

  const specs = [
    { label: "Material",   value: material   },
    { label: "Color",      value: color      },
    { label: "Dimensions", value: dimensions },
    { label: "Tiers",      value: tiers      },
    { label: "Brand",      value: brand      },
    { label: "Category",   value: category   },
  ].filter((s) => Boolean(s.value));

  const hasSpecs = specs.length > 0;

  /* ─────────── RENDER ─────────── */
  return (
    <div className="pk-no-scroll-x pk-lux-page">
      <Navbar />

      {/* ─────────────────────────────────────────────
          BREADCRUMB
      ───────────────────────────────────────────── */}
      <div className="pk-container pk-lux-breadcrumb">
        <Link href="/">Home</Link>
        {category && <><span className="pk-lux-bc-sep">·</span><span>{category}</span></>}
        <span className="pk-lux-bc-sep">·</span>
        <span className="pk-lux-bc-current">{title}</span>
      </div>

      {/* ─────────────────────────────────────────────
          HERO — GALLERY + PRODUCT INFO
          bg: white
      ───────────────────────────────────────────── */}
      <section className="pk-lux-hero">
        <div className="pk-container pk-lux-hero-inner">

          {/* LEFT: GALLERY */}
          <div className="pk-lux-gallery">
            <div className="pk-lux-main-img-wrap">
              {images.length > 0 ? (
                <img
                  key={activeImg}
                  src={urlFor(images[activeImg]).width(960).height(960).fit("crop").url()}
                  alt={title}
                  className="pk-lux-main-img"
                />
              ) : (
                <div className="pk-lux-img-empty">
                  <span>🛒</span>
                  <p>No image available</p>
                </div>
              )}

              {badge && badgeStyle && (
                <span className="pk-lux-badge" style={{ background: badgeStyle.bg, color: badgeStyle.color }}>
                  {badge}
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="pk-lux-thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={`pk-lux-thumb${i === activeImg ? " pk-lux-thumb-active" : ""}`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={urlFor(img).width(140).height(140).fit("crop").url()}
                      alt={`${title} view ${i + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: INFO */}
          <div className="pk-lux-info">
            {category && (
              <span className="pk-lux-category-tag">{category}</span>
            )}

            <h1 className="pk-lux-title">{title}</h1>

            {brand && (
              <p className="pk-lux-brand">by {brand}</p>
            )}

            <GoldDivider />

            {shortDescription && (
              <p className="pk-lux-short-desc">{shortDescription}</p>
            )}

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="pk-lux-cta"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {affilCta.label}
            </a>

            <div className="pk-lux-trust">
              <div className="pk-lux-trust-item">
                <span className="pk-lux-trust-icon">✦</span>
                <span>Hand-picked by Pickify</span>
              </div>
              <div className="pk-lux-trust-item">
                <span className="pk-lux-trust-icon">✦</span>
                <span>Fulfilled by {affilCta.source}</span>
              </div>
              <div className="pk-lux-trust-item">
                <span className="pk-lux-trust-icon">✦</span>
                <span>Quality reviewed</span>
              </div>
            </div>

            {features.length > 0 && (
              <div className="pk-lux-quick-features">
                <p className="pk-lux-features-label">Highlights</p>
                <ul className="pk-lux-features-ul">
                  {features.slice(0, 4).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {hasSpecs && (
              <div className="pk-lux-spec-pills">
                {specs.slice(0, 3).map((s) => (
                  <div key={s.label} className="pk-lux-spec-pill">
                    <span className="pk-lux-spec-pill-key">{s.label}</span>
                    <span className="pk-lux-spec-pill-val">{s.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          FULL DESCRIPTION
          bg: warm linen
      ───────────────────────────────────────────── */}
      {description && (
        <section className="pk-lux-section pk-lux-bg-linen pk-lux-section-botanical">
          <BotanicalBranch className="pk-lux-bot-left" />
          <BotanicalBranch className="pk-lux-bot-right" />
          <div className="pk-container pk-lux-section-inner" style={{ maxWidth: 820 }}>
            <Reveal>
              <div className="pk-lux-section-header">
                <span className="pk-lux-eyebrow">About this product</span>
                <h2 className="pk-lux-heading">The Full Story</h2>
                <GoldDivider />
              </div>
              <p className="pk-lux-description-body">{description}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          KEY FEATURES
          bg: white
      ───────────────────────────────────────────── */}
      {features.length > 0 && (
        <section className="pk-lux-section pk-lux-bg-white">
          <div className="pk-container">
            <Reveal>
              <div className="pk-lux-section-header">
                <span className="pk-lux-eyebrow">What makes it exceptional</span>
                <h2 className="pk-lux-heading">Key Features</h2>
                <GoldDivider />
              </div>
            </Reveal>
            <div className="pk-lux-features-grid">
              {features.map((f, i) => (
                <Reveal key={i} delay={i * 55}>
                  <div className="pk-lux-feature-card">
                    <span className="pk-lux-feature-num">{String(i + 1).padStart(2, "0")}</span>
                    <p className="pk-lux-feature-text">{f}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          BENEFITS
          bg: ivory
      ───────────────────────────────────────────── */}
      {benefits.length > 0 && (
        <section className="pk-lux-section pk-lux-bg-ivory">
          <div className="pk-container">
            <Reveal>
              <div className="pk-lux-section-header">
                <span className="pk-lux-eyebrow">Why you'll love it</span>
                <h2 className="pk-lux-heading">Benefits</h2>
                <GoldDivider />
              </div>
            </Reveal>
            <div className="pk-lux-benefits-grid">
              {benefits.map((b, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="pk-lux-benefit-card">
                    <div className="pk-lux-benefit-icon">✦</div>
                    <p className="pk-lux-benefit-text">{b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          PROS & CONS
          bg: white
      ───────────────────────────────────────────── */}
      {(pros.length > 0 || cons.length > 0) && (
        <section className="pk-lux-section pk-lux-bg-white">
          <div className="pk-container">
            <Reveal>
              <div className="pk-lux-section-header">
                <span className="pk-lux-eyebrow">Honest editorial review</span>
                <h2 className="pk-lux-heading">Pros &amp; Cons</h2>
                <GoldDivider />
              </div>
            </Reveal>
            <div className="pk-lux-proscons-grid">
              {pros.length > 0 && (
                <Reveal delay={0}>
                  <div className="pk-lux-pros-card">
                    <div className="pk-lux-proscons-header">
                      <span className="pk-lux-proscons-label pk-lux-pros-label">Pros</span>
                    </div>
                    <ul className="pk-lux-proscons-list">
                      {pros.map((p, i) => (
                        <li key={i} className="pk-lux-pro-item">
                          <span className="pk-lux-pro-icon">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
              {cons.length > 0 && (
                <Reveal delay={80}>
                  <div className="pk-lux-cons-card">
                    <div className="pk-lux-proscons-header">
                      <span className="pk-lux-proscons-label pk-lux-cons-label">Cons</span>
                    </div>
                    <ul className="pk-lux-proscons-list">
                      {cons.map((c, i) => (
                        <li key={i} className="pk-lux-con-item">
                          <span className="pk-lux-con-icon">○</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          BEST FOR
          bg: linen
      ───────────────────────────────────────────── */}
      {bestFor.length > 0 && (
        <section className="pk-lux-section pk-lux-bg-linen">
          <div className="pk-container">
            <Reveal>
              <div className="pk-lux-section-header">
                <span className="pk-lux-eyebrow">Ideal for</span>
                <h2 className="pk-lux-heading">Best For</h2>
                <GoldDivider />
              </div>
            </Reveal>
            <div className="pk-lux-bestfor-grid">
              {bestFor.map((b, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div className="pk-lux-bestfor-card">
                    <span className="pk-lux-bestfor-icon">◈</span>
                    <span className="pk-lux-bestfor-text">{b}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          SPECIFICATIONS
          bg: white
      ───────────────────────────────────────────── */}
      {hasSpecs && (
        <section className="pk-lux-section pk-lux-bg-white">
          <div className="pk-container" style={{ maxWidth: 740 }}>
            <Reveal>
              <div className="pk-lux-section-header">
                <span className="pk-lux-eyebrow">Product details</span>
                <h2 className="pk-lux-heading">Specifications</h2>
                <GoldDivider />
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="pk-lux-specs-card">
                {specs.map((s, i) => (
                  <div key={s.label} className={`pk-lux-spec-row${i % 2 === 1 ? " pk-lux-spec-row-alt" : ""}`}>
                    <span className="pk-lux-spec-label">{s.label}</span>
                    <span className="pk-lux-spec-value">{s.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          MID-PAGE CTA
          bg: espresso
      ───────────────────────────────────────────── */}
      <section className="pk-lux-cta-banner">
        <BotanicalBranch className="pk-lux-bot-cta-left" />
        <BotanicalBranch className="pk-lux-bot-cta-right" />
        <Reveal>
          <div className="pk-lux-cta-inner">
            <span className="pk-lux-cta-eyebrow">Available on {affilCta.source}</span>
            <h2 className="pk-lux-cta-heading">Ready to Elevate Your Space?</h2>
            <p className="pk-lux-cta-sub">
              Curated for quality, designed for real homes.
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="pk-lux-cta-btn"
            >
              {affilCta.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <p className="pk-lux-cta-disclosure">
              As an Amazon Associate, Pickify earns from qualifying purchases.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ─────────────────────────────────────────────
          FAQ
          bg: ivory
      ───────────────────────────────────────────── */}
      <section className="pk-lux-section pk-lux-bg-ivory">
        <div className="pk-container" style={{ maxWidth: 740 }}>
          <Reveal>
            <div className="pk-lux-section-header">
              <span className="pk-lux-eyebrow">Have questions?</span>
              <h2 className="pk-lux-heading">Frequently Asked</h2>
              <GoldDivider />
            </div>
          </Reveal>
          <div style={{ marginTop: 36 }}>
            <FaqAccordion items={STATIC_FAQ} />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          RELATED PRODUCTS
          bg: linen
      ───────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="pk-lux-section pk-lux-bg-linen">
          <div className="pk-container">
            <Reveal>
              <div className="pk-lux-section-header">
                <span className="pk-lux-eyebrow">Complete your space</span>
                <h2 className="pk-lux-heading">You May Also Love</h2>
                <GoldDivider />
              </div>
            </Reveal>
            <div className="pk-lux-related-grid">
              {relatedProducts.map((p, i) => {
                const rImages = p.images || [];
                return (
                  <Reveal key={p._id} delay={i * 70}>
                    <Link href={`/product/${p._id}`} style={{ textDecoration: "none" }}>
                      <div className="pk-lux-related-card pk-hover-lift">
                        <div className="pk-lux-related-img-wrap">
                          {rImages.length > 0 ? (
                            <img
                              src={urlFor(rImages[0]).width(480).height(380).fit("crop").url()}
                              alt={p.title}
                              className="pk-lux-related-img"
                            />
                          ) : (
                            <div className="pk-lux-related-img-empty">🛒</div>
                          )}
                          {p.badge && (
                            <span
                              className="pk-lux-related-badge"
                              style={{
                                background: (BADGE_COLORS[p.badge] || BADGE_COLORS["Best Seller"]).bg,
                                color: (BADGE_COLORS[p.badge] || BADGE_COLORS["Best Seller"]).color,
                              }}
                            >
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <div className="pk-lux-related-body">
                          <h3 className="pk-lux-related-title">{p.title}</h3>
                          {p.shortDescription && (
                            <p className="pk-lux-related-desc">{p.shortDescription}</p>
                          )}
                          <span className="pk-lux-related-link">{getAffiliateLabel(p)} →</span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* STICKY MOBILE BAR */}
      <div className="pk-sticky-buy">
        <a href={link} target="_blank" rel="noopener noreferrer sponsored" className="pk-btn pk-btn-gold">
          {affilCta.label} →
        </a>
      </div>
    </div>
  );
}