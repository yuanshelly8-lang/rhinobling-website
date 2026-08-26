import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const products = JSON.parse(fs.readFileSync(path.join(root, 'data/products-batch02.json'), 'utf8'));
const site = 'https://rhinobling.com';

const existing = {
  P001: { name: 'Custom 40oz Rhinestone Tumbler', slug: 'custom-40oz-rhinestone-tumbler', image: 'assets/images/product-batch01/P001/P001-01.webp', alt: 'White handled 40oz tumbler with pink heart rhinestone decoration' },
  P002: { name: 'Custom Rhinestone Hand Mirror', slug: 'custom-rhinestone-hand-mirror', image: 'assets/images/product-batch01/P002/P002-01.webp', alt: 'Pink heart-shaped custom rhinestone hand mirror' },
  P003: { name: 'Rhinestone Pill Box Keychain', slug: 'rhinestone-pill-box-keychain', image: 'assets/images/product-batch01/P003/P003-01.webp', alt: 'Pink and silver mini metal rhinestone pill box keychains' }
};
const catalog = new Map([...products, ...Object.entries(existing).map(([id, value]) => ({ id, ...value }))].map(item => [item.id, item]));

const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const titleCase = value => value.replace(/\b\w/g, char => char.toUpperCase());
const pageUrl = product => `${site}/product-${product.slug}.html`;
const filePath = product => path.join(root, `product-${product.slug}.html`);
const waLink = product => `https://wa.me/8615270582230?text=${encodeURIComponent(`Hello RhinoBling, I would like a factory quote for ${product.name}. Product URL: ${pageUrl(product)}. Quantity: [please add]. Logo customization: [please add]. Packaging: [please add].`)}`;

function header() {
  return `<div class="top">CUSTOM RHINESTONE PRODUCTS · OEM / ODM · GLOBAL B2B SUPPLY</div>
<header class="nav"><div class="wrap nav-inner"><a class="logo" href="index.html" aria-label="RhinoBling home"><span class="logo-mark">R</span><span>RHINO<em>BLING</em><small>Custom Rhinestone Products</small></span></a><button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">Menu</button><nav class="navlinks" aria-label="Main navigation"><a href="products.html">Products</a><a href="customization.html">Customization</a><a href="factory.html">Factory</a><a href="quality.html">Quality</a><a href="blog.html">Guides</a><a href="faq.html">FAQ</a><a href="about.html">About</a><a href="contact.html" class="button compact">Get Factory Quote</a></nav></div></header>`;
}

function footer() {
  return `<footer class="footer"><div class="wrap"><div class="footer-cta"><div><span>START YOUR CUSTOM PROJECT</span><h2>Get product options and project-based pricing.</h2></div><a class="button light" href="contact.html">Request a Quote</a></div><div class="copyright">© 2026 RhinoBling · rhinobling.com · All rights reserved.</div></div></footer><a class="wa" href="https://wa.me/8615270582230" target="_blank" rel="noopener" aria-label="Chat with RhinoBling on WhatsApp"><span class="wa-icon">WA</span><span><b>Chat with Factory</b><small>Ask about this product</small></span></a><div class="mobile-bar"><a href="https://wa.me/8615270582230" target="_blank" rel="noopener">WhatsApp</a><a href="contact.html">Get Quote</a></div><script src="assets/site.js"></script>`;
}

function relatedCard(item) {
  return `<a class="pd-related-card" href="product-${esc(item.slug)}.html"><img src="${esc(item.image)}" alt="${esc(item.alt || item.name)}" loading="lazy"><span>${esc(item.name)}</span></a>`;
}

