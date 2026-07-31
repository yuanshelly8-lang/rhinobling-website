const waNumber='8615270582230';
const buildWhatsAppMessage=(product='custom rhinestone products',details={})=>{
 const fields=['Hello RhinoBling, I would like a factory quotation.',`Product: ${product}`,details.quantity&&`Quantity: ${details.quantity}`,details.company&&`Company: ${details.company}`,details.country&&`Destination: ${details.country}`,details.packaging&&`Packaging: ${details.packaging}`,details.message&&`Requirements: ${details.message}`,`Page: ${location.href}`].filter(Boolean);
 return `https://wa.me/${waNumber}?text=${encodeURIComponent(fields.join('\n'))}`;
};
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
