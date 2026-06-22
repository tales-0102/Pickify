// FILE PATH: src/app/about/page.js
// STATUS: NEW FILE

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = { title: "About — Pickify" };

export default function AboutPage() {
  return (
    <div className="pk-no-scroll-x">
      <Navbar />
      <section className="pk-section" style={{ marginTop: 70, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
        <div className="pk-eyebrow">Our story</div>
        <h1 className="pk-section-title">About Pickify</h1>
        <p style={{ marginTop: 20, fontSize: 16, lineHeight: 1.9, color: "#4a3d35" }}>
          Pickify started with a simple frustration: most home organization
          advice online is either generic listicles or oversized showroom
          pantries nobody actually has. We built Pickify to close that gap —
          an editorial-first home for real Amazon finds that work in real
          homes, scored against build quality, genuine reviews, and price.
        </p>
        <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.9, color: "#4a3d35" }}>
          Every product on this site is hand-checked before it earns a spot.
          We're not a marketplace — we're a curation layer between you and
          Amazon's enormous catalog, so you spend less time scrolling and
          more time living in a calmer space.
        </p>
      </section>
      <Footer />
    </div>
  );
}