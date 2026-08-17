// "use client";

// // FILE PATH: src/app/product/[id]/page.js
// // STATUS: REPLACE EXISTING FILE

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { client, urlFor, getProductById, getRelatedProducts } from "../../../sanity";
// import Navbar from "../../../components/Navbar";
// import Footer from "../../../components/Footer";
// import Reveal from "../../../components/Reveal";
// import FaqAccordion from "../../../components/FaqAccordion";

// export default function ProductPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [activeImg, setActiveImg] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;
//     getProductById(id).then((p) => {
//       setProduct(p);
//       setLoading(false);
//       if (p?.category) {
//         getRelatedProducts(id, p.category).then(setRelated);
//       }
//     });
//   }, [id]);

//   if (loading) {
//     return (
//       <div>
//         <Navbar />
//         <div style={{ paddingTop: 160, textAlign: "center", color: "#6b5d52" }}>
//           Loading product…
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div>
//         <Navbar />
//         <div style={{ paddingTop: 160, textAlign: "center" }}>
//           <h2 className="pk-section-title">Product not found</h2>
//           <Link href="/" className="pk-btn pk-btn-primary" style={{ marginTop: 20, display: "inline-flex" }}>
//             Back to Pickify
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const images = product.images || [];
//   const highlights = product.highlights || [];
//   const pros = product.pros || [];
//   const bestFor = product.bestFor || [];
//   const faqItems = product.faq && product.faq.length > 0
//     ? product.faq
//     : [
//         {
//           q: "Will this fit my space?",
//           a: "Check the dimensions on the Amazon listing — most Pickify picks are designed to adapt to standard cabinet, fridge, and drawer sizes.",
//         },
//         {
//           q: "Is this product covered by a warranty?",
//           a: "Warranty terms are set by the seller on Amazon and are visible on the product listing before checkout.",
//         },
//         {
//           q: "Does Pickify ship this product?",
//           a: "No — Pickify links directly to Amazon, who handles shipping, payment, and returns.",
//         },
//       ];

//   return (
//     <div className="pk-no-scroll-x" style={{ paddingBottom: 90 }}>
//       <Navbar />

//       {/* BREADCRUMB */}
//       <div className="pk-container" style={{ marginTop: 110, fontSize: 13, color: "#8a7a6d" }}>
//         <Link href="/" style={{ textDecoration: "none", color: "#8a7a6d" }}>
//           Pickify
//         </Link>{" "}
//         / <span style={{ color: "var(--espresso)" }}>{product.title}</span>
//       </div>

//       {/* GALLERY + INFO */}
//       <section className="pk-container" style={{ marginTop: 24 }}>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: images.length ? "1fr 1fr" : "1fr",
//             gap: 48,
//           }}
//           className="pk-product-grid"
//         >
//           {/* GALLERY */}
//           {images.length > 0 && (
//             <div>
//               <div
//                 className="pk-img-zoom"
//                 style={{
//                   borderRadius: "var(--radius-lg)",
//                   overflow: "hidden",
//                   boxShadow: "var(--shadow-soft)",
//                   background: "#fff",
//                 }}
//               >
//                 <img
//                   src={urlFor(images[activeImg]).width(800).height(600).url()}
//                   alt={product.title}
//                   style={{ width: "100%", height: 480, objectFit: "cover" }}
//                 />
//               </div>
//               {images.length > 1 && (
//                 <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
//                   {images.map((img, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setActiveImg(i)}
//                       style={{
//                         border:
//                           activeImg === i
//                             ? "2px solid var(--gold)"
//                             : "2px solid transparent",
//                         borderRadius: 10,
//                         padding: 0,
//                         cursor: "pointer",
//                         overflow: "hidden",
//                         width: 72,
//                         height: 72,
//                         background: "none",
//                       }}
//                     >
//                       <img
//                         src={urlFor(img).width(100).height(100).url()}
//                         alt={`${product.title} ${i + 1}`}
//                         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* INFO */}
//           <div>
//             {product.category && <div className="pk-eyebrow">{product.category}</div>}
//             <h1 style={{ fontSize: "clamp(26px, 3vw, 38px)", lineHeight: 1.2 }}>
//               {product.title}
//             </h1>

