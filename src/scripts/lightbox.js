export function enableLightbox(root = document) {
  const shots = [...root.querySelectorAll('.shot')];
  const lightbox = root.querySelector('#lightbox');
  const bigImage = lightbox?.querySelector('#big');
  
  if (!shots.length || !lightbox) return;
  
  let currentIndex = 0;
  
  const openLightbox = (index) => {
    currentIndex = index;
    bigImage.src = shots[currentIndex].dataset.full || shots[currentIndex].src;
    lightbox.removeAttribute('hidden');
  };
  
  const closeLightbox = () => lightbox.setAttribute('hidden', '');
  
  // Add click listeners to shots
  shots.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });
  
  // Close button
  lightbox.querySelector('[data-close]').addEventListener('click', closeLightbox);
  
  // Keyboard navigation
  window.addEventListener('keydown', e => {
    if (lightbox.hasAttribute('hidden')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') openLightbox((currentIndex + 1) % shots.length);
    if (e.key === 'ArrowLeft') openLightbox((currentIndex - 1 + shots.length) % shots.length);
  });
}
