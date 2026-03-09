/* Certifications page — lazy load fallback polish */
document.querySelectorAll('.cert-thumb img, .spec-thumb img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const placeholder = img.nextElementSibling;
    if (placeholder) placeholder.style.display = 'flex';
  });
});
