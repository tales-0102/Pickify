"use client";

// FILE PATH: src/app/blog/[slug]/page.js
// STATUS: NEW FILE

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
// import { urlFor, getPostBySlug, getRelatedPosts } from "../../../sanity";
import {
  urlFor,
  getPostBySlug,
  getRelatedPosts,
} from "../../../sanity";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";

const portableComponents = {
  block: {
    h2: ({ children }) => (
      <h2 style={{ fontSize: 26, marginTop: 36, marginBottom: 14 }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: 21, marginTop: 28, marginBottom: 10 }}>{children}</h3>
    ),
    normal: ({ children }) => (
      <p style={{ fontSize: 16, lineHeight: 1.9, color: "#4a3d35", marginBottom: 18 }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "3px solid var(--gold)",
          paddingLeft: 20,
          margin: "28px 0",
          fontStyle: "italic",
          color: "var(--espresso)",
          fontSize: 18,
        }}
      >
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

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  // const [related, setRelated] = useState([]);
  const [related, setRelated] = useState([]);
const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!slug) return;
  //   getPostBySlug(slug).then((p) => {
  //     setPost(p);
  //     setLoading(false);
  //     if (p?.category) {
  //       getRelatedPosts(p._id, p.category).then(setRelated);
  //     }
  //   });
  // }, [slug]);

  useEffect(() => {
  if (!slug) return;

  getPostBySlug(slug).then((p) => {
    setPost(p);

    // Featured Products from Sanity
    setFeaturedProducts(p?.featuredProducts || []);

    setLoading(false);

    if (p?.category) {
      getRelatedPosts(p._id, p.category).then(setRelated);
    }
  });
}, [slug]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ paddingTop: 160, textAlign: "center", color: "#6b5d52" }}>
          Loading article…
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <Navbar />
        <div style={{ paddingTop: 160, textAlign: "center" }}>
          <h2 className="pk-section-title">Article not found</h2>
          <Link href="/blog" className="pk-btn pk-btn-primary" style={{ marginTop: 20, display: "inline-flex" }}>
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="pk-no-scroll-x">
      <Navbar />

      {/* HERO */}
      {post.heroImage && (
        <div style={{ marginTop: 86, height: 420, overflow: "hidden", position: "relative" }}>
          <img
            src={urlFor(post.heroImage).width(1600).height(800).url()}
            alt={post.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(44,24,16,0.1), rgba(44,24,16,0.55))",
            }}
          />
          <div style={{ position: "absolute", bottom: 36, left: "8%", right: "8%", maxWidth: 760 }}>
            {post.category && (
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontWeight: 600,
                }}
              >
                {post.category}
              </span>
            )}
            <h1 style={{ color: "#FAF7F2", fontSize: "clamp(28px, 4vw, 44px)", marginTop: 10 }}>
              {post.title}
            </h1>
          </div>
        </div>
      )}

      {/* ARTICLE BODY */}
      <article className="pk-container" style={{ maxWidth: 760, marginTop: post.heroImage ? 50 : 150 }}>
        {!post.heroImage && (
          <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: 20 }}>{post.title}</h1>
        )}
        <div style={{ fontSize: 13, color: "#8a7a6d", marginBottom: 30 }}>
          {post.publishedAt &&
            new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
        </div>

        {post.body && <PortableText value={post.body} components={portableComponents} />}
        {/* FEATURED PRODUCTS */}

{post.featuredProducts &&
post.featuredProducts.length > 0 && (

<section
style={{
marginTop:60,
marginBottom:40
}}
>

<h2
style={{
fontSize:32,
marginBottom:10
}}
>
Products Featured In This Guide
</h2>

<p
style={{
color:"#666",
marginBottom:35
}}
>
These are the exact products recommended in this article.
</p>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
gap:30
}}
>

{post.featuredProducts.map((product)=>{

return(

<div
key={product._id}
style={{
background:"#fff",
borderRadius:18,
overflow:"hidden",
boxShadow:"0 15px 35px rgba(0,0,0,.08)"
}}
>

<Link
href={`/product/${product._id}`}
style={{
textDecoration:"none",
color:"inherit"
}}
>

<img
src={urlFor(product.images[0]).width(700).url()}
alt={product.title}
style={{
width:"100%",
height:250,
objectFit:"cover"
}}
/>

<div
style={{
padding:24
}}
>

{product.badge && (

<div
style={{
display:"inline-block",
background:"#d4af37",
color:"#fff",
padding:"6px 12px",
borderRadius:50,
fontSize:12,
marginBottom:14
}}
>
{product.badge}
</div>

)}

<h3
style={{
fontSize:22,
marginBottom:12,
lineHeight:1.3
}}
>
{product.title}
</h3>

<p
style={{
color:"#666",
lineHeight:1.8,
marginBottom:18
}}
>
{product.shortDescription}
</p>

{product.keyFeatures &&
product.keyFeatures.length>0 && (

<ul
style={{
paddingLeft:18,
marginBottom:20
}}
>

{product.keyFeatures
.slice(0,4)
.map((item,index)=>(

<li
key={index}
style={{
marginBottom:8,
color:"#444"
}}
>
{item}
</li>

))}

</ul>

)}

<div
className="pk-btn pk-btn-gold"
style={{
display:"inline-flex"
}}
>
View Product →
</div>

</div>

</Link>

</div>

)

})}

</div>

</section>

)}

        {/* SOCIAL SHARE */}
        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 40,
            paddingTop: 24,
            borderTop: "1px solid rgba(44,24,16,0.1)",
          }}
        >
          <span style={{ fontSize: 13, color: "#6b5d52", alignSelf: "center" }}>Share:</span>
          <a
            href={`https://www.pinterest.com/thepickify/git pushj/pin/create/button/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pk-btn pk-btn-outline"
            style={{ padding: "8px 18px", fontSize: 13 }}
          >
            Pinterest
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pk-btn pk-btn-outline"
            style={{ padding: "8px 18px", fontSize: 13 }}
          >
            Facebook
          </a>
        </div>
      </article>

      {/* CTA */}
      <section className="pk-section" style={{ background: "var(--espresso)", textAlign: "center", marginTop: 60 }}>
        <Reveal>
          <h2 className="pk-section-title" style={{ color: "#FAF7F2" }}>
            Looking for the products mentioned here?
          </h2>
          <p style={{ color: "rgba(250,247,242,0.7)", marginTop: 10, marginBottom: 26 }}>
            Browse Pickify's full curated collection of home organization finds.
          </p>
          <Link href="/" className="pk-btn pk-btn-gold">
            Shop Pickify
          </Link>
        </Reveal>
      </section>

      {/* RELATED ARTICLES */}
      {related.length > 0 && (
        <section className="pk-section">
          <div className="pk-container">
            <Reveal>
              <div className="pk-eyebrow">Keep reading</div>
              <h2 className="pk-section-title">Related Articles</h2>
            </Reveal>
            <div className="pk-grid" style={{ marginTop: 36 }}>
              {related.map((p, i) => (
                <Reveal key={p._id} delay={i * 70}>
                  <Link href={`/blog/${p.slug?.current}`} style={{ textDecoration: "none" }}>
                    <div className="pk-card pk-hover-lift">
                      {p.heroImage && (
                        <img
                          src={urlFor(p.heroImage).width(400).height(280).url()}
                          alt={p.title}
                          className="pk-card-img"
                        />
                      )}
                      <div className="pk-card-body">
                        <h3 className="pk-card-title">{p.title}</h3>
                        <p className="pk-card-desc">{p.excerpt}</p>
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
    </div>
  );
}