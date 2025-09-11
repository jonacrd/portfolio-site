export function enableFilters() {
  const chips = [...document.querySelectorAll('.chip')];
  const cards = [...document.querySelectorAll('#cards [data-tags]')];
  
  const applyFilter = (tag) => {
    cards.forEach(card => {
      const tags = card.dataset.tags?.split(',') || [];
      card.style.display = (tag === 'all' || tags.includes(tag)) ? '' : 'none';
    });
  };
  
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      applyFilter(chip.dataset.filter);
    });
  });
  
  // Activate first chip by default
  if (chips[0]) {
    chips[0].click();
  }
}
