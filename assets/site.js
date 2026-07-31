
document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',e=>{
 e.preventDefault();
 const data=new FormData(form), product=data.get('product')||'custom rhinestone products', qty=data.get('quantity')||'not specified';
 window.open('https://wa.me/8615270582230?text='+encodeURIComponent(`Hello RhinoBling, I am interested in ${product}. Quantity: ${qty}. Please send MOQ, customization options and a factory quote.`),'_blank');
}));
document.querySelectorAll('.hero-banner').forEach(carousel=>{
 const slides=[...carousel.querySelectorAll('img')], dots=[...carousel.querySelectorAll('.banner-dots button')]; let current=0;
 const show=i=>{current=i;slides.forEach((s,n)=>s.classList.toggle('active',n===i));dots.forEach((d,n)=>d.classList.toggle('active',n===i))};
 dots.forEach((d,i)=>d.addEventListener('click',()=>show(i)));
 setInterval(()=>show((current+1)%slides.length),4500);
});
