"use client";

// FILE PATH: src/app/product/[id]/page.js
// STATUS: REPLACE EXISTING FILE

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { client, urlFor, getProductById, getRelatedProducts } from "../../../sanity";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";
import FaqAccordion from "../../../components/FaqAccordion";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getProductById(id).then((p) => {
      setProduct(p);
      setLoading(false);
      if (p?.category) {
        getRelatedProducts(id, p.category).then(setRelated);
      }
    });
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ paddingTop: 160, textAlign: "center", color: "#6b5d52" }}>
          Loading product…
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div style={{ paddingTop: 160, textAlign: "center" }}>
          <h2 className="pk-section-title">Product not found</h2>
          <Link href="/" className="pk-btn pk-btn-primary" style={{ marginTop: 20, display: "inline-flex" }}>
            Back to Pickify
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const highlights = product.highlights || [];
  const pros = product.pros || [];
  const bestFor = product.bestFor || [];
  const faqItems = product.faq && product.faq.length > 0
    ? product.faq
    : [
        {
          q: "Will this fit my space?",
          a: "Check the dimensions on the Amazon listing — most Pickify picks are designed to adapt to standard cabinet, fridge, and drawer sizes.",
        },
        {
          q: "Is this product covered by a warranty?",
          a: "Warranty terms are set by the seller on Amazon and are visible on the product listing before checkout.",
        },
        {
          q: "Does Pickify ship this product?",
          a: "No — Pickify links directly to Amazon, who handles shipping, payment, and returns.",
        },
      ];

  return (
    <div className="pk-no-scroll-x" style={{ paddingBottom: 90 }}>
      <Navbar />

      {/* BREADCRUMB */}
      <div className="pk-container" style={{ marginTop: 110, fontSize: 13, color: "#8a7a6d" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#8a7a6d" }}>
          Pickify
        </Link>{" "}
        / <span style={{ color: "var(--espresso)" }}>{product.title}</span>
      </div>

      {/* GALLERY + INFO */}
      <section className="pk-container" style={{ marginTop: 24 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: images.length ? "1fr 1fr" : "1fr",
            gap: 48,
          }}
          className="pk-product-grid"
        >
          {/* GALLERY */}
          {images.length > 0 && (
            <div>
              <div
                className="pk-img-zoom"
                style={{
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-soft)",
                  background: "#fff",
                }}
              >
                <img
                  src={urlFor(images[activeImg]).width(800).height(600).url()}
                  alt={product.title}
                  style={{ width: "100%", height: 480, objectFit: "cover" }}
                />
              </div>
              {images.length > 1 && (
                <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      style={{
                        border:
                          activeImg === i
                            ? "2px solid var(--gold)"
                            : "2px solid transparent",
                        borderRadius: 10,
                        padding: 0,
                        cursor: "pointer",
                        overflow: "hidden",
                        width: 72,
                        height: 72,
                        background: "none",
                      }}
                    >
                      <img
                        src={urlFor(img).width(100).height(100).url()}
                        alt={`${product.title} ${i + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* INFO */}
          <div>
            {product.category && <div className="pk-eyebrow">{product.category}</div>}
            <h1 style={{ fontSize: "clamp(26px, 3vw, 38px)", lineHeight: 1.2 }}>
              {product.title}
            </h1>

            {product.rating && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
                <span style={{ color: "var(--gold)", fontSize: 16, letterSpacing: 2 }}>
                  {"★".repeat(Math.round(product.rating))}
                  {"☆".repeat(5 - Math.round(product.rating))}
                </span>
                <span style={{ fontSize: 13, color: "#6b5d52" }}>
                  {product.rating.toFixed ? product.rating.toFixed(1) : product.rating} / 5
                </span>
              </div>
            )}

            <p style={{ marginTop: 18, fontSize: 15.5, color: "#4a3d35", lineHeight: 1.8 }}>
              {product.description}
            </p>

            {product.price && (
              <div style={{ marginTop: 20, fontSize: 26, fontWeight: 600, color: "var(--espresso)" }}>
                {product.price}
              </div>
            )}

            <div style={{ marginTop: 26, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a
                href={product.link || "#"}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="pk-btn pk-btn-gold"
                style={{ fontSize: 15, padding: "16px 36px" }}
              >
                View on Amazon →
              </a>
            </div>

            {/* TRUST BADGES */}
            <div
              style={{
                display: "flex",
                gap: 18,
                marginTop: 26,
                flexWrap: "wrap",
                fontSize: 12.5,
                color: "#6b5d52",
              }}
            >
              <span>✓ Hand-picked by Pickify</span>
              <span>✓ Fulfilled & shipped by Amazon</span>
              <span>✓ Reviewed for quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* KEY BENEFITS */}
      {highlights.length > 0 && (
        <section className="pk-section">
          <div className="pk-container">
            <Reveal>
              <div className="pk-eyebrow">Key benefits</div>
              <h2 className="pk-section-title">Product Highlights</h2>
            </Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 22,
                marginTop: 32,
              }}
            >
              {highlights.map((h, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div
                    className="pk-hover-lift"
                    style={{
                      background: "#fff",
                      borderRadius: "var(--radius-md)",
                      padding: "24px 20px",
                      boxShadow: "var(--shadow-soft)",
                      height: "100%",
                    }}
                  >
                    <div style={{ width: 30, height: 2, background: "var(--gold)", marginBottom: 14 }} />
                    <p style={{ fontSize: 14.5, color: "#4a3d35", lineHeight: 1.7 }}>{h}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY WE LOVE IT + LIFESTYLE */}
      <section className="pk-section" style={{ background: "var(--linen)" }}>
        <div
          className="pk-container"
          style={{ display: "grid", gridTemplateColumns: images[1] ? "1fr 1fr" : "1fr", gap: 48, alignItems: "center" }}
        >
          <Reveal>
            <div className="pk-eyebrow">Why we love it</div>
            <h2 className="pk-section-title">{product.whyWeLoveItTitle || "An everyday upgrade worth making"}</h2>
            <p className="pk-section-sub" style={{ maxWidth: 480 }}>
              {product.whyWeLoveIt ||
                "This piece earned its spot on Pickify for doing one thing well: making a daily routine feel less chaotic and more considered, without demanding a full home renovation to get there."}
            </p>
            {bestFor.length > 0 && (
              <div style={{ marginTop: 22 }}>
                <h4 style={{ fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--espresso)", marginBottom: 10 }}>
                  Best For
                </h4>
                <ul style={{ paddingLeft: 18, color: "#4a3d35", fontSize: 14, lineHeight: 1.9 }}>
                  {bestFor.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>

          {images[1] && (
            <Reveal delay={100}>
              <div className="pk-img-zoom" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-soft)" }}>
                <img
                  src={urlFor(images[1]).width(600).height(440).url()}
                  alt={`${product.title} in use`}
                  style={{ width: "100%", height: 360, objectFit: "cover" }}
                />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* PROS */}
      {pros.length > 0 && (
        <section className="pk-section">
          <div className="pk-container" style={{ maxWidth: 700 }}>
            <Reveal>
              <div className="pk-eyebrow">At a glance</div>
              <h2 className="pk-section-title">What Stands Out</h2>
            </Reveal>
            <div style={{ marginTop: 26 }}>
              {pros.map((pro, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "14px 0",
                      borderBottom: "1px solid rgba(44,24,16,0.08)",
                    }}
                  >
                    <span style={{ color: "var(--gold)", fontSize: 16 }}>✓</span>
                    <span style={{ fontSize: 14.5, color: "#4a3d35" }}>{pro}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MID-PAGE CTA */}
      <section className="pk-section" style={{ background: "var(--espresso)", textAlign: "center" }}>
        <Reveal>
          <h2 className="pk-section-title" style={{ color: "#FAF7F2" }}>
            Ready to bring this home?
          </h2>
          <p style={{ color: "rgba(250,247,242,0.7)", marginTop: 10, marginBottom: 26 }}>
            Available now on Amazon with fast, trusted shipping.
          </p>
          <a
            href={product.link || "#"}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="pk-btn pk-btn-gold"
          >
            Check Price on Amazon →
          </a>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="pk-section">
        <div className="pk-container" style={{ maxWidth: 700 }}>
          <Reveal>
            <div className="pk-eyebrow">Common questions</div>
            <h2 className="pk-section-title">FAQ</h2>
          </Reveal>
          <div style={{ marginTop: 26 }}>
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="pk-section" style={{ background: "var(--linen)" }}>
          <div className="pk-container">
            <Reveal>
              <div className="pk-eyebrow">You might also like</div>
              <h2 className="pk-section-title">Related Products</h2>
            </Reveal>
            <div className="pk-grid" style={{ marginTop: 36 }}>
              {related.map((p, i) => (
                <Reveal key={p._id} delay={i * 70}>
                  <Link href={`/product/${p._id}`} style={{ textDecoration: "none" }}>
                    <div className="pk-card pk-hover-lift">
                      {p.images && p.images[0] && (
                        <img
                          src={urlFor(p.images[0]).width(400).height(300).url()}
                          alt={p.title}
                          className="pk-card-img"
                        />
                      )}
                      <div className="pk-card-body">
                        <h3 className="pk-card-title">{p.title}</h3>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* STICKY MOBILE BUY BAR */}
      <div className="pk-sticky-buy">
        <a
          href={product.link || "#"}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="pk-btn pk-btn-gold"
        >
          {product.price ? `View on Amazon — ${product.price}` : "View on Amazon"}
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pk-product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}