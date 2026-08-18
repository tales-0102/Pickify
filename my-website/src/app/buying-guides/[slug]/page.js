// "use client";

// // PATH: my-website/src/app/buying-guides/[slug]/page.js
// // NEW FILE — individual buying guide page

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { PortableText } from "@portabletext/react";
// import { getBuyingGuideBySlug, urlFor } from "../../../sanity";
// import Navbar from "../../../components/Navbar";
// import Footer from "../../../components/Footer";
// import Reveal from "../../../components/Reveal";
// import FaqAccordion from "../../../components/FaqAccordion";

// /* ── PortableText renderers matching the blog page style ── */
// const portableComponents = {
//   block: {
//     h2: ({ children }) => (
//       <h2 style={{ fontSize: 26, marginTop: 36, marginBottom: 14, fontFamily: "var(--font-heading), serif", color: "var(--espresso)" }}>
//         {children}
//       </h2>
//     ),
//     h3: ({ children }) => (
//       <h3 style={{ fontSize: 21, marginTop: 28, marginBottom: 10, fontFamily: "var(--font-heading), serif", color: "var(--espresso)" }}>
//         {children}
//       </h3>
//     ),
//     normal: ({ children }) => (
//       <p style={{ fontSize: 16, lineHeight: 1.9, color: "#4a3d35", marginBottom: 18 }}>
//         {children}
//       </p>
//     ),
//     blockquote: ({ children }) => (
//       <blockquote style={{ borderLeft: "3px solid var(--gold)", paddingLeft: 20, margin: "28px 0", fontStyle: "italic", color: "var(--espresso)", fontSize: 17 }}>
//         {children}
//       </blockquote>
//     ),
//   },
//   types: {
//     image: ({ value }) => (
//       <img
//         src={urlFor(value).width(900).url()}
//         alt={value.alt || ""}
//         style={{ width: "100%", borderRadius: "var(--radius-md)", margin: "28px 0" }}
//       />
//     ),
//   },
// };

// /* ── Affiliate source label helper (future-ready) ── */
// function affiliateCTA(link) {
//   if (!link) return { label: "View Product", href: "#" };
//   try {
//     const url = new URL(link);
//     if (url.hostname.includes("amazon"))  return { label: "Check Price on Amazon →", href: link };
//     if (url.hostname.includes("etsy"))    return { label: "Shop on Etsy →",          href: link };
//     if (url.hostname.includes("walmart")) return { label: "View on Walmart →",       href: link };
//     return { label: "View Product →", href: link };
//   } catch {
//     return { label: "View Product →", href: link };
//   }
// }

// export default function BuyingGuidePage() {
//   const { slug } = useParams();
//   const [guide,   setGuide]   = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState(null);

//   useEffect(() => {
//     if (!slug) return;
//     getBuyingGuideBySlug(slug)
//       .then((g) => {
//         setGuide(g || null);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("[Pickify] buying guide fetch failed:", err);
//         setError(err.message);
//         setLoading(false);
//       });
//   }, [slug]);

//   /* Loading */
//   if (loading) {
//     return (
//       <div className="pk-no-scroll-x">
//         <Navbar />
//         <div style={{ paddingTop: 160, textAlign: "center", minHeight: "60vh" }}>
//           <p style={{ color: "#6b5d52" }}>Loading guide…</p>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   /* Not found / error */
//   if (error || !guide) {
//     return (
//       <div className="pk-no-scroll-x">
//         <Navbar />
//         <div style={{ paddingTop: 160, textAlign: "center", padding: "160px 20px 80px" }}>
//           <h2 className="pk-section-title">Guide not found</h2>
//           <p style={{ color: "#6b5d52", marginTop: 12 }}>
//             {error || "This buying guide may not exist yet."}
//           </p>
//           <Link href="/buying-guides" className="pk-btn pk-btn-primary" style={{ marginTop: 24, display: "inline-flex" }}>
//             ← All Buying Guides
//           </Link>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const recommendedProducts = guide.recommendedProducts || [];
//   const faqs                = guide.faqs               || [];
//   const relatedArticles     = guide.relatedArticles    || [];
//   const relatedGuides       = guide.relatedGuides      || [];
//   const buyingCriteria      = guide.buyingCriteria     || [];
//   const specificationsToConsider = guide.specificationsToConsider || [];
//   const commonMistakes      = guide.commonMistakes     || [];

//   return (
//     <div className="pk-no-scroll-x">
//       <Navbar />