//             {product.rating && (
//               <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
//                 <span style={{ color: "var(--gold)", fontSize: 16, letterSpacing: 2 }}>
//                   {"★".repeat(Math.round(product.rating))}
//                   {"☆".repeat(5 - Math.round(product.rating))}
//                 </span>
//                 <span style={{ fontSize: 13, color: "#6b5d52" }}>
//                   {product.rating.toFixed ? product.rating.toFixed(1) : product.rating} / 5
//                 </span>
//               </div>
//             )}

//             <p style={{ marginTop: 18, fontSize: 15.5, color: "#4a3d35", lineHeight: 1.8 }}>
//               {product.description}
//             </p>

//             {product.price && (
//               <div style={{ marginTop: 20, fontSize: 26, fontWeight: 600, color: "var(--espresso)" }}>
//                 {product.price}
//               </div>
//             )}

//             <div style={{ marginTop: 26, display: "flex", gap: 14, flexWrap: "wrap" }}>
//               <a
//                 href={product.link || "#"}
//                 target="_blank"
//                 rel="noopener noreferrer sponsored"
//                 className="pk-btn pk-btn-gold"
//                 style={{ fontSize: 15, padding: "16px 36px" }}
//               >
//                 View on Amazon →
//               </a>
//             </div>

//             {/* TRUST BADGES */}
//             <div
//               style={{
//                 display: "flex",
//                 gap: 18,
//                 marginTop: 26,
//                 flexWrap: "wrap",
//                 fontSize: 12.5,
//                 color: "#6b5d52",
//               }}
//             >
//               <span>✓ Hand-picked by Pickify</span>
//               <span>✓ Fulfilled & shipped by Amazon</span>
//               <span>✓ Reviewed for quality</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* KEY BENEFITS */}
//       {highlights.length > 0 && (
//         <section className="pk-section">
//           <div className="pk-container">
//             <Reveal>
//               <div className="pk-eyebrow">Key benefits</div>
//               <h2 className="pk-section-title">Product Highlights</h2>
//             </Reveal>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//                 gap: 22,
//                 marginTop: 32,
//               }}
//             >
//               {highlights.map((h, i) => (
//                 <Reveal key={i} delay={i * 70}>
//                   <div
//                     className="pk-hover-lift"
//                     style={{
//                       background: "#fff",
//                       borderRadius: "var(--radius-md)",
//                       padding: "24px 20px",
//                       boxShadow: "var(--shadow-soft)",
//                       height: "100%",
//                     }}
//                   >
//                     <div style={{ width: 30, height: 2, background: "var(--gold)", marginBottom: 14 }} />
//                     <p style={{ fontSize: 14.5, color: "#4a3d35", lineHeight: 1.7 }}>{h}</p>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* WHY WE LOVE IT + LIFESTYLE */}
//       <section className="pk-section" style={{ background: "var(--linen)" }}>
//         <div
//           className="pk-container"
//           style={{ display: "grid", gridTemplateColumns: images[1] ? "1fr 1fr" : "1fr", gap: 48, alignItems: "center" }}
//         >
//           <Reveal>
//             <div className="pk-eyebrow">Why we love it</div>
//             <h2 className="pk-section-title">{product.whyWeLoveItTitle || "An everyday upgrade worth making"}</h2>
//             <p className="pk-section-sub" style={{ maxWidth: 480 }}>
//               {product.whyWeLoveIt ||
//                 "This piece earned its spot on Pickify for doing one thing well: making a daily routine feel less chaotic and more considered, without demanding a full home renovation to get there."}
//             </p>
//             {bestFor.length > 0 && (
//               <div style={{ marginTop: 22 }}>
//                 <h4 style={{ fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--espresso)", marginBottom: 10 }}>
//                   Best For
//                 </h4>
//                 <ul style={{ paddingLeft: 18, color: "#4a3d35", fontSize: 14, lineHeight: 1.9 }}>
//                   {bestFor.map((b, i) => (
//                     <li key={i}>{b}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </Reveal>

