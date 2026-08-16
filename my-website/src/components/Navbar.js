// "use client";



// import { useEffect, useState } from "react";
// import Link from "next/link";

// const LINKS = [
//   { label: "Home", href: "/" },
//   { label: "Blog", href: "/blog" },
//   { label: "About", href: "/about" },
//   { label: "Contact", href: "/contact" },
// ];

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   // Scroll detection — adds blur/background when scrolled past 24px
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 24);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // Lock body scroll while mobile menu is open + Escape to close
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//     function onKey(e) {
//       if (e.key === "Escape") setOpen(false);
//     }
//     window.addEventListener("keydown", onKey);
//     return () => {
//       document.body.style.overflow = "";
//       window.removeEventListener("keydown", onKey);
//     };
//   }, [open]);

//   return (
//     <>
//       {/* ── MAIN NAV ── */}
//       <nav className={`pk-nav${scrolled ? " pk-scrolled" : ""}`}>
//         <div className="pk-nav-inner">
//           <Link href="/" className="pk-logo">
//             <img src="/logo.png" alt="Pickify" />
//           </Link>

//           {/* Desktop links */}
//           <div className="pk-nav-links">
//             {LINKS.map((l) => (
//               <Link key={l.href} href={l.href} className="pk-nav-link">
//                 {l.label}
//               </Link>
//             ))}
//           </div>

//           {/* Hamburger — animates to × when open */}
//           <button
//             type="button"
//             className={`pk-burger${open ? " pk-burger-open" : ""}`}
//             aria-label={open ? "Close menu" : "Open menu"}
//             aria-expanded={open}
//             onClick={() => setOpen((v) => !v)}
//           >
//             <span />
//             <span />
//             <span />
//           </button>
//         </div>
//       </nav>

//       {/* ── OVERLAY (click to close) ── */}
//       <div
//         className={`pk-mobile-overlay${open ? " pk-open" : ""}`}
//         onClick={() => setOpen(false)}
//         aria-hidden="true"
//       />

//       {/* ── SLIDE-IN PANEL ── */}
//       <div
//         id="pk-mobile-menu"
//         className={`pk-mobile-menu${open ? " pk-open" : ""}`}
//         aria-hidden={!open}
//       >
//         <button
//           type="button"
//           aria-label="Close menu"
//           onClick={() => setOpen(false)}
//           style={{
//             position: "absolute",
//             top: 24,
//             right: 24,
//             background: "none",
//             border: "none",
//             fontSize: 30,
//             lineHeight: 1,
//             color: "var(--espresso)",
//             cursor: "pointer",
//           }}
//         >
//           ×
//         </button>

//         {LINKS.map((l) => (
//           <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
//             {l.label}
//           </Link>
//         ))}
//       </div>
//     </>
//   );
// }



"use client";

// PATH: my-website/src/components/Navbar.js
// CHANGE: Added "Buying Guides" to the LINKS array — everything else unchanged

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "Home",           href: "/" },
  { label: "Buying Guides",  href: "/buying-guides" },
  { label: "Blog",           href: "/blog" },
  { label: "About",          href: "/about" },
  { label: "Contact",        href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav className={`pk-nav${scrolled ? " pk-scrolled" : ""}`}>
        <div className="pk-nav-inner">
          <Link href="/" className="pk-logo">
            <img src="/logo.png" alt="Pickify" />
          </Link>

          <div className="pk-nav-links">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="pk-nav-link">
                {l.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className={`pk-burger${open ? " pk-burger-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        className={`pk-mobile-overlay${open ? " pk-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        id="pk-mobile-menu"
        className={`pk-mobile-menu${open ? " pk-open" : ""}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            background: "none",
            border: "none",
            fontSize: 30,
            lineHeight: 1,
            color: "var(--espresso)",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}