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
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Title',
      type: 'string'
    },

    // 🔥 MULTIPLE IMAGES (GALLERY)
    {
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
      ]
    },

    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },

    {
      name: 'link',
      title: 'Affiliate Link',
      type: 'url'
    }
  ]
}