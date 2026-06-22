"use client";

// FILE PATH: src/app/blog/page.js
// STATUS: NEW FILE

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { urlFor, getPosts } from "../../sanity";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filtered =
    activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="pk-no-scroll-x">
      <Navbar />

      {/* HEADER */}
      <section className="pk-section" style={{ marginTop: 70, textAlign: "center" }}>
        <div className="pk-container">
          <div className="pk-eyebrow" style={{ justifyContent: "center", display: "flex" }}>
            The Pickify Journal
          </div>
          <h1 className="pk-section-title" style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
            Stories on Living Organized
          </h1>
          <p className="pk-section-sub" style={{ margin: "12px auto 0" }}>
            Practical guides, product deep-dives, and editorial inspiration for
            a calmer home.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      {categories.length > 1 && (
        <div className="pk-container" style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="pk-btn"
                style={{
                  padding: "9px 20px",
                  fontSize: 13,
                  background: activeCategory === cat ? "var(--espresso)" : "transparent",
                  color: activeCategory === cat ? "var(--ivory)" : "var(--espresso)",
                  border: "1px solid rgba(44,24,16,0.2)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GRID */}
      <section className="pk-section">
        <div className="pk-container">
          {loading ? (
            <p style={{ textAlign: "center", color: "#6b5d52" }}>Loading articles…</p>
          ) : filtered.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6b5d52" }}>
              No articles yet — check back soon.
            </p>
          ) : (
            <div className="pk-grid">
              {filtered.map((post, i) => (
                <Reveal key={post._id} delay={(i % 4) * 70}>
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
                          <span
                            style={{
                              fontSize: 11,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: "var(--gold)",
                              fontWeight: 600,
                            }}
                          >
                            {post.category}
                          </span>
                        )}
                        <h3 className="pk-card-title" style={{ marginTop: 8 }}>
                          {post.title}
                        </h3>
                        <p className="pk-card-desc">{post.excerpt}</p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 16,
                          }}
                        >
                          <span style={{ fontSize: 12, color: "#8a7a6d" }}>
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : ""}
                          </span>
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
          )}
        </div>
      </section>

      <Footer latestPosts={posts} />
    </div>
  );
}