//       {/* ── HERO ── */}
//       {guide.heroImage ? (
//         <div style={{ marginTop: 86, height: 420, overflow: "hidden", position: "relative" }}>
//           <img
//             src={urlFor(guide.heroImage).width(1600).height(700).url()}
//             alt={guide.heroImage?.alt || guide.title}
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               background: "linear-gradient(180deg, rgba(44,24,16,0.1), rgba(44,24,16,0.55))",
//             }}
//           />
//           <div style={{ position: "absolute", bottom: 36, left: "8%", right: "8%", maxWidth: 820 }}>
//             {guide.category && (
//               <span style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>
//                 {guide.category}
//               </span>
//             )}
//             <h1 style={{ color: "#FAF7F2", fontSize: "clamp(28px, 4vw, 44px)", marginTop: 10, fontFamily: "var(--font-heading), serif" }}>
//               {guide.title}
//             </h1>
//           </div>
//         </div>
//       ) : (
//         /* No hero image — show text-only header */
//         <section className="pk-section" style={{ marginTop: 70, textAlign: "center", background: "var(--linen)" }}>
//           <div className="pk-container">
//             {guide.category && (
//               <div className="pk-eyebrow" style={{ justifyContent: "center", display: "flex" }}>
//                 {guide.category}
//               </div>
//             )}
//             <h1 className="pk-section-title" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
//               {guide.title}
//             </h1>
//           </div>
//         </section>
//       )}

//       {/* ── BREADCRUMB ── */}
//       <div
//         className="pk-container"
//         style={{ marginTop: guide.heroImage ? 36 : 20, fontSize: 13, color: "#8a7a6d", paddingBottom: 8 }}
//       >
//         <Link href="/"              style={{ textDecoration: "none", color: "#8a7a6d" }}>Home</Link>
//         {" / "}
//         <Link href="/buying-guides" style={{ textDecoration: "none", color: "#8a7a6d" }}>Buying Guides</Link>
//         {" / "}
//         <span style={{ color: "var(--espresso)", fontWeight: 500 }}>{guide.title}</span>
//       </div>

//       {/* ── INTRODUCTION ── */}
//       {(guide.shortDescription || guide.introduction) && (
//         <section className="pk-section" style={{ background: "var(--ivory)" }}>
//           <div className="pk-container" style={{ maxWidth: 820 }}>
//             <Reveal>
//               {guide.shortDescription && !guide.introduction && (
//                 <p style={{ fontSize: 16.5, color: "#4a3d35", lineHeight: 1.9, marginBottom: 0 }}>
//                   {guide.shortDescription}
//                 </p>
//               )}
//               {guide.introduction && (
//                 <PortableText value={guide.introduction} components={portableComponents} />
//               )}
//             </Reveal>
//           </div>
//         </section>
//       )}

//       {/* ── WHAT TO LOOK FOR (Buying Criteria) ── */}
//       {buyingCriteria.length > 0 && (
//         <section className="pk-section">
//           <div className="pk-container">
//             <Reveal>
//               <div className="pk-eyebrow">Make the right choice</div>
//               <h2 className="pk-section-title">What to Look For</h2>
//             </Reveal>

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//                 gap: 22,
//                 marginTop: 36,
//               }}
//             >
//               {buyingCriteria.map((criterion, i) => (
//                 <Reveal key={i} delay={i * 60}>
//                   <div
//                     className="pk-hover-lift"
//                     style={{
//                       background: "#fff",
//                       borderRadius: "var(--radius-md)",
//                       padding: "24px 22px",
//                       boxShadow: "var(--shadow-soft)",
//                       height: "100%",
//                       borderTop: "3px solid var(--gold)",
//                     }}
//                   >
//                     {criterion.heading && (
//                       <h3 style={{ fontSize: 17, marginBottom: 10, color: "var(--espresso)" }}>
//                         {criterion.heading}
//                       </h3>
//                     )}
//                     {criterion.description && (
//                       <p style={{ fontSize: 14, color: "#6b5d52", lineHeight: 1.7 }}>
//                         {criterion.description}
//                       </p>
//                     )}
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ── SPECIFICATIONS ── */}
//       {specificationsToConsider.length > 0 && (
//         <section className="pk-section" style={{ background: "var(--linen)" }}>
//           <div className="pk-container" style={{ maxWidth: 720 }}>
//             <Reveal>
//               <div className="pk-eyebrow">Key details</div>
//               <h2 className="pk-section-title">Specifications to Consider</h2>
//             </Reveal>
//             <ul style={{ marginTop: 28, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
//               {specificationsToConsider.map((spec, i) => (
//                 <Reveal key={i} delay={i * 40}>
//                   <li
//                     style={{
//                       display: "flex",
//                       alignItems: "flex-start",
//                       gap: 12,
//                       padding: "14px 18px",
//                       background: "#fff",
//                       borderRadius: "var(--radius-sm)",
//                       boxShadow: "var(--shadow-soft)",
//                       fontSize: 14.5,
//                       color: "#4a3d35",
//                     }}
//                   >
//                     <span style={{ color: "var(--gold)", fontWeight: 700, flexShrink: 0 }}>→</span>
//                     {spec}
//                   </li>
//                 </Reveal>
//               ))}
//             </ul>
//           </div>
//         </section>
//       )}

