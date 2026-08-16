// import { getPosts, getProducts } from "../sanity";

// export default async function sitemap() {
//   const baseUrl = "https://pickify-six.vercel.app";

//   const posts = await getPosts();
//   const products = await getProducts();

//   const blogUrls = posts.map((post) => ({
//     url: `${baseUrl}/blog/${post.slug.current}`,
//     lastModified: post.publishedAt || new Date(),
//   }));

//   const productUrls = products.map((product) => ({
//     url: `${baseUrl}/product/${product._id}`,
//     lastModified: new Date(),
//   }));

//   return [
//     {
//       url: baseUrl,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseUrl}/blog`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseUrl}/about`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseUrl}/contact`,
//       lastModified: new Date(),
//     },

//     ...blogUrls,
//     ...productUrls,
//   ];
// }




// PATH: my-website/src/app/sitemap.js
// CHANGE: Added buying guide URLs. Existing product/post entries unchanged.

import { client } from '../sanity';

export default async function sitemap() {
  const base = 'https://www.pickify.com'; // update if your domain differs

  /* ── Existing: products ── */
  const products = await client.fetch(
    `*[_type == "product" && status != "Hidden"]{ _id, _updatedAt }`
  ).catch(() => []);

  /* ── Existing: blog posts ── */
  const posts = await client.fetch(
    `*[_type == "post"]{ "slug": slug.current, _updatedAt }`
  ).catch(() => []);

  /* ── NEW: buying guides ── */
  const guides = await client.fetch(
    `*[_type == "buyingGuide" && isPublished != false]{ "slug": slug.current, _updatedAt }`
  ).catch(() => []);

  const productUrls = products.map((p) => ({
    url: `${base}/product/${p._id}`,
    lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const postUrls = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const guideUrls = guides.map((g) => ({
    url: `${base}/buying-guides/${g.slug}`,
    lastModified: g._updatedAt ? new Date(g._updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    { url: base,                    lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${base}/blog`,          lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${base}/buying-guides`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/about`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contact`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    ...productUrls,
    ...postUrls,
    ...guideUrls,
  ];
}