//           {images[1] && (
//             <Reveal delay={100}>
//               <div className="pk-img-zoom" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-soft)" }}>
//                 <img
//                   src={urlFor(images[1]).width(600).height(440).url()}
//                   alt={`${product.title} in use`}
//                   style={{ width: "100%", height: 360, objectFit: "cover" }}
//                 />
//               </div>
//             </Reveal>
//           )}
//         </div>
//       </section>

//       {/* PROS */}
//       {pros.length > 0 && (
//         <section className="pk-section">
//           <div className="pk-container" style={{ maxWidth: 700 }}>
//             <Reveal>
//               <div className="pk-eyebrow">At a glance</div>
//               <h2 className="pk-section-title">What Stands Out</h2>
//             </Reveal>
//             <div style={{ marginTop: 26 }}>
//               {pros.map((pro, i) => (
//                 <Reveal key={i} delay={i * 50}>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "flex-start",
//                       gap: 12,
//                       padding: "14px 0",
//                       borderBottom: "1px solid rgba(44,24,16,0.08)",
//                     }}
//                   >
//                     <span style={{ color: "var(--gold)", fontSize: 16 }}>✓</span>
//                     <span style={{ fontSize: 14.5, color: "#4a3d35" }}>{pro}</span>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* MID-PAGE CTA */}
//       <section className="pk-section" style={{ background: "var(--espresso)", textAlign: "center" }}>
//         <Reveal>
//           <h2 className="pk-section-title" style={{ color: "#FAF7F2" }}>
//             Ready to bring this home?
//           </h2>
//           <p style={{ color: "rgba(250,247,242,0.7)", marginTop: 10, marginBottom: 26 }}>
//             Available now on Amazon with fast, trusted shipping.
//           </p>
//           <a
//             href={product.link || "#"}
//             target="_blank"
//             rel="noopener noreferrer sponsored"
//             className="pk-btn pk-btn-gold"
//           >
//             Check Price on Amazon →
//           </a>
//         </Reveal>
//       </section>

//       {/* FAQ */}
//       <section className="pk-section">
//         <div className="pk-container" style={{ maxWidth: 700 }}>
//           <Reveal>
//             <div className="pk-eyebrow">Common questions</div>
//             <h2 className="pk-section-title">FAQ</h2>
//           </Reveal>
//           <div style={{ marginTop: 26 }}>
//             <FaqAccordion items={faqItems} />
//           </div>
//         </div>
//       </section>

//       {/* RELATED PRODUCTS */}
//       {related.length > 0 && (
//         <section className="pk-section" style={{ background: "var(--linen)" }}>
//           <div className="pk-container">
//             <Reveal>
//               <div className="pk-eyebrow">You might also like</div>
//               <h2 className="pk-section-title">Related Products</h2>
//             </Reveal>
//             <div className="pk-grid" style={{ marginTop: 36 }}>
//               {related.map((p, i) => (
//                 <Reveal key={p._id} delay={i * 70}>
//                   <Link href={`/product/${p._id}`} style={{ textDecoration: "none" }}>
//                     <div className="pk-card pk-hover-lift">
//                       {p.images && p.images[0] && (
//                         <img
//                           src={urlFor(p.images[0]).width(400).height(300).url()}
//                           alt={p.title}
//                           className="pk-card-img"
//                         />
//                       )}
//                       <div className="pk-card-body">
//                         <h3 className="pk-card-title">{p.title}</h3>
//                       </div>
//                     </div>
//                   </Link>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       <Footer />

