// FILE PATH: schemaTypes/post.js
// STATUS: NEW FILE

// import { defineField, defineType } from "sanity";

// export default defineType({
//   name: "post",
//   title: "Blog Post",
//   type: "document",
//   fields: [
//     defineField({
//       name: "title",
//       title: "Title",
//       type: "string",
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "slug",
//       title: "Slug",
//       type: "slug",
//       options: { source: "title", maxLength: 96 },
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "heroImage",
//       title: "Hero Image",
//       type: "image",
//       options: { hotspot: true },
//       fields: [{ name: "alt", title: "Alt Text", type: "string" }],
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "excerpt",
//       title: "Excerpt",
//       type: "text",
//       rows: 3,
//       description: "Short summary shown on blog cards (1-2 sentences).",
//       validation: (Rule) => Rule.max(200),
//     }),
//     defineField({
//       name: "category",
//       title: "Category",
//       type: "string",
//       options: {
//         list: [
//           { title: "Pantry", value: "Pantry" },
//           { title: "Kitchen", value: "Kitchen" },
//           { title: "Fridge", value: "Fridge" },
//           { title: "Closet & Drawers", value: "Closet & Drawers" },
//           { title: "Tips & Guides", value: "Tips & Guides" },
//         ],
//       },
//     }),
//     defineField({
//       name: "publishedAt",
//       title: "Published At",
//       type: "datetime",
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "body",
//       title: "Body",
//       type: "array",
//       of: [
//         { type: "block" },
//         {
//           type: "image",
//           options: { hotspot: true },
//           fields: [{ name: "alt", title: "Alt Text", type: "string" }],
//         },
//       ],
//     }),
//     defineField({
//       name: "seoTitle",
//       title: "SEO Title",
//       type: "string",
//       description: "Overrides the page <title> tag. Defaults to the post title.",
//     }),
//     defineField({
//       name: "seoDescription",
//       title: "SEO Description",
//       type: "text",
//       rows: 2,
//       validation: (Rule) => Rule.max(160),
//     }),
//     defineField({
//       name: "seoImage",
//       title: "SEO / Social Share Image",
//       type: "image",
//       description: "Defaults to hero image if left empty.",
//     }),

//     defineField({
//   name: "featuredProducts",
//   title: "Featured Products",
//   description:
//     "Select one or more products to display inside this blog post.",
//   type: "array",
//   of: [
//     {
//       type: "reference",
//       to: [{ type: "product" }],
//     },
//   ],
// }),
//   ],
//   preview: {
//     select: { title: "title", media: "heroImage", subtitle: "category" },
//   },
// });



// PATH: schemaTypes/post.js
// CHANGE: Added optional relatedBuyingGuide reference field at end of fields array.
//         All existing fields are unchanged.

import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on blog cards (1-2 sentences).",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Pantry",           value: "Pantry" },
          { title: "Kitchen",          value: "Kitchen" },
          { title: "Fridge",           value: "Fridge" },
          { title: "Closet & Drawers", value: "Closet & Drawers" },
          { title: "Tips & Guides",    value: "Tips & Guides" },
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt Text", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Overrides the page <title> tag. Defaults to the post title.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "seoImage",
      title: "SEO / Social Share Image",
      type: "image",
      description: "Defaults to hero image if left empty.",
    }),
    defineField({
      name: "featuredProducts",
      title: "Featured Products",
      description: "Select one or more products to display inside this blog post.",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
    }),

    // ── NEW FIELD: Article → Buying Guide connection ──────────────────────
    defineField({
      name: "relatedBuyingGuide",
      title: "Related Buying Guide",
      type: "reference",
      to: [{ type: "buyingGuide" }],
      description:
        "Optional — links this article to a Buying Guide. If set, a Buying Guide card appears on the article page. Leave blank to hide the card.",
    }),
    // ─────────────────────────────────────────────────────────────────────
  ],
  preview: {
    select: { title: "title", media: "heroImage", subtitle: "category" },
  },
});