"use client";

// FILE PATH: src/app/page.js
// STATUS: REPLACE EXISTING FILE

// FILE PATH: src/app/page.js
// STATUS: REPLACE EXISTING FILE

import { useEffect, useState } from "react";
import Link from "next/link";
import { client, urlFor, getLatestPosts } from "../sanity";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import FaqAccordion from "../components/FaqAccordion";

/* ─── STATIC DATA ──────────────────────────────── */

// Categories use brand-color backgrounds — no local image files required
const CATEGORIES = [
  {
    name: "Pantry",
    img: "/images/cat-pantry.jpg",
  },
  {
    name: "Kitchen",
    img: "/images/cat-kitchen.jpg",
  },
  {
    name: "Fridge",
    img: "/images/cat-fridge.jpg",
  },
  {
    name: "Closet",
    img: "/images/cat-closet.jpg",
  },
  {
    name: "Bathroom",
    img: "/images/cat-bathroom.jpg",
  },
  {
    name: "Desk & Office",
    img: "/images/cat-office.jpg",
  },
];

const WHY_ITEMS = [
  {
    title: "Editorially Curated",
    desc:  "Every product is hand-selected and cross-checked against real Amazon reviews before it earns a spot.",
  },
  {
    title: "Built For Real Homes",
    desc:  "We favour solutions that work in actual apartments — not oversized showroom pantries.",
  },
  {
    title: "Updated Weekly",
    desc:  "New finds are added every week as trends, prices, and quality shift on Amazon.",
  },
  {
    title: "No Clutter, No Fluff",
    desc:  "If it doesn't earn its shelf space, it's not on Pickify.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Does Pickify sell products directly?",
    a: "No — Pickify curates and reviews products sold and fulfilled by Amazon. We link out to Amazon for every purchase.",
  },
  {
    q: "How are products chosen?",
    a: "Each product is scored on build quality, real customer reviews, price-to-value, and how well it solves a specific organisation problem.",
  },
  {
    q: "Does Pickify earn a commission?",
    a: "Yes. As an Amazon Associate, Pickify earns from qualifying purchases at no extra cost to you.",
  },
  {
    q: "How often is the catalog updated?",
    a: "We refresh featured picks weekly and retire products that drop in quality or availability.",
  },
];

// Gradient slides — no local images required; carousel works out of the box
// const SLIDES = [
//   { bg: "linear-gradient(135deg, #EDE0D4 0%, #FAF7F2 100%)" },
//   { bg: "linear-gradient(135deg, #C4B5A5 0%, #EDE0D4 100%)" },
//   { bg: "linear-gradient(135deg, #FAF7F2 0%, #C9A96E22 100%)" },
//   { bg: "linear-gradient(135deg, #EDE0D4 0%, #C4B5A5 100%)" },
// ];
const SLIDES = [
  { image: "/images/hero1.jpg" },
  { image: "/images/hero2.jpg" },
  { image: "/images/hero3.jpg" },
  { image: "/images/hero4.jpg" },
];

/* ─── PAGE COMPONENT ──────────────────────────── */

