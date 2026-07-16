// export default {
//   name: 'product',
//   title: 'Product',
//   type: 'document',
//   fields: [
//     {
//       name: 'title',
//       title: 'Product Title',
//       type: 'string'
//     },
//     {
//       name: 'image',
//       title: 'Product Image',
//       type: 'image'
//     },
//     {
//       name: 'description',
//       title: 'Description',
//       type: 'text'
//     },
//     {
//       name: 'link',
//       title: 'Affiliate Link',
//       type: 'url'
//     }
//   ]
// }
// export default {
//   name: 'product',
//   title: 'Product',
//   type: 'document',
//   fields: [
//     {
//       name: 'title',
//       title: 'Product Title',
//       type: 'string'
//     },

//     // 🔥 MULTIPLE IMAGES (GALLERY)
//     {
//       name: 'images',
//       title: 'Product Images',
//       type: 'array',
//       of: [
//         {
//           type: 'image',
//           options: {
//             hotspot: true
//           }
//         }
//       ]
//     },

//     {
//       name: 'description',
//       title: 'Description',
//       type: 'text'
//     },

//     {
//       name: 'link',
//       title: 'Affiliate Link',
//       type: 'url'
//     }
//   ]
// }

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',

  fields: [

    /* =========================================================
       BASIC INFORMATION
    ========================================================= */

    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      initialValue: 'Pickify'
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Pantry Organization', value: 'Pantry Organization' },
          { title: 'Kitchen Organization', value: 'Kitchen Organization' },
          { title: 'Cabinet Organization', value: 'Cabinet Organization' },
          { title: 'Drawer Organization', value: 'Drawer Organization' },
          { title: 'Fridge Organization', value: 'Fridge Organization' },
          { title: 'Closet Organization', value: 'Closet Organization' },
          { title: 'Bathroom Organization', value: 'Bathroom Organization' },
          { title: 'Laundry Organization', value: 'Laundry Organization' },
          { title: 'Home Storage', value: 'Home Storage' }
        ]
      }
    }),

    /* =========================================================
       PRODUCT GALLERY
       (Existing field name kept to avoid breaking frontend)
    ========================================================= */

    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      validation: Rule => Rule.min(1)
    }),

    /* =========================================================
       PRODUCT DESCRIPTIONS
    ========================================================= */

    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      description:
        'Shown on product cards, blog featured products, and homepage.',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(220)
    }),

    defineField({
      name: 'description',
      title: 'Full Product Description',
      description:
        'Detailed SEO description for the product page.',
      type: 'text',
      rows: 10,
      validation: Rule => Rule.required()
    }),

    /* =========================================================
       AFFILIATE LINK
       (Existing field name kept)
    ========================================================= */

    defineField({
      name: 'link',
      title: 'Amazon Affiliate Link',
      type: 'url',
      validation: Rule =>
        Rule.required().uri({
          scheme: ['http', 'https']
        })
    }),

    /* =========================================================
       PRODUCT FEATURES
    ========================================================= */

    defineField({
      name: 'features',
      title: 'Key Features',
      description:
        'One feature per line.',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ]
    }),

    /* =========================================================
       BENEFITS
    ========================================================= */

    defineField({
      name: 'benefits',
      title: 'Benefits',
      description:
        'Real-life benefits customers get from using this product.',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ]
    }),

    /* =========================================================
       PROS
    ========================================================= */

    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ]
    }),

    /* =========================================================
       CONS
    ========================================================= */

    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ]
    }),
        /* =========================================================
       BEST FOR
    ========================================================= */

    defineField({
      name: 'bestFor',
      title: 'Best For',
      description: 'Where this product works best.',
      type: 'array',
      of: [{ type: 'string' }]
    }),

    /* =========================================================
       SPECIFICATIONS
    ========================================================= */

    defineField({
      name: 'material',
      title: 'Material',
      type: 'string'
    }),

    defineField({
      name: 'color',
      title: 'Color',
      type: 'string'
    }),

    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string'
    }),

    defineField({
      name: 'tiers',
      title: 'Number of Tiers',
      type: 'string'
    }),

    /* =========================================================
       PRODUCT BADGE
    ========================================================= */

    defineField({
      name: 'badge',
      title: 'Product Badge',
      type: 'string',
      options: {
        list: [
          { title: 'Best Seller', value: 'Best Seller' },
          { title: "Editor's Choice", value: "Editor's Choice" },
          { title: 'Best Value', value: 'Best Value' },
          { title: 'Budget Pick', value: 'Budget Pick' },
          { title: 'Most Popular', value: 'Most Popular' },
          { title: 'Trending', value: 'Trending' },
          { title: 'New Arrival', value: 'New Arrival' }
        ]
      }
    }),

    /* =========================================================
       PRODUCT STATUS
    ========================================================= */

    defineField({
      name: 'status',
      title: 'Product Status',
      type: 'string',
      initialValue: 'Featured',
      options: {
        list: [
          { title: 'Featured', value: 'Featured' },
          { title: 'Popular', value: 'Popular' },
          { title: 'Recommended', value: 'Recommended' },
          { title: 'Hidden', value: 'Hidden' }
        ]
      }
    }),

    /* =========================================================
       DISPLAY ORDER
    ========================================================= */

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 1
    }),

    /* =========================================================
       SEO
    ========================================================= */

    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      description:
        'Google title tag. Leave blank to use Product Title.',
      type: 'string',
      validation: Rule => Rule.max(60)
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      description:
        'Meta description shown in Google.',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(160)
    }),

    /* =========================================================
       RELATED PRODUCTS
    ========================================================= */

    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      description:
        'Products shown under this product and inside blog posts.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ]
    })

  ],

  /* =========================================================
     PREVIEW
  ========================================================= */

  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      subtitle: 'category'
    }
  }

})