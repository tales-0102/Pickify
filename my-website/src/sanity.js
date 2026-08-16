


// // PATH: my-website/src/sanity.js
// // CHANGE: Added getBuyingGuides + getBuyingGuideBySlug at the bottom.
// //         All existing functions are UNCHANGED.

// import { createClient } from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";

// export const client = createClient({
//   projectId: "xxbrklcr",
//   dataset: "production",
//   useCdn: false,
//   apiVersion: "2024-01-01",
// });

// const builder = imageUrlBuilder(client);

// export function urlFor(source) {
//   return builder.image(source);
// }

// /* ─────────────────── PRODUCTS ─────────────────── */

// export async function getProducts() {
//   return await client.fetch(
//     `*[_type == "product" && status != "Hidden"]
//       | order(displayOrder asc){
//         _id,
//         title,
//         slug,
//         images,
//         shortDescription,
//         description,
//         link,
//         badge,
//         category,
//         features,
//         pros,
//         status
//       }`
//   );
// }

// export async function getProductById(id) {
//   return await client.fetch(
//     `*[_type == "product" && _id == $id][0]{
//       _id,
//       title,
//       slug,
//       brand,
//       category,
//       images,
//       shortDescription,
//       description,
//       link,
//       features,
//       benefits,
//       pros,
//       cons,
//       bestFor,
//       material,
//       color,
//       dimensions,
//       tiers,
//       badge,
//       status,
//       seoTitle,
//       seoDescription,
//       relatedProducts[]->{
//         _id,
//         title,
//         slug,
//         images,
//         shortDescription,
//         badge,
//         link
//       }
//     }`,
//     { id }
//   );
// }

// export async function getRelatedProducts(id, category) {
//   return await client.fetch(
//     `*[_type == "product"
//         && _id != $id
//         && category == $category
//         && status != "Hidden"]
//       | order(displayOrder asc)[0...4]{
//         _id,
//         title,
//         slug,
//         images,
//         shortDescription,
//         badge,
//         link,
//         features
//       }`,
//     { id, category: category || "" }
//   );
// }

// /* ─────────────────── BLOG ─────────────────── */

// export async function getPosts() {
//   return await client.fetch(
//     `*[_type == "post"] | order(publishedAt desc){
//       _id, title, slug, excerpt, category, publishedAt, heroImage
//     }`
//   );
// }

// export async function getPostBySlug(slug) {
//   return await client.fetch(
//     `*[_type == "post" && slug.current == $slug][0]{
//       ...,
//       featuredProducts[]->{
//         _id,
//         title,
//         slug,
//         images,
//         shortDescription,
//         link,
//         badge,
//         features,
//         pros
//       }
//     }`,
//     { slug }
//   );
// }

// export async function getRelatedPosts(id, category) {
//   return await client.fetch(
//     `*[_type == "post" && _id != $id && category == $category]
//       | order(publishedAt desc)[0...3]{
//         _id, title, slug, excerpt, heroImage, publishedAt
//       }`,
//     { id, category: category || "" }
//   );
// }

// export async function getLatestPosts() {
//   return await client.fetch(
//     `*[_type == "post"] | order(publishedAt desc)[0...3]{
//       _id, title, slug
//     }`
//   );
// }

// /* ─────────────────── BUYING GUIDES ─────────────────── */

// /** List page — lightweight fields only */
// export async function getBuyingGuides() {
//   return await client.fetch(
//     `*[_type == "buyingGuide" && isPublished != false]
//       | order(publishedAt desc){
//         _id,
//         title,
//         slug,
//         category,
//         shortDescription,
//         heroImage,
//         publishedAt
//       }`
//   );
// }

// /** Single guide — full content + dereferenced products and articles */
// export async function getBuyingGuideBySlug(slug) {
//   return await client.fetch(
//     `*[_type == "buyingGuide" && slug.current == $slug && isPublished != false][0]{
//       _id,
//       title,
//       slug,
//       category,
//       shortDescription,
//       introduction,
//       heroImage,
//       buyingCriteria,
//       specificationsToConsider,
//       commonMistakes,
//       whoIsItBestFor,
//       whoShouldAvoid,
//       ctaHeading,
//       ctaBody,
//       seoTitle,
//       seoDescription,
//       seoImage,
//       publishedAt,
//       faqs,
//       recommendedProducts[]{
//         label,
//         whyWeRecommendIt,
//         product->{
//           _id,
//           title,
//           slug,
//           images,
//           shortDescription,
//           description,
//           link,
//           badge,
//           category,
//           features,
//           pros,
//           material,
//           dimensions
//         }
//       },
//       relatedArticles[]->{
//         _id,
//         title,
//         slug,
//         excerpt,
//         heroImage,
//         publishedAt,
//         category
//       },
//       relatedGuides[]->{
//         _id,
//         title,
//         slug,
//         shortDescription,
//         heroImage,
//         category
//       }
//     }`,
//     { slug }
//   );
// }

