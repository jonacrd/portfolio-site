export function revealOnScroll(root = document) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  
  root.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

export function applyStagger(containerSel = '.grid') {
  document.querySelectorAll(containerSel).forEach(grid => {
    let i = 0;
    grid.querySelectorAll('.reveal').forEach(el => {
      el.style.transitionDelay = `${100 + i * 60}ms`;
      i++;
    });
  });
}