//       {/* ── RECOMMENDED PRODUCTS ── */}
//       {recommendedProducts.length > 0 && (
//         <section className="pk-section">
//           <div className="pk-container">
//             <Reveal>
//               <div className="pk-eyebrow">Our top picks</div>
//               <h2 className="pk-section-title">Recommended Products</h2>
//             </Reveal>

//             <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 40 }}>
//               {recommendedProducts.map((rec, i) => {
//                 const p = rec.product;
//                 if (!p) return null;
//                 const images = p.images || [];
//                 const cta    = affiliateCTA(p.link);

//                 return (
//                   <Reveal key={p._id || i} delay={i * 60}>
//                     <div
//                       style={{
//                         background: "#fff",
//                         borderRadius: "var(--radius-lg)",
//                         boxShadow: "var(--shadow-soft)",
//                         overflow: "hidden",
//                         display: "grid",
//                         gridTemplateColumns: "280px 1fr",
//                         gap: 0,
//                         border: "1px solid rgba(44,24,16,0.06)",
//                       }}
//                       className="pk-bg-card"
//                     >
//                       {/* IMAGE */}
//                       <div style={{ position: "relative", minHeight: 220, background: "var(--linen)" }}>
//                         {images.length > 0 ? (
//                           <img
//                             src={urlFor(images[0]).width(400).height(320).fit("crop").url()}
//                             alt={p.title}
//                             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                           />
//                         ) : (
//                           <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>
//                             🛒
//                           </div>
//                         )}

//                         {/* Label badge */}
//                         {rec.label && (
//                           <span
//                             style={{
//                               position: "absolute",
//                               top: 14,
//                               left: 14,
//                               background: "var(--gold)",
//                               color: "var(--espresso)",
//                               fontSize: 11,
//                               fontWeight: 700,
//                               letterSpacing: "0.07em",
//                               textTransform: "uppercase",
//                               padding: "5px 13px",
//                               borderRadius: 999,
//                               boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
//                             }}
//                           >
//                             {rec.label}
//                           </span>
//                         )}
//                       </div>

//                       {/* CONTENT */}
//                       <div style={{ padding: "28px 28px 28px 28px" }}>
//                         {p.category && (
//                           <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>
//                             {p.category}
//                           </span>
//                         )}
//                         <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontFamily: "var(--font-heading), serif", marginTop: 6, marginBottom: 10, color: "var(--espresso)" }}>
//                           {p.title}
//                         </h3>

//                         {/* Editorial note from guide editor */}
//                         {rec.whyWeRecommendIt && (
//                           <p style={{ fontSize: 14, color: "#4a3d35", lineHeight: 1.7, marginBottom: 14, fontStyle: "italic", borderLeft: "2px solid var(--gold)", paddingLeft: 12 }}>
//                             {rec.whyWeRecommendIt}
//                           </p>
//                         )}

//                         {p.shortDescription && !rec.whyWeRecommendIt && (
//                           <p style={{ fontSize: 14, color: "#4a3d35", lineHeight: 1.7, marginBottom: 14 }}>
//                             {p.shortDescription}
//                           </p>
//                         )}

//                         {/* Key features — up to 3 */}
//                         {(p.features || []).length > 0 && (
//                           <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
//                             {p.features.slice(0, 3).map((f, fi) => (
//                               <li key={fi} style={{ fontSize: 13.5, color: "#6b5d52", paddingLeft: 18, position: "relative" }}>
//                                 <span style={{ position: "absolute", left: 0, color: "var(--gold)" }}>✓</span>
//                                 {f}
//                               </li>
//                             ))}
//                           </ul>
//                         )}

