export function ripple(root = document) {
  root.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('pointerdown', e => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty('--rx', `${e.clientX - rect.left}px`);
      button.style.setProperty('--ry', `${e.clientY - rect.top}px`);
      button.classList.add('is-rippling');
      setTimeout(() => button.classList.remove('is-rippling'), 280);
    });
  });
}
