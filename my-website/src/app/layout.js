


// FILE PATH: src/app/layout.js
// STATUS: REPLACE EXISTING FILE

import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata = {
  title: "Pickify — Curated Home & Kitchen Organization",
  description:
    "Editorial picks for a calmer, more beautiful home. Pickify curates the best Amazon finds for kitchen and home organization.",
    verification: {
  google: "gaL1xG8k-prpykvjQhLjNbm_H_ONUwtr82_oKs8ijFc",
},
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.className} ${headingFont.variable} ${bodyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}