// /** Used by product pages — find guides that feature this product */
// export async function getGuidesForProduct(productId) {
//   return await client.fetch(
//     `*[_type == "buyingGuide"
//         && isPublished != false
//         && $productId in recommendedProducts[].product._ref][0...3]{
//       _id,
//       title,
//       slug,
//       category
//     }`,
//     { productId }
//   );
// }



// PATH: my-website/src/sanity.js
// CHANGES:
//   1. getPostBySlug — added relatedBuyingGuide->{ ... } to projection
//   2. getProductById — added affiliateSource field
//   3. getRelatedProducts — added affiliateSource field
//   4. getProducts — added affiliateSource field
//   All other functions unchanged.

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "xxbrklcr",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

/* ─────────────────── PRODUCTS ─────────────────── */

export async function getProducts() {
  return await client.fetch(
    `*[_type == "product" && status != "Hidden"]
      | order(displayOrder asc){
        _id,
        title,
        slug,
        images,
        shortDescription,
        description,
        link,
        affiliateSource,
        badge,
        category,
        features,
        pros,
        status
      }`
  );
}

export async function getProductById(id) {
  return await client.fetch(
    `*[_type == "product" && _id == $id][0]{
      _id,
      title,
      slug,
      brand,
      category,
      images,
      shortDescription,
      description,
      link,
      affiliateSource,
      features,
      benefits,
      pros,
      cons,
      bestFor,
      material,
      color,
      dimensions,
      tiers,
      badge,
      status,
      seoTitle,
      seoDescription,
      relatedProducts[]->{
        _id,
        title,
        slug,
        images,
        shortDescription,
        badge,
        link,
        affiliateSource
      }
    }`,
    { id }
  );
}

export async function getRelatedProducts(id, category) {
  return await client.fetch(
    `*[_type == "product"
        && _id != $id
        && category == $category
        && status != "Hidden"]
      | order(displayOrder asc)[0...4]{
        _id,
        title,
        slug,
        images,
        shortDescription,
        badge,
        link,
        affiliateSource,
        features
      }`,
    { id, category: category || "" }
  );
}

/* ─────────────────── BLOG ─────────────────── */

export async function getPosts() {
  return await client.fetch(
    `*[_type == "post"] | order(publishedAt desc){
      _id, title, slug, excerpt, category, publishedAt, heroImage
    }`
  );
}

// CHANGED: Added relatedBuyingGuide->{ ... } to the projection.
export async function getPostBySlug(slug) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      ...,
      featuredProducts[]->{
        _id,
        title,
        slug,
        images,
        shortDescription,
        link,
        affiliateSource,
        badge,
        features,
        pros
      },
      relatedBuyingGuide->{
        _id,
        title,
        slug,
        shortDescription,
        heroImage,
        category
      }
    }`,
    { slug }
  );
}

export async function getRelatedPosts(id, category) {
  return await client.fetch(
    `*[_type == "post" && _id != $id && category == $category]
      | order(publishedAt desc)[0...3]{
        _id, title, slug, excerpt, heroImage, publishedAt
      }`,
    { id, category: category || "" }
  );
}

export async function getLatestPosts() {
  return await client.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...3]{
      _id, title, slug
    }`
  );
}

/* ─────────────────── BUYING GUIDES ─────────────────── */

export async function getBuyingGuides() {
  return await client.fetch(
    `*[_type == "buyingGuide" && isPublished != false]
      | order(publishedAt desc){
        _id,
        title,
        slug,
        category,
        shortDescription,
        heroImage,
        publishedAt
      }`
  );
}

export async function getBuyingGuideBySlug(slug) {
  return await client.fetch(
    `*[_type == "buyingGuide" && slug.current == $slug && isPublished != false][0]{
      _id,
      title,
      slug,
      category,
      shortDescription,
      introduction,
      heroImage,
      buyingCriteria,
      specificationsToConsider,
      commonMistakes,
      whoIsItBestFor,
      whoShouldAvoid,
      ctaHeading,
      ctaBody,
      seoTitle,
      seoDescription,
      seoImage,
      publishedAt,
      faqs,
      recommendedProducts[]{
        label,
        whyWeRecommendIt,
        product->{
          _id,
          title,
          slug,
          images,
          shortDescription,
          description,
          link,
          affiliateSource,
          badge,
          category,
          features,
          pros,
          material,
          dimensions
        }
      },
      relatedArticles[]->{
        _id,
        title,
        slug,
        excerpt,
        heroImage,
        publishedAt,
        category
      },
      relatedGuides[]->{
        _id,
        title,
        slug,
        shortDescription,
        heroImage,
        category
      }
    }`,
    { slug }
  );
}

export async function getGuidesForProduct(productId) {
  return await client.fetch(
    `*[_type == "buyingGuide"
        && isPublished != false
        && $productId in recommendedProducts[].product._ref][0...3]{
      _id,
      title,
      slug,
      category
    }`,
    { productId }
  );
}