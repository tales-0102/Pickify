// // PATH: my-website/src/lib/affiliateUtils.js
// // NEW FILE — shared affiliate CTA helper.
// //
// // All existing Amazon products continue to work:
// //   - If affiliateSource is undefined/null, falls back to "Amazon"
// //   - The existing `link` field is used as the href unchanged
// //
// // To add a future retailer: add one entry to LABELS.
// // No frontend components need to change for new retailers.

// const LABELS = {
//   Amazon:  "Shop on Amazon",
//   Etsy:    "Shop on Etsy",
//   Walmart: "View on Walmart",
//   Other:   "View Product",
// };

// /**
//  * Returns { label, href } for an affiliate CTA button.
//  *
//  * @param {object} product  - Sanity product object (must have .link and optionally .affiliateSource)
//  * @returns {{ label: string, href: string, source: string }}
//  */
// export function getAffiliateCta(product) {
//   const source = product?.affiliateSource || "Amazon";  // backward-compatible default
//   const href   = product?.link            || "#";
//   const label  = LABELS[source] ?? "View Product";
//   return { label, href, source };
// }

// /**
//  * Convenience: returns just the button label string.
//  * Used in places that only need the text.
//  */
// export function getAffiliateLabel(product) {
//   return getAffiliateCta(product).label;
// }


// PATH: my-website/src/lib/affiliateUtils.js
// NEW FILE — shared affiliate CTA helper.
//
// All existing Amazon products continue to work:
//   - If affiliateSource is undefined/null, falls back to "Amazon"
//   - The existing `link` field is used as the href unchanged
//
// To add a future retailer: add one entry to LABELS.
// No frontend components need to change for new retailers.

const LABELS = {
  Amazon:  "Shop on Amazon",
  Etsy:    "Shop on Etsy",
  Walmart: "View on Walmart",
  Other:   "View Product",
};

/**
 * Returns { label, href } for an affiliate CTA button.
 *
 * @param {object} product  - Sanity product object (must have .link and optionally .affiliateSource)
 * @returns {{ label: string, href: string, source: string }}
 */
export function getAffiliateCta(product) {
  const source = product?.affiliateSource || "Amazon";  // backward-compatible default
  const href   = product?.link            || "#";
  const label  = LABELS[source] ?? "View Product";
  return { label, href, source };
}

/**
 * Convenience: returns just the button label string.
 * Used in places that only need the text.
 */
export function getAffiliateLabel(product) {
  return getAffiliateCta(product).label;
}