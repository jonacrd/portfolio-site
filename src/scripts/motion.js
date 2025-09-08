export function enableButtonRipple(root=document){
  root.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('pointerdown', (e)=>{
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--x', `${e.clientX - r.left - r.width/2}px`);
      btn.style.setProperty('--y', `${e.clientY - r.top - r.height/2}px`);
      btn.classList.add('is-rippling');
      setTimeout(()=>btn.classList.remove('is-rippling'), 400);
    });
  });
}
export function revealOnScroll(root=document){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(el=>{
      if(el.isIntersecting){ el.target.classList.add('is-in'); io.unobserve(el.target); }
    });
  },{threshold:.12});
  root.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}
export function applyStagger(containerSel='.grid'){
  document.querySelectorAll(containerSel).forEach(grid=>{
    let i=0;
    grid.querySelectorAll('.reveal').forEach(el=>{
      el.style.transitionDelay = `${100 + i*60}ms`; i++;
    });
  });
}