//       {/* STICKY MOBILE BUY BAR */}
//       <div className="pk-sticky-buy">
//         <a
//           href={product.link || "#"}
//           target="_blank"
//           rel="noopener noreferrer sponsored"
//           className="pk-btn pk-btn-gold"
//         >
//           {product.price ? `View on Amazon — ${product.price}` : "View on Amazon"}
//         </a>
//       </div>

//       <style>{`
//         @media (max-width: 768px) {
//           .pk-product-grid { grid-template-columns: 1fr !important; }
//         }
//       `}</style>
//     </div>
//   );
// }



// "use client";

// // FILE PATH: src/app/product/[id]/page.js
// // STATUS: REPLACE EXISTING FILE

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { getProductById, urlFor } from "../../../sanity";
import { getAffiliateCta, getAffiliateLabel } from "../../../lib/affiliateUtils";
// import Navbar from "../../../components/Navbar";
// import Footer from "../../../components/Footer";
// import Reveal from "../../../components/Reveal";
// import FaqAccordion from "../../../components/FaqAccordion";

// /* ─── Static FAQ (no faq field in schema) ─── */
// const STATIC_FAQ = [
//   {
//     q: "Does Pickify ship this product?",
//     a: "No — Pickify links directly to Amazon, who handles all shipping, payment, and returns.",
//   },
//   {
//     q: "Is this product covered by a warranty?",
//     a: "Warranty terms are set by the seller on Amazon and visible on the product listing before checkout.",
//   },
//   {
//     q: "Will this fit in my space?",
//     a: "Check the exact dimensions listed on this page and on the Amazon listing before ordering.",
//   },
//   {
//     q: "How does Pickify choose its products?",
//     a: "Every product is hand-reviewed for build quality, real customer reviews, and practical value in everyday homes.",
//   },
// ];

// /* ─── Badge colour map ─── */
// const BADGE_COLORS = {
//   "Best Seller":     { bg: "#C9A96E", color: "#2C1810" },
//   "Editor's Choice": { bg: "#2C1810", color: "#FAF7F2" },
//   "Best Value":      { bg: "#4a7c59", color: "#fff"    },
//   "Budget Pick":     { bg: "#6b8cba", color: "#fff"    },
//   "Most Popular":    { bg: "#C9A96E", color: "#2C1810" },
//   "Trending":        { bg: "#c0392b", color: "#fff"    },
//   "New Arrival":     { bg: "#8e44ad", color: "#fff"    },
// };

// export default function ProductPage() {
//   const { id } = useParams();

//   const [product,   setProduct]   = useState(null);
//   const [activeImg, setActiveImg] = useState(0);
//   const [loading,   setLoading]   = useState(true);
//   const [error,     setError]     = useState(null);

//   useEffect(() => {
//     if (!id) return;
//     setLoading(true);
//     setActiveImg(0);
//     getProductById(id)
//       .then((p) => {
//         console.log("[Pickify] product loaded:", p);
//         setProduct(p || null);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("[Pickify] product fetch failed:", err);
//         setError(err.message || "Failed to load product.");
//         setLoading(false);
//       });
//   }, [id]);

