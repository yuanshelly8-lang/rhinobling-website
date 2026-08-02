const waNumber='8615270582230';
const queryParams=new URLSearchParams(location.search);
const incomingAttribution={source:queryParams.get('utm_source')||queryParams.get('source')||document.referrer||'direct',medium:queryParams.get('utm_medium')||'',campaign:queryParams.get('utm_campaign')||''};
if(incomingAttribution.source!=='direct') sessionStorage.setItem('rhinoAttribution',JSON.stringify(incomingAttribution));
const savedAttribution=(()=>{try{return JSON.parse(sessionStorage.getItem('rhinoAttribution'))||incomingAttribution}catch{return incomingAttribution}})();
const buildWhatsAppMessage=(product='custom rhinestone products',details={})=>{
 const sourceLabel=[savedAttribution.source,savedAttribution.medium,savedAttribution.campaign].filter(Boolean).join(' / ');
 const fields=['Hello RhinoBling, I would like a factory quotation.',`Product: ${product}`,details.quantity&&`Quantity: ${details.quantity}`,details.company&&`Company: ${details.company}`,details.country&&`Destination: ${details.country}`,details.packaging&&`Packaging: ${details.packaging}`,details.message&&`Requirements: ${details.message}`,sourceLabel&&`Source: ${sourceLabel}`,`Page: ${location.href}`].filter(Boolean);
 return `https://wa.me/${waNumber}?text=${encodeURIComponent(fields.join('\n'))}`;
};
const helloKittyMirrorCard=`
<article class="product featured-product">
 <a class="product-image-link" href="product-hello-kitty-rhinestone-mirror.html">
  <img src="assets/images/mirrors-00-hello-kitty-rhinestone-hand-mirror.webp" alt="Pink Hello Kitty rhinestone handheld cosmetic mirror for wholesale" loading="lazy">
 </a>
 <div class="product-body">
  <div class="product-kicker">BEST SELLER · CUSTOM DESIGN</div>
  <h3>Hello Kitty Rhinestone Hand Mirror</h3>
  <div class="meta"><span class="tag">MOQ 20 pcs</span><span class="tag">Authorization check</span></div>
  <div class="buy-specs"><div><small>Sample</small><b>Available</b></div><div><small>Colors</small><b>Custom</b></div><div><small>Packaging</small><b>Custom</b></div></div>
  <div class="product-actions"><a class="text-link" href="product-hello-kitty-rhinestone-mirror.html">View product 鈫?/a><a class="source-link" href="contact.html?product=hello-kitty-rhinestone-hand-mirror">Request quote</a></div>
 </div>
</article>`;
const extraDrinkware=[
 ['holiday-gingerbread-rhinestone-tumbler','drinkware-09-holiday-gingerbread-rhinestone-tumbler.webp','Holiday Gingerbread Rhinestone Tumbler','Seasonal design'],
 ['softball-rhinestone-tumbler','drinkware-10-softball-rhinestone-tumbler.webp','Softball Rhinestone Tumbler','Sports collection'],
 ['basketball-rhinestone-tumbler','drinkware-11-basketball-rhinestone-tumbler.webp','Basketball Rhinestone Tumbler','Sports collection'],
 ['football-rhinestone-tumbler','drinkware-12-football-rhinestone-tumbler.webp','Football Rhinestone Tumbler','Sports collection'],
 ['pink-heart-rhinestone-tumbler-set','drinkware-13-pink-heart-rhinestone-tumbler-set.webp','Pink Heart Rhinestone Tumbler Set','Boutique bestseller'],
 ['pink-city-theme-crystal-tumbler-set','drinkware-14-pink-city-theme-crystal-tumbler-set.webp','Pink City Theme Crystal Tumbler Set','Custom artwork'],
 ['red-rodeo-rhinestone-tumbler-set','drinkware-15-red-rodeo-rhinestone-tumbler-set.webp','Red Rodeo Rhinestone Tumbler Set','Event collection'],
 ['silver-texas-crystal-tumbler-set','drinkware-16-silver-texas-crystal-tumbler-set.webp','Silver Texas Crystal Tumbler Set','Regional collection'],
 ['black-monogram-rhinestone-coffee-tumbler','drinkware-17-black-logo-rhinestone-coffee-tumbler.webp','Black Monogram Rhinestone Coffee Tumbler','Custom monogram'],
 ['black-monogram-crystal-coffee-tumbler','drinkware-18-black-logo-crystal-coffee-tumbler-side.webp','Black Crystal Coffee Tumbler','Travel drinkware'],
 ['red-monogram-rhinestone-coffee-tumbler','drinkware-19-red-logo-rhinestone-coffee-tumbler.webp','Red Monogram Rhinestone Coffee Tumbler','Custom monogram'],
 ['red-monogram-crystal-coffee-tumbler','drinkware-20-red-logo-crystal-coffee-tumbler-side.webp','Red Crystal Coffee Tumbler','Travel drinkware'],
 ['black-silver-custom-travel-cup','drinkware-21-black-silver-logo-travel-cup.webp','Black & Silver Custom Travel Cup','Private label'],
 ['red-silver-custom-travel-cup','drinkware-22-red-silver-logo-travel-cup.webp','Red & Silver Custom Travel Cup','Private label'],
 ['slim-neck-rhinestone-water-bottle','drinkware-23-slim-neck-rhinestone-water-bottle.webp','Slim-Neck Rhinestone Water Bottle','Bottle collection'],
 ['slim-neck-crystal-water-bottle','drinkware-24-slim-neck-crystal-water-bottle-side.webp','Slim-Neck Crystal Water Bottle','Bottle collection'],
 ['tapered-rhinestone-water-bottle','drinkware-25-tapered-rhinestone-water-bottle.webp','Tapered Rhinestone Water Bottle','Bottle collection'],
 ['tapered-crystal-water-bottle','drinkware-26-tapered-crystal-water-bottle-side.webp','Tapered Crystal Water Bottle','Bottle collection']
];
const drinkwareExpansionCards=extraDrinkware.map(([slug,image,title,theme])=>`
<article class="product">
 <a class="product-image-link" href="contact.html?product=${slug}"><img src="assets/images/${image}" alt="${title} for wholesale and custom orders" loading="lazy"></a>
 <div class="product-body"><div class="product-kicker">RHINOBLING PRODUCT COLLECTION</div><h3>${title}</h3>
  <div class="meta"><span class="tag">${theme}</span><span class="tag">OEM available</span></div>
  <div class="buy-specs"><div><small>MOQ</small><b>By design</b></div><div><small>Sample</small><b>Available</b></div><div><small>Packaging</small><b>Custom</b></div></div>
  <div class="product-actions"><a class="text-link" href="contact.html?product=${slug}">Get factory quote 鈫?/a><a class="source-link" href="category-drinkware.html">Drinkware</a></div>
 </div>
</article>`).join('');
const extraMirrors=[
 ['pink-silver-square-mirror-set','mirrors-09-pink-silver-square-mirror-set.webp','Pink & Silver Square Mirror Set','Shape options'],
 ['pink-heart-crystal-hand-mirror','mirrors-10-pink-heart-crystal-hand-mirror.webp','Pink Heart Crystal Hand Mirror','Boutique gift'],
 ['pink-heart-rhinestone-mirror-gift','mirrors-11-pink-heart-rhinestone-mirror-gift.webp','Pink Heart Rhinestone Mirror Gift','Gift packaging'],
 ['silver-pink-heart-mirror-pair','mirrors-12-silver-pink-heart-mirror-pair.webp','Silver & Pink Heart Mirror Pair','Color options'],
 ['silver-heart-crystal-detail','mirrors-13-silver-heart-crystal-detail.webp','Silver Heart Crystal Mirror Detail','Crystal finish'],
 ['silver-heart-mirror-front','mirrors-14-silver-heart-mirror-front.webp','Silver Heart Hand Mirror','Handheld mirror'],
 ['silver-heart-mirror-back','mirrors-15-silver-heart-mirror-back.webp','Full-Crystal Heart Mirror Back','Full rhinestone'],
 ['assorted-shape-crystal-mirror-set','mirrors-16-assorted-shape-crystal-mirror-set.webp','Assorted-Shape Crystal Mirror Set','Mixed shapes'],
 ['pink-silver-heart-mirror-set','mirrors-17-pink-silver-heart-mirror-set.webp','Pink & Silver Heart Mirror Set','Wholesale set'],
 ['pink-heart-mirror-pair','mirrors-18-pink-heart-mirror-pair.webp','Pink Heart Mirror Pair','Retail gift'],
 ['four-shape-rhinestone-mirror-set','mirrors-19-four-shape-rhinestone-mirror-set.webp','Four-Shape Rhinestone Mirror Set','Collection set'],
 ['pink-silver-round-mirror-set','mirrors-20-pink-silver-round-mirror-set.webp','Pink & Silver Round Mirror Set','Round mirror']
];
const mirrorExpansionCards=extraMirrors.map(([slug,image,title,theme])=>`
<article class="product">
 <a class="product-image-link" href="contact.html?product=${slug}"><img src="assets/images/${image}" alt="${title} for wholesale and custom orders" loading="lazy"></a>
 <div class="product-body"><div class="product-kicker">RHINOBLING PRODUCT COLLECTION</div><h3>${title}</h3>
  <div class="meta"><span class="tag">${theme}</span><span class="tag">OEM available</span></div>
  <div class="buy-specs"><div><small>MOQ</small><b>By design</b></div><div><small>Sample</small><b>Available</b></div><div><small>Packaging</small><b>Custom</b></div></div>
  <div class="product-actions"><a class="text-link" href="contact.html?product=${slug}">Get factory quote 鈫?/a><a class="source-link" href="category-mirrors.html">Mirrors</a></div>
 </div>
</article>`).join('');
document.querySelectorAll('[data-wa]').forEach(link=>{
 const product=link.dataset.product||new URLSearchParams(location.search).get('product')||'custom rhinestone products';
 link.href=buildWhatsAppMessage(product);
 link.addEventListener('click',()=>window.gtag?.('event','whatsapp_click',{product,page:location.pathname}));
});
document.querySelectorAll('[data-inquiry-form]').forEach(form=>{
 const selected=new URLSearchParams(location.search).get('product');
 if(selected){
  const select=form.querySelector('[name="product"]');
  if(select&&!Array.from(select.options).some(o=>o.value===selected)) select.add(new Option(selected,selected,true,true));
  else if(select) select.value=selected;
 }
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(form));
  window.gtag?.('event','generate_lead',{product:data.product,quantity:data.quantity});
  window.open(buildWhatsAppMessage(data.product||'custom rhinestone products',data),'_blank','noopener');
 });
});
const toggle=document.querySelector('.menu-toggle');
toggle?.addEventListener('click',()=>{
 const menu=document.querySelector('.navlinks');
 const open=menu.classList.toggle('open');
 toggle.setAttribute('aria-expanded',String(open));
});
const prompt=document.querySelector('.wa-prompt');
if(prompt&&!sessionStorage.getItem('waPromptClosed')){
 setTimeout(()=>prompt.classList.add('show'),1800);
 prompt.querySelector('button')?.addEventListener('click',()=>{
  prompt.classList.remove('show');
  sessionStorage.setItem('waPromptClosed','1');
 });
}