export default function Home() {
  const [products,     setProducts]     = useState([]);
  const [productsLoad, setProductsLoad] = useState(true);
  const [fetchError,   setFetchError]   = useState(null);
  const [latestPosts,  setLatestPosts]  = useState([]);
  const [current,      setCurrent]      = useState(0);
  const [email,        setEmail]        = useState("");
  const [subscribed,   setSubscribed]   = useState(false);

  /* ── Sanity: product fetch ── */
  useEffect(() => {
    console.log("[Pickify] Fetching products from Sanity…");

    client
      .fetch(`*[_type == "product"] | order(_createdAt desc)`)
      .then((data) => {
        console.log("[Pickify] Products received:", data?.length ?? 0, data);
        setProducts(data || []);
        setProductsLoad(false);
      })
      .catch((err) => {
        console.error("[Pickify] Product fetch FAILED:", err);
        setFetchError(err.message || "Unknown error");
        setProductsLoad(false);
      });

    getLatestPosts(3)
      .then(setLatestPosts)
      .catch(() => setLatestPosts([]));
  }, []);

  /* ── Hero auto-slide (3 s interval) ── */
  useEffect(() => {
    const id = setInterval(
      () => setCurrent((prev) => (prev + 1) % SLIDES.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  const trending = [...products].slice(0, 4);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    // TODO: wire to Mailchimp / ConvertKit / Beehiiv
  }

  /* ── RENDER ── */
  return (
    <div className="pk-no-scroll-x">
      <Navbar />

      {/* ══════════════════════════════════════════
          HERO — crossfade carousel
      ══════════════════════════════════════════ */}
      <div className="pk-hero-wrap">
        <div className="pk-hero-slide">
        {SLIDES.map((slide, i) => (
  <img
    key={i}
    src={slide.image}
    alt={`Hero Slide ${i + 1}`}
    className={`pk-hero-img ${
      i === current ? "pk-hero-img-active" : ""
    }`}
  />
))}
          {/* Overlay so text is always readable */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(44,24,16,0.08)",
              zIndex: 2,
            }}
          />

          {/* Hero text */}
          <div className="pk-hero-text" style={{ zIndex: 3 }}>
            <h1>
              Discover Products That Are Worth{" "}
              <span style={{ color: "#C9A96E" }}>Your Attention</span>
            </h1>
            <p>
              Carefully curated selections designed to elevate your everyday
              lifestyle. Simple, elegant, and truly worth it.
            </p>
            <div style={{ marginTop: 22, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#featured" className="pk-btn pk-btn-primary">
                Shop Featured Picks
              </a>
              <Link href="/blog" className="pk-btn pk-btn-outline">
                Read The Journal
              </Link>
            </div>
          </div>

          {/* Slide dots */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 8,
              zIndex: 4,
            }}
          >
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? 22 : 8,
                  height: 8,
                  borderRadius: 999,
                  border: "none",
                  background: i === current ? "#C9A96E" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.4s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          FEATURED CATEGORIES
      ══════════════════════════════════════════ */}
      <section className="pk-section">
        <div className="pk-container">
          <Reveal>
            <div className="pk-eyebrow">Shop by space</div>
            <h2 className="pk-section-title">Featured Categories</h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 16,
              marginTop: 36,
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 55}>
                <Link
  href="#featured"
  className="pk-img-zoom pk-hover-lift"
  style={{
    display: "block",
    height: 170,
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    position: "relative",
    textDecoration: "none",
  }}
>
  <img
    src={cat.img}
    alt={cat.name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />

  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(180deg, rgba(44,24,16,0) 40%, rgba(44,24,16,0.6) 100%)",
    }}
  />

  <span
    style={{
      position: "absolute",
      bottom: 14,
      left: 16,
      color: "#fff",
      fontFamily: "var(--font-heading)",
      fontSize: 17,
      fontWeight: 600,
    }}
  >
    {cat.name}
  </span>
</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED PRODUCTS — Sanity data
      ══════════════════════════════════════════ */}
      <section
        id="featured"
        style={{
          padding: "80px 20px",
          background: "linear-gradient(135deg, #FADADD 0%, #FFFFFF 40%, #F5E6E8 100%)",
        }}
      >
        <div className="pk-container">
          <Reveal>
            <div
              className="pk-eyebrow"
              style={{ display: "flex", justifyContent: "center" }}
            >
              Hand-picked for you
            </div>
            <h2 className="pk-section-title" style={{ textAlign: "center" }}>
              Featured Products
            </h2>
          </Reveal>

          <div style={{ marginTop: 50 }}>
            {/* Loading */}
            {productsLoad && (
              <p style={{ textAlign: "center", color: "#6b5d52", padding: "40px 0" }}>
                Loading products…
              </p>
            )}

            {/* Fetch error */}
            {!productsLoad && fetchError && (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  background: "#fff8f6",
                  borderRadius: 14,
                  border: "1px solid rgba(201,169,110,0.3)",
                  maxWidth: 560,
                  margin: "0 auto",
                }}
              >
                <p style={{ color: "#c0392b", fontWeight: 600 }}>Could not load products</p>
                <p style={{ fontSize: 13, color: "#6b5d52", marginTop: 8 }}>
                  Error: {fetchError}
                </p>
                <p style={{ fontSize: 13, color: "#6b5d52", marginTop: 8 }}>
                  Go to{" "}
                  <a
                    href="https://sanity.io/manage"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--gold)" }}
                  >
                    sanity.io/manage
                  </a>{" "}
                  → API → CORS Origins → add{" "}
                  <code>http://localhost:3000</code> then refresh.
                </p>
              </div>
            )}

            {/* Empty state */}
            {!productsLoad && !fetchError && products.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  background: "#fff8f6",
                  borderRadius: 14,
                  border: "1px solid rgba(201,169,110,0.3)",
                  maxWidth: 560,
                  margin: "0 auto",
                }}
              >
                <p style={{ fontWeight: 600, color: "var(--espresso)" }}>
                  No products found
                </p>
                <p style={{ fontSize: 13, color: "#6b5d52", marginTop: 8 }}>
                  Make sure products are{" "}
                  <strong>Published</strong> (not just saved as drafts) in
                  Sanity Studio. Check the browser console for fetch logs.
                </p>
              </div>
            )}

            {/* Product grid */}
            {!productsLoad && products.length > 0 && (
              <div className="pk-grid">
                {products.map((p, i) => (
                  <Reveal key={p._id} delay={(i % 4) * 80}>
                    <Link href={`/product/${p._id}`} style={{ textDecoration: "none" }}>
                      <div className="pk-card pk-hover-lift pk-glow">
                        {p.images && p.images[0] ? (
                          <div className="pk-img-zoom" style={{ borderRadius: 15 }}>
                            <img
                              src={urlFor(p.images[0]).width(400).height(300).url()}
                              alt={p.title}
                              className="pk-card-img"
                            />
                          </div>
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: 220,
                              borderRadius: 15,
                              background: "var(--linen)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 40,
                            }}
                          >
                            🛒
                          </div>
                        )}
                        <div className="pk-card-body">
                          <h3 className="pk-card-title">{p.title}</h3>
                          {p.description && (
                            <p className="pk-card-desc">{p.description}</p>
                          )}
                          <div style={{ marginTop: 14 }}>
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "var(--gold)",
                              }}
                            >
                              View on Amazon →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY SHOP WITH PICKIFY
      ══════════════════════════════════════════ */}
      <section className="pk-section" style={{ background: "var(--linen)" }}>
        <div className="pk-container">
          <Reveal>
            <div className="pk-eyebrow">The Pickify standard</div>
            <h2 className="pk-section-title">Why Shop With Pickify</h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 24,
              marginTop: 40,
            }}
          >
            {WHY_ITEMS.map((item, i) => (
              <Reveal key={item.title} delay={i * 75}>
                <div
                  className="pk-hover-lift"
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "var(--radius-md)",
                    padding: "30px 24px",
                    height: "100%",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 3,
                      background: "var(--gold)",
                      borderRadius: 2,
                      marginBottom: 18,
                    }}
                  />
                  <h3 style={{ fontSize: 18, marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "#6b5d52", lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRENDING NOW (reuses Sanity products)
      ══════════════════════════════════════════ */}
      {trending.length > 0 && (
        <section className="pk-section">
          <div className="pk-container">
            <Reveal>
              <div className="pk-eyebrow">Gaining momentum</div>
              <h2 className="pk-section-title">Trending Now</h2>
            </Reveal>

            <div className="pk-grid" style={{ marginTop: 40 }}>
              {trending.map((p, i) => (
                <Reveal key={p._id} delay={i * 70}>
                  <Link href={`/product/${p._id}`} style={{ textDecoration: "none" }}>
                    <div className="pk-card pk-hover-lift">
                      {p.images && p.images[0] ? (
                        <img
                          src={urlFor(p.images[0]).width(400).height(300).url()}
                          alt={p.title}
                          className="pk-card-img"
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: 220,
                            borderRadius: 15,
                            background: "var(--linen)",
                          }}
                        />
                      )}
                      <div className="pk-card-body">
                        <h3 className="pk-card-title">{p.title}</h3>
                        {p.description && (
                          <p className="pk-card-desc">{p.description}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          PINTEREST CTA
      ══════════════════════════════════════════ */}
      <section
        className="pk-section"
        style={{
          background: "linear-gradient(135deg, #EDE0D4, #FAF7F2)",
          textAlign: "center",
        }}
      >
        <Reveal>
          <div className="pk-eyebrow" style={{ display: "flex", justifyContent: "center" }}>
            Save it for later
          </div>
          <h2 className="pk-section-title">Follow Pickify on Pinterest</h2>
          <p className="pk-section-sub" style={{ margin: "10px auto 28px" }}>
            New organisation boards, weekly. Pin your favourites and come
            back when you're ready to shop.
          </p>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pk-btn pk-btn-gold"
          >
            Follow on Pinterest
          </a>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════════ */}
      <section className="pk-section" style={{ background: "var(--linen)" }}>
        <div
          className="pk-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 30,
            flexWrap: "wrap",
          }}
        >
          <Reveal>
            <div className="pk-eyebrow">Stay organised</div>
            <h2 className="pk-section-title">Weekly Finds, Straight To Your Inbox</h2>
            <p className="pk-section-sub">
              One short email a week — new products, restocks, and seasonal
              organisation tips. No spam, ever.
            </p>
          </Reveal>

          <Reveal delay={100}>
            {subscribed ? (
              <p style={{ fontWeight: 500, color: "var(--espresso)" }}>
                You're on the list — welcome to Pickify ✦
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
              >
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: "14px 18px",
                    borderRadius: 999,
                    border: "1px solid rgba(44,24,16,0.2)",
                    minWidth: 220,
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
                <button type="submit" className="pk-btn pk-btn-primary">
                  Subscribe
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="pk-section">
        <div className="pk-container" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="pk-eyebrow">Good to know</div>
            <h2 className="pk-section-title">Frequently Asked Questions</h2>
          </Reveal>
          <div style={{ marginTop: 28 }}>
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      <Footer latestPosts={latestPosts} />
    </div>
  );
}