//                         {/* CTA buttons — internal product page FIRST, then affiliate */}
//                         <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
//                           <Link
//                             href={`/product/${p._id}`}
//                             className="pk-btn pk-btn-primary"
//                             style={{ fontSize: 13, padding: "11px 22px" }}
//                           >
//                             View Full Details
//                           </Link>
//                           <a
//                             href={p.link || "#"}
//                             target="_blank"
//                             rel="noopener noreferrer sponsored"
//                             className="pk-btn pk-btn-outline"
//                             style={{ fontSize: 13, padding: "11px 22px" }}
//                           >
//                             {cta.label}
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </Reveal>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ── WHO IT'S BEST FOR / WHO SHOULD AVOID ── */}
//       {(guide.whoIsItBestFor || guide.whoShouldAvoid) && (
//         <section className="pk-section" style={{ background: "var(--linen)" }}>
//           <div className="pk-container">
//             <Reveal>
//               <h2 className="pk-section-title">Is This Right for You?</h2>
//             </Reveal>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: guide.whoIsItBestFor && guide.whoShouldAvoid ? "1fr 1fr" : "1fr",
//                 gap: 24,
//                 marginTop: 32,
//               }}
//               className="pk-bg-card-grid"
//             >
//               {guide.whoIsItBestFor && (
//                 <Reveal>
//                   <div style={{ background: "#f0faf4", borderRadius: "var(--radius-md)", padding: "24px", border: "1px solid #d4edda" }}>
//                     <h3 style={{ fontSize: 16, fontWeight: 700, color: "#2d6a4f", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-body)" }}>
//                       ✓ Best For
//                     </h3>
//                     <p style={{ fontSize: 14.5, color: "#4a3d35", lineHeight: 1.75 }}>
//                       {guide.whoIsItBestFor}
//                     </p>
//                   </div>
//                 </Reveal>
//               )}
//               {guide.whoShouldAvoid && (
//                 <Reveal delay={80}>
//                   <div style={{ background: "#fdf3f4", borderRadius: "var(--radius-md)", padding: "24px", border: "1px solid #f5dde0" }}>
//                     <h3 style={{ fontSize: 16, fontWeight: 700, color: "#9b2335", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-body)" }}>
//                       ○ Consider Alternatives If
//                     </h3>
//                     <p style={{ fontSize: 14.5, color: "#4a3d35", lineHeight: 1.75 }}>
//                       {guide.whoShouldAvoid}
//                     </p>
//                   </div>
//                 </Reveal>
//               )}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ── COMMON MISTAKES ── */}
//       {commonMistakes.length > 0 && (
//         <section className="pk-section">
//           <div className="pk-container" style={{ maxWidth: 720 }}>
//             <Reveal>
//               <div className="pk-eyebrow">Avoid these errors</div>
//               <h2 className="pk-section-title">Common Mistakes</h2>
//             </Reveal>
//             <div style={{ marginTop: 28 }}>
//               {commonMistakes.map((mistake, i) => (
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
//                     <span style={{ color: "#9b2335", fontSize: 15, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✗</span>
//                     <span style={{ fontSize: 14.5, color: "#4a3d35" }}>{mistake}</span>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ── CTA BANNER ── */}
//       {(guide.ctaHeading || recommendedProducts.length > 0) && (
//         <section
//           className="pk-section"
//           style={{ background: "var(--espresso)", textAlign: "center" }}
//         >
//           <Reveal>
//             <h2 className="pk-section-title" style={{ color: "#FAF7F2" }}>
//               {guide.ctaHeading || "Ready to get organised?"}
//             </h2>
//             <p style={{ color: "rgba(250,247,242,0.7)", marginTop: 10, marginBottom: 26, fontSize: 15 }}>
//               {guide.ctaBody || "Browse our full collection of curated organisation picks."}
//             </p>
//             <Link href="/" className="pk-btn pk-btn-gold">
//               Shop All Products
//             </Link>
//           </Reveal>
//         </section>
//       )}