//   /* ── Loading ── */
//   if (loading) {
//     return (
//       <div className="pk-no-scroll-x">
//         <Navbar />
//         <div style={{ paddingTop: 180, textAlign: "center", minHeight: "60vh" }}>
//           <div className="pk-pdp-spinner" />
//           <p style={{ marginTop: 20, color: "#6b5d52", fontSize: 14 }}>
//             Loading product…
//           </p>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   /* ── Error / not found ── */
//   if (error || !product) {
//     return (
//       <div className="pk-no-scroll-x">
//         <Navbar />
//         <div style={{ paddingTop: 160, textAlign: "center", padding: "160px 20px 80px", minHeight: "60vh" }}>
//           <h2 className="pk-section-title">Product not found</h2>
//           <p style={{ color: "#6b5d52", marginTop: 12, fontSize: 14 }}>
//             {error || "This product may have been removed or is unavailable."}
//           </p>
//           <Link
//             href="/"
//             className="pk-btn pk-btn-primary"
//             style={{ marginTop: 28, display: "inline-flex" }}
//           >
//             ← Back to Pickify
//           </Link>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   /* ─────────────────────────────────────────────────────────────
//      FIX: Use || [] instead of destructuring defaults (= []).
//      Destructuring defaults only fire for UNDEFINED.
//      Sanity returns NULL for empty arrays, which bypasses = []
//      and causes: Cannot read properties of null (reading 'length')
//   ───────────────────────────────────────────────────────────── */
//   const title           = product.title           || "";
//   const brand           = product.brand           || "";
//   const category        = product.category        || "";
//   const shortDescription= product.shortDescription|| "";
//   const description     = product.description     || "";
//   const link            = product.link            || "#";
//   const material        = product.material        || "";
//   const color           = product.color           || "";
//   const dimensions      = product.dimensions      || "";
//   const tiers           = product.tiers           || "";
//   const badge           = product.badge           || "";
//   const seoTitle        = product.seoTitle        || title;

//   /* Arrays — null-safe with || [] */
//   const images          = product.images          || [];
//   const features        = product.features        || [];
//   const benefits        = product.benefits        || [];
//   const pros            = product.pros            || [];
//   const cons            = product.cons            || [];
//   const bestFor         = product.bestFor         || [];
//   const relatedProducts = product.relatedProducts || [];

//   const badgeStyle = badge
//     ? (BADGE_COLORS[badge] || { bg: "#C9A96E", color: "#2C1810" })
//     : null;

//   /* Specs — only rows with real data */
//   const specs = [
//     { label: "Material",   value: material   },
//     { label: "Color",      value: color      },
//     { label: "Dimensions", value: dimensions },
//     { label: "Tiers",      value: tiers      },
//     { label: "Brand",      value: brand      },
//     { label: "Category",   value: category   },
//   ].filter((s) => Boolean(s.value));

//   const hasSpecs = specs.length > 0;

//   return (
//     <div className="pk-no-scroll-x" style={{ paddingBottom: 80 }}>
//       <Navbar />

//       {/* ══════════════════════════════════════════════════
//           BREADCRUMB
//       ══════════════════════════════════════════════════ */}
//       <div
//         className="pk-container"
//         style={{ marginTop: 106, paddingTop: 16, fontSize: 13, color: "#8a7a6d" }}
//       >
//         <Link href="/" style={{ textDecoration: "none", color: "#8a7a6d" }}>
//           Pickify
//         </Link>
//         {category && (
//           <>
//             {" / "}
//             <span style={{ color: "#8a7a6d" }}>{category}</span>
//           </>
//         )}
//         {" / "}
//         <span style={{ color: "var(--espresso)", fontWeight: 500 }}>{title}</span>
//       </div>

//       {/* ══════════════════════════════════════════════════
//           HERO — GALLERY + INFO
//       ══════════════════════════════════════════════════ */}
//       <section className="pk-container pk-pdp-hero">

//         {/* LEFT — IMAGE GALLERY */}
//         <div className="pk-pdp-gallery">
//           <div className="pk-pdp-main-img pk-img-zoom">
//             {images.length > 0 ? (
//               <img
//                 src={urlFor(images[activeImg]).width(900).height(700).fit("crop").url()}
//                 alt={title}
//               />
//             ) : (
//               <div className="pk-pdp-img-placeholder">🛒</div>
//             )}

//             {badge && badgeStyle && (
//               <div
//                 className="pk-pdp-badge"
//                 style={{ background: badgeStyle.bg, color: badgeStyle.color }}
//               >
//                 {badge}
//               </div>
//             )}
//           </div>

