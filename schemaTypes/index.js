
// import product from './product'
// import post from './post'
// export const schemaTypes = [product]

// import product from './product'
// import post from './post'

// export const schemaTypes = [
//   product,
//   post,
// ]

// PATH: schemaTypes/index.js
// CHANGE: Added buyingGuide import and registration — everything else unchanged

import product     from './product'
import post        from './post'
import buyingGuide from './buyingGuide'

export const schemaTypes = [
  product,
  post,
  buyingGuide,
]