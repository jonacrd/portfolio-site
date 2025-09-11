export function parallax(selector = '[data-parallax]') {
  const root = document.querySelector(selector);
  if (!root) return;
  
  const layers = [...root.querySelectorAll('[data-depth]')];
  
  root.addEventListener('pointermove', (e) => {
    const rect = root.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    layers.forEach(element => {
      const depth = Number(element.dataset.depth || 0.1);
      element.style.transform = `translate3d(${x * -12 * depth}px, ${y * -12 * depth}px, 0)`;
    });
  });
  
  root.addEventListener('pointerleave', () => {
    layers.forEach(element => element.style.transform = '');
  });
}
