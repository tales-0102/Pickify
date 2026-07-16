export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://pickify-six.vercel.app/sitemap.xml",
  };
}