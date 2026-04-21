import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "xxbrklcr",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});
export async function getProducts() {
  return await client.fetch(`*[_type == "product"]`);
}
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}