function productPage(product) {
  const galleryImages = product.galleryImages || [{ src: product.image, alt: product.alt, width: product.width, height: product.height }];
  const primaryImage = galleryImages[0];
  const galleryClass = galleryImages.length === 1 ? 'detail-gallery product-gallery single-image-product' : 'detail-gallery product-gallery';
  const galleryThumbnails = galleryImages.length > 1
    ? `<div class="product-gallery-thumbs">${galleryImages.slice(1).map((image, index) => `<img src="${esc(image.src)}" alt="${esc(image.alt)}" width="${image.width}" height="${image.height}" loading="lazy">`).join('')}</div>`
    : '';
  const related = product.related.map(id => catalog.get(id)).filter(Boolean);
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` },
    { '@type': 'ListItem', position: 2, name: 'Products', item: `${site}/products.html` },
    { '@type': 'ListItem', position: 3, name: product.category, item: `${site}/${product.categoryFile}` },
    { '@type': 'ListItem', position: 4, name: product.name, item: pageUrl(product) }
  ] };
  const title = `${titleCase(product.keyword)} | RhinoBling`;
  const description = `Explore ${product.name} in RhinoBling's current ${product.category.toLowerCase()} collection. For ${product.keyword} inquiries, request a project-specific factory quote.`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index,follow"><link rel="canonical" href="${pageUrl(product)}"><meta property="og:type" content="product"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:image" content="${site}/${esc(primaryImage.src)}"><meta property="og:image:alt" content="${esc(primaryImage.alt)}"><link rel="stylesheet" href="assets/style.css"><script type="application/ld+json">${JSON.stringify(breadcrumb)}</script></head><body>${header()}<main><section class="pd-hero"><div class="wrap"><div class="pd-breadcrumb"><a href="index.html">Home</a> / <a href="products.html">Products</a> / <a href="${esc(product.categoryFile)}">${esc(product.category)}</a> / ${esc(product.name)}</div><div class="eyebrow">CATALOG PRODUCT · PROJECT QUOTE</div><h1>${esc(product.name)}</h1><p class="lead">${esc(product.intro)}</p></div></section><section><div class="wrap detail-grid pd-main"><div class="${galleryClass}"><img class="product-gallery-main" src="${esc(primaryImage.src)}" alt="${esc(primaryImage.alt)}" width="${primaryImage.width}" height="${primaryImage.height}" loading="eager" fetchpriority="high">${galleryThumbnails}</div><div class="detail-panel"><div class="eyebrow">B2B PRODUCT INQUIRY</div><h2>Discuss this catalog item with our team.</h2><p>${esc(product.intro)}</p><ul class="check-list">${product.highlights.map(item => `<li>${esc(item)}</li>`).join('')}</ul><div class="notice">No fixed public specifications, price, MOQ or availability are stated for this catalog reference. We confirm the selected item and project requirements before quotation.</div><div class="hero-actions"><a class="button" href="contact.html">Request Factory Quote</a><a class="button outline" href="${waLink(product)}" target="_blank" rel="noopener">Ask About This Product on WhatsApp</a></div></div></div></section><section class="pink"><div class="wrap pd-content"><div class="pd-copy"><div><div class="eyebrow">PRODUCT HIGHLIGHTS</div><h2>What is confirmed from the current catalog reference</h2><div class="pd-benefits">${product.highlights.map(item => `<div><strong>${esc(item)}</strong><span>Confirm the exact item details against your project brief.</span></div>`).join('')}</div></div><div><div class="eyebrow">CUSTOMIZATION / OEM</div><h2>Confirm the project route before ordering</h2><p>Share your selected reference, intended quantity, logo artwork and packaging requirement. RhinoBling will confirm the applicable item configuration before providing a factory quote.</p></div><div><div class="eyebrow">WHOLESALE USE</div><h2>For B2B product research</h2><p>${esc(product.scenario)} Product suitability, current availability and any custom scope are confirmed per inquiry.</p></div><div><div class="eyebrow">FAQ</div><div class="pd-faq"><details><summary>Can I request a quote for this exact product?</summary><p>Yes. Send the product reference, quantity and project requirement so the current item can be confirmed.</p></details><details><summary>Can I ask about logo or packaging options?</summary><p>Yes. Include your logo and packaging request; suitability is confirmed for the selected item.</p></details><details><summary>Are fixed specifications published for this item?</summary><p>No. This page only states details supported by the current catalog reference. Confirm product-specific specifications before ordering.</p></details></div></div></div><aside class="pd-side"><div class="eyebrow">START AN INQUIRY</div><h2>Request a factory quote</h2><p>Send the item name, quantity, logo requirement and packaging notes.</p><a class="button" href="contact.html">Request Factory Quote</a><a class="button outline" href="${waLink(product)}" target="_blank" rel="noopener">WhatsApp This Product</a><div class="pd-backlinks"><a href="${esc(product.categoryFile)}">Back to ${esc(product.category)}</a><a href="products.html">All products</a></div></aside></div></section><section><div class="wrap"><div class="section-head"><div><div class="eyebrow">RELATED PRODUCTS</div><h2>Explore related catalog items</h2></div></div><div class="pd-related">${related.map(relatedCard).join('')}</div></div></section></main>${footer()}</body></html>`;
}

function card(product) {
  return `<article class="product" data-batch02-product="${esc(product.id)}"><a class="product-image-link" href="product-${esc(product.slug)}.html"><img src="${esc(product.image)}" alt="${esc(product.alt)}" loading="lazy" width="${product.width}" height="${product.height}"></a><div class="product-body"><div class="product-kicker">CATALOG PRODUCT · PROJECT QUOTE</div><h3>${esc(product.name)}</h3><div class="meta"><span class="tag">${esc(product.category)}</span><span class="tag">Project inquiry</span></div><div class="product-actions"><a class="text-link" href="product-${esc(product.slug)}.html">View product →</a><a class="source-link" href="${esc(product.categoryFile)}">${esc(product.category)}</a></div></div></article>`;
}

function replaceManagedBlock(file, start, end, content, marker) {
  const absolute = path.join(root, file);
  let html = fs.readFileSync(absolute, 'utf8');
  const block = `<!-- ${start} -->\n${content}\n<!-- ${end} -->`;
  const matcher = new RegExp(`<!-- ${start} -->[\\s\\S]*?<!-- ${end} -->`);
  if (matcher.test(html)) html = html.replace(matcher, block);
  else {
    const insertionMarker = html.includes(marker) ? marker : '<div class="products">';
    if (!html.includes(insertionMarker)) throw new Error(`${file} is missing its approved insertion marker.`);
    html = html.replace(insertionMarker, `${insertionMarker}\n${block}`);
  }
  fs.writeFileSync(absolute, html);
}

for (const product of products) fs.writeFileSync(filePath(product), productPage(product));

replaceManagedBlock('products.html', 'BATCH02_PRODUCTS_START', 'BATCH02_PRODUCTS_END', products.map(card).join('\n'), '<!-- EXPANDED_PRODUCTS_START -->');
for (const [categoryFile, categoryProducts] of Object.entries(Object.groupBy(products, item => item.categoryFile))) {
  replaceManagedBlock(categoryFile, 'BATCH02_PRODUCTS_START', 'BATCH02_PRODUCTS_END', categoryProducts.map(card).join('\n'), '<!-- EXPANDED_PRODUCTS_START -->');
}
const sitemapRows = products.map(product => `<url><loc>${pageUrl(product)}</loc><lastmod>2026-08-26</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`).join('\n');
replaceManagedBlock('sitemap.xml', 'BATCH02_SITEMAP_START', 'BATCH02_SITEMAP_END', sitemapRows, '</urlset>');
console.log(`Generated ${products.length} Batch 02 product pages and managed catalog entries.`);
