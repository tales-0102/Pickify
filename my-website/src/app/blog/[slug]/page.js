"use client";

// FILE PATH: src/app/blog/[slug]/page.js
// STATUS: NEW FILE

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor, getPostBySlug, getRelatedPosts } from "../../../sanity";
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
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getPostBySlug(slug).then((p) => {
      setPost(p);
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