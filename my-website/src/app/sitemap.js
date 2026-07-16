import { getPosts, getProducts } from "../sanity";

export default async function sitemap() {
  const baseUrl = "https://pickify-six.vercel.app";

  const posts = await getPosts();
  const products = await getProducts();

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: post.publishedAt || new Date(),
  }));

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product._id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },

    ...blogUrls,
    ...productUrls,
  ];
}