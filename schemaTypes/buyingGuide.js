// PATH: schemaTypes/buyingGuide.js
// NEW FILE — Buying Guide schema for Sanity Studio

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'buyingGuide',
  title: 'Buying Guide',
  type: 'document',

  fields: [

    /* ─── IDENTITY ─── */

    defineField({
      name: 'title',
      title: 'Guide Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g. "The Best Stackable Pantry Bins"'
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
      description: 'URL path — e.g. stackable-pantry-bins → /buying-guides/stackable-pantry-bins'
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Stackable Pantry Bins',           value: 'Stackable Pantry Bins' },
          { title: 'Lazy Susan Turntables',            value: 'Lazy Susan Turntables' },
          { title: 'Expandable Drawer Dividers',       value: 'Expandable Drawer Dividers' },
          { title: 'Over-the-Door Pantry Organizers',  value: 'Over-the-Door Pantry Organizers' },
          { title: 'Clear Fridge Storage Bins',        value: 'Clear Fridge Storage Bins' },
          { title: 'Kitchen Organization',             value: 'Kitchen Organization' },
          { title: 'Closet Organization',              value: 'Closet Organization' },
          { title: 'Bathroom Organization',            value: 'Bathroom Organization' },
          { title: 'Home Storage',                     value: 'Home Storage' },
        ],
      },
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),

    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
      description: 'Unpublish to hide from the listing page without deleting.'
    }),

    /* ─── IMAGES ─── */

    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),

    /* ─── DESCRIPTIONS ─── */

    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(240),
      description: 'Shown on the buying guides listing card.',
    }),

    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
        },
      ],
      description: 'Opening section of the buying guide.',
    }),

    /* ─── BUYING CRITERIA ─── */

    defineField({
      name: 'buyingCriteria',
      title: 'What to Look For / Buying Criteria',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading',     title: 'Heading',     type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 4 },
          ],
          preview: { select: { title: 'heading' } },
        },
      ],
    }),

    /* ─── SPECIFICATIONS ─── */

    defineField({
      name: 'specificationsToConsider',
      title: 'Specifications to Consider',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. "Material", "Dimensions", "Capacity"',
    }),

    defineField({
      name: 'commonMistakes',
      title: 'Common Mistakes to Avoid',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'whoIsItBestFor',
      title: 'Who Is It Best For',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'whoShouldAvoid',
      title: 'Who Should Avoid It',
      type: 'text',
      rows: 4,
    }),

    /* ─── RECOMMENDED PRODUCTS ─── */
    // References EXISTING product documents — no duplication

    defineField({
      name: 'recommendedProducts',
      title: 'Recommended Products',
      description: 'Reference existing Pickify products. Order = display order.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }],
              validation: Rule => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label (optional)',
              type: 'string',
              description: 'e.g. "Top Pick", "Best Budget", "Best for Small Spaces"',
              options: {
                list: [
                  { title: 'Top Pick',             value: 'Top Pick' },
                  { title: 'Alternative Pick',      value: 'Alternative Pick' },
                  { title: 'Best Budget',           value: 'Best Budget' },
                  { title: 'Best Premium',          value: 'Best Premium' },
                  { title: 'Best for Small Spaces', value: 'Best for Small Spaces' },
                  { title: 'Staff Pick',            value: 'Staff Pick' },
                ],
              },
            },
            {
              name: 'whyWeRecommendIt',
              title: 'Why We Recommend It',
              type: 'text',
              rows: 4,
              description: 'Short editorial note shown on the guide.',
            },
          ],
          preview: {
            select: {
              title:  'product.title',
              label:  'label',
              media:  'product.images.0',
            },
            prepare({ title, label }) {
              return { title: title || 'Product', subtitle: label || '' }
            },
          },
        },
      ],
    }),

    /* ─── FAQs ─── */

    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer',   title: 'Answer',   type: 'text', rows: 4 },
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),

    /* ─── RELATED CONTENT ─── */

    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      description: 'Reference existing blog posts.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
    }),

    defineField({
      name: 'relatedGuides',
      title: 'Related Buying Guides',
      description: 'Link to other buying guides.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'buyingGuide' }] }],
    }),

    /* ─── CTA ─── */

    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      description: 'e.g. "Ready to get organized?"',
    }),

    defineField({
      name: 'ctaBody',
      title: 'CTA Body',
      type: 'text',
      rows: 3,
    }),

    /* ─── SEO ─── */

    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: Rule => Rule.max(60),
      description: 'Defaults to Guide Title if empty.',
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(160),
    }),

    defineField({
      name: 'seoImage',
      title: 'SEO / Social Share Image',
      type: 'image',
      description: 'Defaults to hero image if empty.',
    }),

    defineField({
      name: 'primaryKeyword',
      title: 'Primary Keyword',
      type: 'string',
    }),

    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),

  ],

  preview: {
    select: {
      title:    'title',
      media:    'heroImage',
      subtitle: 'category',
    },
  },
})