export function enableTilt(root = document) {
  const max = 8;
  root.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateX(${y * -max}deg) rotateY(${x * max}deg) translateZ(0)`;
    });
    el.addEventListener('pointerleave', () => el.style.transform = '');
  });
}