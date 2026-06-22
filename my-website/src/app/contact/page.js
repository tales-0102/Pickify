"use client";

// FILE PATH: src/app/contact/page.js
// STATUS: NEW FILE

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire to a form handler (Formspree, Resend, etc.)
    setSent(true);
  }

  return (
    <div className="pk-no-scroll-x">
      <Navbar />
      <section className="pk-section" style={{ marginTop: 70, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
        <div className="pk-eyebrow">Get in touch</div>
        <h1 className="pk-section-title">Contact Pickify</h1>
        <p style={{ marginTop: 14, fontSize: 15, color: "#6b5d52" }}>
          Product suggestions, partnership inquiries, or general questions —
          we read every message.
        </p>

        {sent ? (
          <p style={{ marginTop: 30, fontWeight: 500 }}>
            Thanks — your message has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 14 }}>
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ padding: 14, borderRadius: 10, border: "1px solid rgba(44,24,16,0.2)" }}
            />
            <input
              required
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ padding: 14, borderRadius: 10, border: "1px solid rgba(44,24,16,0.2)" }}
            />
            <textarea
              required
              rows={5}
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{ padding: 14, borderRadius: 10, border: "1px solid rgba(44,24,16,0.2)", fontFamily: "inherit" }}
            />
            <button type="submit" className="pk-btn pk-btn-primary">
              Send Message
            </button>
          </form>
        )}
      </section>
      <Footer />
    </div>
  );
}