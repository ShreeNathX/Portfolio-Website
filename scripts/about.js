/* About page JS — skill pill hover enhancement */
document.querySelectorAll('.skill-category').forEach(cat => {
  cat.addEventListener('mouseenter', () => {
    cat.querySelectorAll('.badge').forEach((b, i) => {
      setTimeout(() => b.style.transform = 'scale(1.05)', i * 30);
    });
  });
  cat.addEventListener('mouseleave', () => {
    cat.querySelectorAll('.badge').forEach(b => b.style.transform = '');
  });
});