//       {/* ── FAQ ── */}
//       {faqs.length > 0 && (
//         <section className="pk-section" style={{ background: "var(--ivory)" }}>
//           <div className="pk-container" style={{ maxWidth: 720 }}>
//             <Reveal>
//               <div className="pk-eyebrow">Common questions</div>
//               <h2 className="pk-section-title">FAQ</h2>
//             </Reveal>
//             <div style={{ marginTop: 28 }}>
//               <FaqAccordion
//                 items={faqs.map((f) => ({ q: f.question, a: f.answer }))}
//               />
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ── RELATED ARTICLES ── */}
//       {relatedArticles.length > 0 && (
//         <section className="pk-section" style={{ background: "var(--linen)" }}>
//           <div className="pk-container">
//             <Reveal>
//               <div className="pk-eyebrow">Keep reading</div>
//               <h2 className="pk-section-title">Related Articles</h2>
//             </Reveal>
//             <div className="pk-grid" style={{ marginTop: 36 }}>
//               {relatedArticles.map((post, i) => (
//                 <Reveal key={post._id} delay={i * 70}>
//                   <Link href={`/blog/${post.slug?.current}`} style={{ textDecoration: "none" }}>
//                     <article className="pk-card pk-hover-lift">
//                       {post.heroImage && (
//                         <div className="pk-img-zoom" style={{ borderRadius: 15 }}>
//                           <img
//                             src={urlFor(post.heroImage).width(420).height(280).url()}
//                             alt={post.title}
//                             className="pk-card-img"
//                           />
//                         </div>
//                       )}
//                       <div className="pk-card-body">
//                         {post.category && (
//                           <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>
//                             {post.category}
//                           </span>
//                         )}
//                         <h3 className="pk-card-title" style={{ marginTop: 8 }}>{post.title}</h3>
//                         {post.excerpt && <p className="pk-card-desc">{post.excerpt}</p>}
//                         <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
//                           <span style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)" }}>
//                             Read More →
//                           </span>
//                         </div>
//                       </div>
//                     </article>
//                   </Link>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ── RELATED GUIDES ── */}
//       {relatedGuides.length > 0 && (
//         <section className="pk-section">
//           <div className="pk-container">
//             <Reveal>
//               <div className="pk-eyebrow">Explore more</div>
//               <h2 className="pk-section-title">More Buying Guides</h2>
//             </Reveal>
//             <div className="pk-grid" style={{ marginTop: 36 }}>
//               {relatedGuides.map((g, i) => (
//                 <Reveal key={g._id} delay={i * 70}>
//                   <Link href={`/buying-guides/${g.slug?.current}`} style={{ textDecoration: "none" }}>
//                     <article className="pk-card pk-hover-lift">
//                       {g.heroImage && (
//                         <div className="pk-img-zoom" style={{ borderRadius: 15 }}>
//                           <img
//                             src={urlFor(g.heroImage).width(420).height(280).url()}
//                             alt={g.title}
//                             className="pk-card-img"
//                           />
//                         </div>
//                       )}
//                       <div className="pk-card-body">
//                         {g.category && (
//                           <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>
//                             {g.category}
//                           </span>
//                         )}
//                         <h3 className="pk-card-title" style={{ marginTop: 8 }}>{g.title}</h3>
//                         {g.shortDescription && <p className="pk-card-desc">{g.shortDescription}</p>}
//                         <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
//                           <span style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)" }}>
//                             View Guide →
//                           </span>
//                         </div>
//                       </div>
//                     </article>
//                   </Link>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Social share */}
//       <div style={{ padding: "24px 20px", maxWidth: 820, margin: "0 auto" }}>
//         <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
//           <span style={{ fontSize: 13, color: "#6b5d52" }}>Share this guide:</span>
//           <a
//             href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&description=${encodeURIComponent(guide.title)}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="pk-btn pk-btn-outline"
//             style={{ padding: "8px 18px", fontSize: 13 }}
//           >
//             Pinterest
//           </a>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }



"use client";

// PATH: my-website/src/app/buying-guides/[slug]/page.js
// NEW FILE — individual buying guide page

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getBuyingGuideBySlug, urlFor } from "../../../sanity";
import { getAffiliateCta } from "../../../lib/affiliateUtils";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";
import FaqAccordion from "../../../components/FaqAccordion";

/* ── PortableText renderers matching the blog page style ── */
const portableComponents = {
  block: {
    h2: ({ children }) => (
      <h2 style={{ fontSize: 26, marginTop: 36, marginBottom: 14, fontFamily: "var(--font-heading), serif", color: "var(--espresso)" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: 21, marginTop: 28, marginBottom: 10, fontFamily: "var(--font-heading), serif", color: "var(--espresso)" }}>
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p style={{ fontSize: 16, lineHeight: 1.9, color: "#4a3d35", marginBottom: 18 }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: "3px solid var(--gold)", paddingLeft: 20, margin: "28px 0", fontStyle: "italic", color: "var(--espresso)", fontSize: 17 }}>
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).width(900).url()}
        alt={value.alt || ""}
        style={{ width: "100%", borderRadius: "var(--radius-md)", margin: "28px 0" }}
      />
    ),
  },
};

/* affiliateCTA replaced by shared getAffiliateCta from lib/affiliateUtils.js */

