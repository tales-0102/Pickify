
"use client";

import { useEffect, useState } from "react";
// import { client, urlFor } from "../sanity";
// import { client, urlFor } from "@/sanity";
// import { client, urlFor } from "../../sanity";
import { client, urlFor } from "../sanity";
import Link from "next/link";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);

  const slides = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
  ];

  // Fetch products
  useEffect(() => {
    client.fetch(`*[_type == "product"]`).then(setProducts);
  }, []);

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Playfair Display', serif",
        background: "#FFFFFF",
      }}
    >
      {/* 🔹 STICKY NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(10px)",
          zIndex: 1000,
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
          }}
        >
          {/* 🔸 LOGO */}
          <img
            src="/logo.png"
            alt="Pickify Logo"
            style={{
              height: "65px",
              width: "65px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #F8C8DC",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />

          {/* 🔸 MENU */}
          <div style={{ display: "flex", gap: "25px" }}>
            {["Home", "Blog", "About"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: "#333333",
                  textDecoration: "none",
                  fontWeight: "500",
                  padding: "6px 10px",
                  borderBottom: "2px solid transparent",
                  transition: "all 0.3s ease",
                  fontSize: "15px",
                }}
                onMouseOver={(e) => {
                  e.target.style.color = "#D4AF37";
                  e.target.style.borderBottom = "2px solid #D4AF37";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "#333333";
                  e.target.style.borderBottom = "2px solid transparent";
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 🔹 HERO SECTION */}
      <div
        style={{
          position: "relative",
          marginTop: "90px",
        }}
      >
        <div
          style={{
            height: "600px",
            overflow: "hidden",
          }}
        >
          <img
            src={slides[current]}
            alt="hero"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* 🔥 HERO TEXT (UPDATED) */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "8%",
              transform: "translateY(-50%)",
              maxWidth: "500px",
            }}
          >
            <h1
  style={{
    fontSize: "52px",
    fontWeight: "600",
    marginBottom: "15px",
    lineHeight: "1.2",
    color: "#1a1a1a", // 👈 darker for visibility
  }}
>
  Discover Products That Worth{" "}
  <span style={{ color: "#D4AF37" }}>
    Your Attention
  </span>
</h1>
            <p
              style={{
                color: "#555",
                fontSize: "16px",
                lineHeight: "1.6",
              }}
            >
              Carefully curated selections designed to elevate your everyday lifestyle.
              Simple, elegant, and truly worth it.
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 FEATURED PRODUCTS (PREMIUM DESIGN) */}
<div

  style={{
    padding: "80px 20px",
    background:
      "linear-gradient(135deg, #FADADD 0%, #FFFFFF 40%, #F5E6E8 100%)",
  }}
>


  <h2
    style={{
      textAlign: "center",
      color: "#333",
      fontSize: "32px",
      marginBottom: "50px",
    }}
  >
    Featured Products
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 300px))",
      justifyContent: "center",
      gap: "35px",
    }}
  >
    {products.map((p) => (
  <Link 

     key={p._id} 
  href={`/product/${p._id}`} style={{ textDecoration: "none" }}>
  <div
    style={{
      borderRadius: "20px",
      padding: "15px",
      background: "rgba(255,255,255,0.6)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "translateY(-8px)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    {/* IMAGE */}
    {p.images && p.images[0] && (
      <img
        src={urlFor(p.images[0]).width(400).height(300).url()}
        alt={p.title}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
          borderRadius: "15px",
        }}
      />
    )}

    {/* CONTENT */}
    <div style={{ padding: "15px 10px" }}>
      <h3 style={{ color: "#333" }}>{p.title}</h3>

      {/* <p style={{ fontSize: "14px", color: "#777" }}>
        {p.description}
      </p> */}
      <p
  style={{
    fontSize: "14px",
    color: "#666",
    marginTop: "10px",

    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }}
>
  {p.description}
</p>
    </div>
  </div>
</Link>

   ))} 
  </div>
</div>
    </div>
  );
}