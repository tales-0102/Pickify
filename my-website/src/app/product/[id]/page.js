"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { client, urlFor } from "../../../sanity";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "product" && _id == $id][0]`,
          { id }
        );

        setProduct(data);
        setMainImage(data?.images?.[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "80px 20px",
        fontFamily: "Playfair Display",
        position: "relative",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* 🌸 BACKGROUND BLOBS */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "rgba(248, 200, 220, 0.5)",
          filter: "blur(120px)",
          top: "-100px",
          left: "-100px",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "rgba(212, 175, 55, 0.25)",
          filter: "blur(120px)",
          bottom: "-100px",
          right: "-100px",
        }}
      />

      {/* 🔙 BACK BUTTON */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          marginBottom: "20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <a href="/">
          <button
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              border: "none",
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(10px)",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
        </a>
      </div>

      {/* 💎 MAIN CARD */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1100px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "50px",
          alignItems: "center",
          padding: "40px",
          borderRadius: "25px",
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        }}
      >
        {/* 🖼 IMAGE SECTION */}
        <div
          style={{
            padding: "20px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          <img
            src={urlFor(mainImage).width(600).url()}
            alt={product.title}
            style={{
              width: "100%",
              borderRadius: "20px",
              marginBottom: "15px",
            }}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={urlFor(img).width(100).url()}
                onClick={() => setMainImage(img)}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  cursor: "pointer",
                  border:
                    mainImage === img
                      ? "2px solid #D4AF37"
                      : "2px solid transparent",
                }}
              />
            ))}
          </div>
        </div>

        {/* 📄 CONTENT */}
        <div>
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "15px",
              color: "#333",
            }}
          >
            {product.title}
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#666",
              lineHeight: "1.8",
              marginBottom: "25px",
            }}
          >
            {product.description}
          </p>

          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#D4AF37",
              marginBottom: "25px",
            }}
          >
            Curated Luxury Pick 
          </div>

          <a href={product.link} target="_blank">
            <button
              style={{
                padding: "14px 30px",
                background:
                  "linear-gradient(135deg, #D4AF37, #F8C8DC)",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Buy Now 
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}