//           {images.length > 1 && (
//             <div className="pk-pdp-thumbs">
//               {images.map((img, i) => (
//                 <button
//                   key={i}
//                   type="button"
//                   onClick={() => setActiveImg(i)}
//                   className={`pk-pdp-thumb${i === activeImg ? " pk-pdp-thumb-active" : ""}`}
//                   aria-label={`View image ${i + 1}`}
//                 >
//                   <img
//                     src={urlFor(img).width(120).height(120).fit("crop").url()}
//                     alt={`${title} ${i + 1}`}
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* RIGHT — PRODUCT INFO */}
//         <div className="pk-pdp-info">
//           {category && <div className="pk-eyebrow">{category}</div>}

//           <h1 className="pk-pdp-title">{title}</h1>

//           {shortDescription && (
//             <p className="pk-pdp-short-desc">{shortDescription}</p>
//           )}

//           <a
//             href={link}
//             target="_blank"
//             rel="noopener noreferrer sponsored"
//             className="pk-btn pk-btn-gold pk-pdp-cta"
//           >
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//               <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
//               <line x1="3" y1="6" x2="21" y2="6"/>
//               <path d="M16 10a4 4 0 0 1-8 0"/>
//             </svg>
//             View on Amazon
//           </a>

//           <div className="pk-pdp-trust">
//             <span>✓ Hand-picked by Pickify</span>
//             <span>✓ Shipped by Amazon</span>
//             <span>✓ Quality reviewed</span>
//           </div>

//           {features.length > 0 && (
//             <div className="pk-pdp-quick-features">
//               <p className="pk-pdp-features-label">Key Features</p>
//               <ul className="pk-pdp-features-list">
//                 {features.slice(0, 4).map((f, i) => (
//                   <li key={i}>{f}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {hasSpecs && (
//             <div className="pk-pdp-specs-snap">
//               {specs.slice(0, 3).map((s) => (
//                 <div key={s.label} className="pk-pdp-spec-pill">
//                   <span className="pk-pdp-spec-pill-label">{s.label}</span>
//                   <span className="pk-pdp-spec-pill-val">{s.value}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ══════════════════════════════════════════════════
//           FULL DESCRIPTION
//       ══════════════════════════════════════════════════ */}
//       {description && (
//         <section className="pk-section" style={{ background: "var(--linen)" }}>
//           <div className="pk-container" style={{ maxWidth: 860 }}>
//             <Reveal>
//               <div className="pk-eyebrow">About this product</div>
//               <h2 className="pk-section-title">Full Description</h2>
//               <p
//                 style={{
//                   marginTop: 20,
//                   fontSize: 15.5,
//                   color: "#4a3d35",
//                   lineHeight: 1.9,
//                   whiteSpace: "pre-line",
//                 }}
//               >
//                 {description}
//               </p>
//             </Reveal>
//           </div>
//         </section>
//       )}

