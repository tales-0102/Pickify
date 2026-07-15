// FILE PATH: src/components/Footer.js
// STATUS: NEW FILE

import Link from "next/link";

export default function Footer({ latestPosts = [] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="pk-footer">
      <div className="pk-footer-grid">
        {/* BRAND */}
        <div>
          <img
            src="/logo.png"
            alt="Pickify Logo"
            style={{
              height: 56,
              width: 56,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #C9A96E",
              marginBottom: 16,
            }}
          />
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(250,247,242,0.7)", maxWidth: 280 }}>
            Pickify curates editorial-grade home and kitchen organization finds —
            so every corner of your home feels considered.
          </p>
          <a
            href="https://www.pinterest.com/thepickify/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 18,
              color: "#C9A96E",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0a12 12 0 0 0-4.37 23.17c-.06-.93-.11-2.36.02-3.38.12-.92.78-5.87.78-5.87s-.2-.4-.2-.99c0-.93.54-1.62 1.21-1.62.57 0 .85.43.85.94 0 .57-.37 1.43-.56 2.23-.16.67.34 1.21 1 1.21 1.2 0 2.12-1.27 2.12-3.1 0-1.62-1.16-2.75-2.83-2.75-1.93 0-3.06 1.45-3.06 2.94 0 .58.22 1.21.5 1.55a.2.2 0 0 1 .05.19c-.05.22-.17.68-.2.78-.03.13-.1.16-.24.1-.9-.42-1.46-1.74-1.46-2.8 0-2.28 1.66-4.38 4.78-4.38 2.51 0 4.46 1.79 4.46 4.18 0 2.49-1.57 4.5-3.75 4.5-.73 0-1.42-.38-1.66-.83l-.45 1.72c-.16.63-.6 1.41-.9 1.89A12 12 0 1 0 12 0z" />
            </svg>
            Follow on Pinterest
          </a>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4>Quick Links</h4>
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* CATEGORIES */}
        <div>
          <h4>Categories</h4>
          <Link href="/?category=pantry">Pantry Organization</Link>
          <Link href="/?category=kitchen">Kitchen Storage</Link>
          <Link href="/?category=fridge">Fridge Organization</Link>
          <Link href="/?category=closet">Closet & Drawers</Link>
        </div>

        {/* LATEST ARTICLES */}
        <div>
          <h4>Latest Articles</h4>
          {latestPosts.length > 0 ? (
            latestPosts.slice(0, 3).map((post) => (
              <Link key={post._id} href={`/blog/${post.slug?.current || post._id}`}>
                {post.title}
              </Link>
            ))
          ) : (
            <>
              <Link href="/blog">New articles coming soon</Link>
            </>
          )}
        </div>
      </div>

      <div className="pk-footer-bottom">
        <span>© {year} Pickify. All rights reserved.</span>
        <span style={{ maxWidth: 560, textAlign: "right" }}>
          As an Amazon Associate, Pickify earns from qualifying purchases. Product
          links on this site may earn a commission at no extra cost to you.
        </span>
      </div>
    </footer>
  );
}