export default function BuyingGuidePage() {
  const { slug } = useParams();
  const [guide,   setGuide]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!slug) return;
    getBuyingGuideBySlug(slug)
      .then((g) => {
        setGuide(g || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[Pickify] buying guide fetch failed:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  /* Loading */
  if (loading) {
    return (
      <div className="pk-no-scroll-x">
        <Navbar />
        <div style={{ paddingTop: 160, textAlign: "center", minHeight: "60vh" }}>
          <p style={{ color: "#6b5d52" }}>Loading guide…</p>
        </div>
        <Footer />
      </div>
    );
  }

  /* Not found / error */
  if (error || !guide) {
    return (
      <div className="pk-no-scroll-x">
        <Navbar />
        <div style={{ paddingTop: 160, textAlign: "center", padding: "160px 20px 80px" }}>
          <h2 className="pk-section-title">Guide not found</h2>
          <p style={{ color: "#6b5d52", marginTop: 12 }}>
            {error || "This buying guide may not exist yet."}
          </p>
          <Link href="/buying-guides" className="pk-btn pk-btn-primary" style={{ marginTop: 24, display: "inline-flex" }}>
            ← All Buying Guides
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const recommendedProducts = guide.recommendedProducts || [];
  const faqs                = guide.faqs               || [];
  const relatedArticles     = guide.relatedArticles    || [];
  const relatedGuides       = guide.relatedGuides      || [];
  const buyingCriteria      = guide.buyingCriteria     || [];
  const specificationsToConsider = guide.specificationsToConsider || [];
  const commonMistakes      = guide.commonMistakes     || [];

  return (
    <div className="pk-no-scroll-x">
      <Navbar />

      {/* ── HERO ── */}
      {guide.heroImage ? (
        <div style={{ marginTop: 86, height: 420, overflow: "hidden", position: "relative" }}>
          <img
            src={urlFor(guide.heroImage).width(1600).height(700).url()}
            alt={guide.heroImage?.alt || guide.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(44,24,16,0.1), rgba(44,24,16,0.55))",
            }}
          />
          <div style={{ position: "absolute", bottom: 36, left: "8%", right: "8%", maxWidth: 820 }}>
            {guide.category && (
              <span style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>
                {guide.category}
              </span>
            )}
            <h1 style={{ color: "#FAF7F2", fontSize: "clamp(28px, 4vw, 44px)", marginTop: 10, fontFamily: "var(--font-heading), serif" }}>
              {guide.title}
            </h1>
          </div>
        </div>
      ) : (
        /* No hero image — show text-only header */
        <section className="pk-section" style={{ marginTop: 70, textAlign: "center", background: "var(--linen)" }}>
          <div className="pk-container">
            {guide.category && (
              <div className="pk-eyebrow" style={{ justifyContent: "center", display: "flex" }}>
                {guide.category}
              </div>
            )}
            <h1 className="pk-section-title" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
              {guide.title}
            </h1>
          </div>
        </section>
      )}

      {/* ── BREADCRUMB ── */}
      <div
        className="pk-container"
        style={{ marginTop: guide.heroImage ? 36 : 20, fontSize: 13, color: "#8a7a6d", paddingBottom: 8 }}
      >
        <Link href="/"              style={{ textDecoration: "none", color: "#8a7a6d" }}>Home</Link>
        {" / "}
        <Link href="/buying-guides" style={{ textDecoration: "none", color: "#8a7a6d" }}>Buying Guides</Link>
        {" / "}
        <span style={{ color: "var(--espresso)", fontWeight: 500 }}>{guide.title}</span>
      </div>

      {/* ── INTRODUCTION ── */}
      {(guide.shortDescription || guide.introduction) && (
        <section className="pk-section" style={{ background: "var(--ivory)" }}>
          <div className="pk-container" style={{ maxWidth: 820 }}>
            <Reveal>
              {guide.shortDescription && !guide.introduction && (
                <p style={{ fontSize: 16.5, color: "#4a3d35", lineHeight: 1.9, marginBottom: 0 }}>
                  {guide.shortDescription}
                </p>
              )}
              {guide.introduction && (
                <PortableText value={guide.introduction} components={portableComponents} />
              )}
            </Reveal>
          </div>
        </section>
      )}

      {/* ── WHAT TO LOOK FOR (Buying Criteria) ── */}
      {buyingCriteria.length > 0 && (
        <section className="pk-section">
          <div className="pk-container">
            <Reveal>
              <div className="pk-eyebrow">Make the right choice</div>
              <h2 className="pk-section-title">What to Look For</h2>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 22,
                marginTop: 36,
              }}
            >
              {buyingCriteria.map((criterion, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div
                    className="pk-hover-lift"
                    style={{
                      background: "#fff",
                      borderRadius: "var(--radius-md)",
                      padding: "24px 22px",
                      boxShadow: "var(--shadow-soft)",
                      height: "100%",
                      borderTop: "3px solid var(--gold)",
                    }}
                  >
                    {criterion.heading && (
                      <h3 style={{ fontSize: 17, marginBottom: 10, color: "var(--espresso)" }}>
                        {criterion.heading}
                      </h3>
                    )}
                    {criterion.description && (
                      <p style={{ fontSize: 14, color: "#6b5d52", lineHeight: 1.7 }}>
                        {criterion.description}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SPECIFICATIONS ── */}
      {specificationsToConsider.length > 0 && (
        <section className="pk-section" style={{ background: "var(--linen)" }}>
          <div className="pk-container" style={{ maxWidth: 720 }}>
            <Reveal>
              <div className="pk-eyebrow">Key details</div>
              <h2 className="pk-section-title">Specifications to Consider</h2>
            </Reveal>
            <ul style={{ marginTop: 28, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {specificationsToConsider.map((spec, i) => (
                <Reveal key={i} delay={i * 40}>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "14px 18px",
                      background: "#fff",
                      borderRadius: "var(--radius-sm)",
                      boxShadow: "var(--shadow-soft)",
                      fontSize: 14.5,
                      color: "#4a3d35",
                    }}
                  >
                    <span style={{ color: "var(--gold)", fontWeight: 700, flexShrink: 0 }}>→</span>
                    {spec}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── RECOMMENDED PRODUCTS ── */}
      {recommendedProducts.length > 0 && (
        <section className="pk-section">
          <div className="pk-container">
            <Reveal>
              <div className="pk-eyebrow">Our top picks</div>
              <h2 className="pk-section-title">Recommended Products</h2>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 40 }}>
              {recommendedProducts.map((rec, i) => {
                const p = rec.product;
                if (!p) return null;
                const images = p.images || [];
                const cta    = getAffiliateCta(p);   // {label, href, source} — from affiliateUtils

                return (
                  <Reveal key={p._id || i} delay={i * 60}>
                    <div
                      style={{
                        background: "#fff",
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-soft)",
                        overflow: "hidden",
                        border: "1px solid rgba(44,24,16,0.06)",
                      }}
                      className="pk-bg-card"
                    >
                      {/* IMAGE */}
                      <div style={{ position: "relative", minHeight: 220, background: "var(--linen)" }}>
                        {images.length > 0 ? (
                          <img
                            src={urlFor(images[0]).width(400).height(320).fit("crop").url()}
                            alt={p.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>
                            🛒
                          </div>
                        )}

                        {/* Label badge */}
                        {rec.label && (
                          <span
                            style={{
                              position: "absolute",
                              top: 14,
                              left: 14,
                              background: "var(--gold)",
                              color: "var(--espresso)",
                              fontSize: 11,
                              fontWeight: 700,
                              letterSpacing: "0.07em",
                              textTransform: "uppercase",
                              padding: "5px 13px",
                              borderRadius: 999,
                              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                            }}
                          >
                            {rec.label}
                          </span>
                        )}
                      </div>

                      {/* CONTENT */}
                      <div style={{ padding: "28px 28px 28px 28px" }}>
                        {p.category && (
                          <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>
                            {p.category}
                          </span>
                        )}
                        <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontFamily: "var(--font-heading), serif", marginTop: 6, marginBottom: 10, color: "var(--espresso)" }}>
                          {p.title}
                        </h3>

                        {/* Editorial note from guide editor */}
                        {rec.whyWeRecommendIt && (
                          <p style={{ fontSize: 14, color: "#4a3d35", lineHeight: 1.7, marginBottom: 14, fontStyle: "italic", borderLeft: "2px solid var(--gold)", paddingLeft: 12 }}>
                            {rec.whyWeRecommendIt}
                          </p>
                        )}

                        {p.shortDescription && !rec.whyWeRecommendIt && (
                          <p style={{ fontSize: 14, color: "#4a3d35", lineHeight: 1.7, marginBottom: 14 }}>
                            {p.shortDescription}
                          </p>
                        )}

                        {/* Key features — up to 3 */}
                        {(p.features || []).length > 0 && (
                          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
                            {p.features.slice(0, 3).map((f, fi) => (
                              <li key={fi} style={{ fontSize: 13.5, color: "#6b5d52", paddingLeft: 18, position: "relative" }}>
                                <span style={{ position: "absolute", left: 0, color: "var(--gold)" }}>✓</span>
                                {f}
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* CTA buttons — internal product page FIRST, then affiliate */}
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                          <Link
                            href={`/product/${p._id}`}
                            className="pk-btn pk-btn-primary"
                            style={{ fontSize: 13, padding: "11px 22px" }}
                          >
                            View Full Details
                          </Link>
                          <a
                            href={p.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="pk-btn pk-btn-outline"
                            style={{ fontSize: 13, padding: "11px 22px" }}
                          >
                            {cta.label}
                          </a>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── WHO IT'S BEST FOR / WHO SHOULD AVOID ── */}
      {(guide.whoIsItBestFor || guide.whoShouldAvoid) && (
        <section className="pk-section" style={{ background: "var(--linen)" }}>
          <div className="pk-container">
            <Reveal>
              <h2 className="pk-section-title">Is This Right for You?</h2>
            </Reveal>
            <div
              style={{ marginTop: 32 }}
              className="pk-bg-card-grid"
            >
              {guide.whoIsItBestFor && (
                <Reveal>
                  <div style={{ background: "#f0faf4", borderRadius: "var(--radius-md)", padding: "24px", border: "1px solid #d4edda" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#2d6a4f", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-body)" }}>
                      ✓ Best For
                    </h3>
                    <p style={{ fontSize: 14.5, color: "#4a3d35", lineHeight: 1.75 }}>
                      {guide.whoIsItBestFor}
                    </p>
                  </div>
                </Reveal>
              )}
              {guide.whoShouldAvoid && (
                <Reveal delay={80}>
                  <div style={{ background: "#fdf3f4", borderRadius: "var(--radius-md)", padding: "24px", border: "1px solid #f5dde0" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#9b2335", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-body)" }}>
                      ○ Consider Alternatives If
                    </h3>
                    <p style={{ fontSize: 14.5, color: "#4a3d35", lineHeight: 1.75 }}>
                      {guide.whoShouldAvoid}
                    </p>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── COMMON MISTAKES ── */}
      {commonMistakes.length > 0 && (
        <section className="pk-section">
          <div className="pk-container" style={{ maxWidth: 720 }}>
            <Reveal>
              <div className="pk-eyebrow">Avoid these errors</div>
              <h2 className="pk-section-title">Common Mistakes</h2>
            </Reveal>
            <div style={{ marginTop: 28 }}>
              {commonMistakes.map((mistake, i) => (
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
                    <span style={{ color: "#9b2335", fontSize: 15, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✗</span>
                    <span style={{ fontSize: 14.5, color: "#4a3d35" }}>{mistake}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BANNER ── */}
      {(guide.ctaHeading || recommendedProducts.length > 0) && (
        <section
          className="pk-section"
          style={{ background: "var(--espresso)", textAlign: "center" }}
        >
          <Reveal>
            <h2 className="pk-section-title" style={{ color: "#FAF7F2" }}>
              {guide.ctaHeading || "Ready to get organised?"}
            </h2>
            <p style={{ color: "rgba(250,247,242,0.7)", marginTop: 10, marginBottom: 26, fontSize: 15 }}>
              {guide.ctaBody || "Browse our full collection of curated organisation picks."}
            </p>
            <Link href="/" className="pk-btn pk-btn-gold">
              Shop All Products
            </Link>
          </Reveal>
        </section>
      )}

      {/* ── FAQ ── */}
      {faqs.length > 0 && (
        <section className="pk-section" style={{ background: "var(--ivory)" }}>
          <div className="pk-container" style={{ maxWidth: 720 }}>
            <Reveal>
              <div className="pk-eyebrow">Common questions</div>
              <h2 className="pk-section-title">FAQ</h2>
            </Reveal>
            <div style={{ marginTop: 28 }}>
              <FaqAccordion
                items={faqs.map((f) => ({ q: f.question, a: f.answer }))}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED ARTICLES ── */}
      {relatedArticles.length > 0 && (
        <section className="pk-section" style={{ background: "var(--linen)" }}>
          <div className="pk-container">
            <Reveal>
              <div className="pk-eyebrow">Keep reading</div>
              <h2 className="pk-section-title">Related Articles</h2>
            </Reveal>
            <div className="pk-grid" style={{ marginTop: 36 }}>
              {relatedArticles.map((post, i) => (
                <Reveal key={post._id} delay={i * 70}>
                  <Link href={`/blog/${post.slug?.current}`} style={{ textDecoration: "none" }}>
                    <article className="pk-card pk-hover-lift">
                      {post.heroImage && (
                        <div className="pk-img-zoom" style={{ borderRadius: 15 }}>
                          <img
                            src={urlFor(post.heroImage).width(420).height(280).url()}
                            alt={post.title}
                            className="pk-card-img"
                          />
                        </div>
                      )}
                      <div className="pk-card-body">
                        {post.category && (
                          <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>
                            {post.category}
                          </span>
                        )}
                        <h3 className="pk-card-title" style={{ marginTop: 8 }}>{post.title}</h3>
                        {post.excerpt && <p className="pk-card-desc">{post.excerpt}</p>}
                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)" }}>
                            Read More →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED GUIDES ── */}
      {relatedGuides.length > 0 && (
        <section className="pk-section">
          <div className="pk-container">
            <Reveal>
              <div className="pk-eyebrow">Explore more</div>
              <h2 className="pk-section-title">More Buying Guides</h2>
            </Reveal>
            <div className="pk-grid" style={{ marginTop: 36 }}>
              {relatedGuides.map((g, i) => (
                <Reveal key={g._id} delay={i * 70}>
                  <Link href={`/buying-guides/${g.slug?.current}`} style={{ textDecoration: "none" }}>
                    <article className="pk-card pk-hover-lift">
                      {g.heroImage && (
                        <div className="pk-img-zoom" style={{ borderRadius: 15 }}>
                          <img
                            src={urlFor(g.heroImage).width(420).height(280).url()}
                            alt={g.title}
                            className="pk-card-img"
                          />
                        </div>
                      )}
                      <div className="pk-card-body">
                        {g.category && (
                          <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>
                            {g.category}
                          </span>
                        )}
                        <h3 className="pk-card-title" style={{ marginTop: 8 }}>{g.title}</h3>
                        {g.shortDescription && <p className="pk-card-desc">{g.shortDescription}</p>}
                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)" }}>
                            View Guide →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Social share */}
      <div style={{ padding: "24px 20px", maxWidth: 820, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "#6b5d52" }}>Share this guide:</span>
          <a
            href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&description=${encodeURIComponent(guide.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pk-btn pk-btn-outline"
            style={{ padding: "8px 18px", fontSize: 13 }}
          >
            Pinterest
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}