//       {/* ══════════════════════════════════════════════════
//           ALL KEY FEATURES
//       ══════════════════════════════════════════════════ */}
//       {features.length > 0 && (
//         <section className="pk-section">
//           <div className="pk-container">
//             <Reveal>
//               <div className="pk-eyebrow">What makes it great</div>
//               <h2 className="pk-section-title">Key Features</h2>
//             </Reveal>
//             <div className="pk-pdp-features-grid">
//               {features.map((f, i) => (
//                 <Reveal key={i} delay={i * 60}>
//                   <div className="pk-pdp-feature-card">
//                     <span className="pk-pdp-feature-num">
//                       {String(i + 1).padStart(2, "0")}
//                     </span>
//                     <p>{f}</p>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ══════════════════════════════════════════════════
//           BENEFITS
//       ══════════════════════════════════════════════════ */}
//       {benefits.length > 0 && (
//         <section className="pk-section" style={{ background: "var(--espresso)" }}>
//           <div className="pk-container">
//             <Reveal>
//               <div className="pk-eyebrow" style={{ color: "var(--gold)" }}>
//                 Real-life impact
//               </div>
//               <h2 className="pk-section-title" style={{ color: "#FAF7F2" }}>
//                 Benefits
//               </h2>
//             </Reveal>
//             <div className="pk-pdp-benefits-grid">
//               {benefits.map((b, i) => (
//                 <Reveal key={i} delay={i * 65}>
//                   <div className="pk-pdp-benefit-card">
//                     <div className="pk-pdp-benefit-icon">✦</div>
//                     <p>{b}</p>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ══════════════════════════════════════════════════
//           PROS + CONS
//       ══════════════════════════════════════════════════ */}
//       {(pros.length > 0 || cons.length > 0) && (
//         <section className="pk-section">
//           <div className="pk-container">
//             <Reveal>
//               <div className="pk-eyebrow">Honest assessment</div>
//               <h2 className="pk-section-title">Pros & Cons</h2>
//             </Reveal>
//             <div className="pk-pdp-proscons">
//               {pros.length > 0 && (
//                 <div className="pk-pdp-pros-col">
//                   <div className="pk-pdp-proscons-header pk-pdp-proscons-header-pros">
//                     <span>👍</span> Pros
//                   </div>
//                   {pros.map((p, i) => (
//                     <Reveal key={i} delay={i * 50}>
//                       <div className="pk-pdp-proscons-row">
//                         <span className="pk-pdp-check-icon">✓</span>
//                         <span>{p}</span>
//                       </div>
//                     </Reveal>
//                   ))}
//                 </div>
//               )}

//               {cons.length > 0 && (
//                 <div className="pk-pdp-cons-col">
//                   <div className="pk-pdp-proscons-header pk-pdp-proscons-header-cons">
//                     <span>👎</span> Cons
//                   </div>
//                   {cons.map((c, i) => (
//                     <Reveal key={i} delay={i * 50}>
//                       <div className="pk-pdp-proscons-row">
//                         <span className="pk-pdp-cross-icon">✗</span>
//                         <span>{c}</span>
//                       </div>
//                     </Reveal>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ══════════════════════════════════════════════════
//           BEST FOR
//       ══════════════════════════════════════════════════ */}
//       {bestFor.length > 0 && (
//         <section className="pk-section" style={{ background: "var(--linen)" }}>
//           <div className="pk-container">
//             <Reveal>
//               <div className="pk-eyebrow">Ideal use cases</div>
//               <h2 className="pk-section-title">Best For</h2>
//             </Reveal>
//             <div className="pk-pdp-bestfor-grid">
//               {bestFor.map((b, i) => (
//                 <Reveal key={i} delay={i * 55}>
//                   <div className="pk-pdp-bestfor-card">
//                     <div className="pk-pdp-bestfor-dot" />
//                     <span>{b}</span>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ══════════════════════════════════════════════════
//           SPECIFICATIONS TABLE
//       ══════════════════════════════════════════════════ */}
//       {hasSpecs && (
//         <section className="pk-section">
//           <div className="pk-container" style={{ maxWidth: 720 }}>
//             <Reveal>
//               <div className="pk-eyebrow">Product details</div>
//               <h2 className="pk-section-title">Specifications</h2>
//             </Reveal>
//             <Reveal delay={80}>
//               <table className="pk-pdp-specs-table">
//                 <tbody>
//                   {specs.map((s) => (
//                     <tr key={s.label}>
//                       <th>{s.label}</th>
//                       <td>{s.value}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </Reveal>
//           </div>
//         </section>
//       )}

//       {/* ══════════════════════════════════════════════════
//           MID-PAGE CTA BANNER
//       ══════════════════════════════════════════════════ */}
//       <section className="pk-pdp-cta-banner">
//         <Reveal>
//           <p className="pk-pdp-cta-banner-sub">Available now on Amazon</p>
//           <h2 className="pk-pdp-cta-banner-title">Ready to bring this home?</h2>
//           <a
//             href={link}
//             target="_blank"
//             rel="noopener noreferrer sponsored"
//             className="pk-btn pk-btn-gold"
//             style={{ fontSize: 15, padding: "16px 42px" }}
//           >
//             Check Price on Amazon →
//           </a>
//           <p className="pk-pdp-cta-banner-disclosure">
//             As an Amazon Associate, Pickify earns from qualifying purchases.
//           </p>
//         </Reveal>
//       </section>

