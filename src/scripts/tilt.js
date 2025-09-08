export function enableTilt(root=document){
  const max=10;
  root.querySelectorAll('.card[data-tilt]').forEach(card=>{
    card.addEventListener('pointermove',(e)=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX - r.left)/r.width;
      const y=(e.clientY - r.top)/r.height;
      const rx=(y-.5)*-2*max, ry=(x-.5)*2*max;
      card.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    });
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
}
