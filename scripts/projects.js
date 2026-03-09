/* ============================================
   PROJECTS PAGE — Filter functionality
   ============================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const cats = card.dataset.category || '';
      const show = filter === 'all' || cats.includes(filter);

      if (show) {
        card.style.display = '';
        // re-trigger reveal
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.classList.remove('visible');
        card.style.display = 'none';
      }
    });
  });
});