//       {/* ══════════════════════════════════════════════════
//           FAQ
//       ══════════════════════════════════════════════════ */}
//       <section className="pk-section">
//         <div className="pk-container" style={{ maxWidth: 720 }}>
//           <Reveal>
//             <div className="pk-eyebrow">Common questions</div>
//             <h2 className="pk-section-title">FAQ</h2>
//           </Reveal>
//           <div style={{ marginTop: 28 }}>
//             <FaqAccordion items={STATIC_FAQ} />
//           </div>
//         </div>
//       </section>

//       {/* ══════════════════════════════════════════════════
//           RELATED PRODUCTS
//       ══════════════════════════════════════════════════ */}
//       {relatedProducts.length > 0 && (
//         <section className="pk-section" style={{ background: "var(--linen)" }}>
//           <div className="pk-container">
//             <Reveal>
//               <div className="pk-eyebrow">You might also like</div>
//               <h2 className="pk-section-title">Related Products</h2>
//             </Reveal>
//             <div className="pk-grid" style={{ marginTop: 36 }}>
//               {relatedProducts.map((p, i) => {
//                 const rImages = p.images || [];
//                 return (
//                   <Reveal key={p._id} delay={i * 70}>
//                     <Link href={`/product/${p._id}`} style={{ textDecoration: "none" }}>
//                       <div className="pk-card pk-hover-lift pk-glow">
//                         {rImages.length > 0 ? (
//                           <div className="pk-img-zoom" style={{ borderRadius: 15 }}>
//                             <img
//                               src={urlFor(rImages[0]).width(400).height(300).fit("crop").url()}
//                               alt={p.title}
//                               className="pk-card-img"
//                             />
//                           </div>
//                         ) : (
//                           <div
//                             style={{
//                               height: 220,
//                               borderRadius: 15,
//                               background: "var(--ivory)",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               fontSize: 36,
//                             }}
//                           >
//                             🛒
//                           </div>
//                         )}
//                         <div className="pk-card-body">
//                           {p.badge && (
//                             <span
//                               style={{
//                                 fontSize: 11,
//                                 fontWeight: 700,
//                                 letterSpacing: "0.06em",
//                                 textTransform: "uppercase",
//                                 color: "var(--gold)",
//                               }}
//                             >
//                               {p.badge}
//                             </span>
//                           )}
//                           <h3
//                             className="pk-card-title"
//                             style={{ marginTop: p.badge ? 6 : 0 }}
//                           >
//                             {p.title}
//                           </h3>
//                           {p.shortDescription && (
//                             <p className="pk-card-desc">{p.shortDescription}</p>
//                           )}
//                           <div style={{ marginTop: 14 }}>
//                             <span style={{ fontSize: 13, fontWeight: 600, color: "var(--gold)" }}>
//                               View on Amazon →
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </Reveal>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       <Footer />

//       {/* ══════════════════════════════════════════════════
//           STICKY MOBILE BUY BAR
//       ══════════════════════════════════════════════════ */}
//       <div className="pk-sticky-buy">
//         <a
//           href={link}
//           target="_blank"
//           rel="noopener noreferrer sponsored"
//           className="pk-btn pk-btn-gold"
//         >
//           View on Amazon →
//         </a>
//       </div>
//     </div>
//   );
// }


"use client";

// FILE PATH: src/app/product/[id]/page.js
// STATUS: REPLACE EXISTING FILE — luxury UI redesign, logic unchanged

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProductById, urlFor } from "../../../sanity";
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
  const affilCta         = getAffiliateCta(product);  // {label, href, source}
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
{affilCta.source === "Amazon" && "As an Amazon Associate, Pickify earns from qualifying purchases."}
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