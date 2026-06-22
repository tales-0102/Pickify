"use client";

// FILE PATH: src/components/FaqAccordion.js
// STATUS: NEW FILE

import { useState } from "react";

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          className={`pk-faq-item ${openIndex === i ? "pk-faq-open" : ""}`}
        >
          <div
            className="pk-faq-q"
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          >
            {item.q}
            <span className="pk-faq-icon">+</span>
          </div>
          <div className="pk-faq-a">{item.a}</div>
        </div>
      ))}
    </div>
  );
}