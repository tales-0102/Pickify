// FILE PATH: src/sanity.js
// STATUS: REPLACE EXISTING FILE

// FILE PATH: src/sanity.js
// STATUS: REPLACE EXISTING FILE

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "xxbrklcr",
  dataset: "production",
  // useCdn: true causes CORS failures on localhost:3000 — keep false for all envs
  // Switch to true only after adding your domain to Sanity CORS origins
  useCdn: false,
  apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

/* ---------------- PRODUCTS ---------------- */

export async function getProducts() {
  return await client.fetch(`*[_type == "product"] | order(_createdAt desc)`);
}

export async function getProductById(id) {
  return await client.fetch(`*[_type == "product" && _id == $id][0]`, { id });
}

export async function getRelatedProducts(id, category) {
  return await client.fetch(
    `*[_type == "product" && _id != $id && category == $category][0...4]`,
    { id, category: category || "" }
  );
}

/* ---------------- BLOG ---------------- */

export async function getPosts() {
  return await client.fetch(
    `*[_type == "post"] | order(publishedAt desc){
      _id, title, slug, excerpt, category, publishedAt, heroImage
    }`
  );
}

export async function getPostBySlug(slug) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getRelatedPosts(id, category) {
  return await client.fetch(
    `*[_type == "post" && _id != $id && category == $category] | order(publishedAt desc)[0...3]{
      _id, title, slug, excerpt, heroImage, publishedAt
    }`,
    { id, category: category || "" }
  );
}

export async function getLatestPosts(limit = 3) {
  return await client.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...${limit}]{
      _id, title, slug
    }`
  );
}