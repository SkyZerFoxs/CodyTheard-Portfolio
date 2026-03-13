
/* Slider simple par card : show/hide slides, boutons précédent/suivant */
document.querySelectorAll('.media-slider').forEach(slider => {
  const slides = Array.from(slider.querySelectorAll('.slide'));
  let idx = slides.findIndex(s => s.classList.contains('active'));
  if (idx < 0) idx = 0;

  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');

  function show(i) {
    slides.forEach((s, si) => s.classList.toggle('active', si === i));
    idx = i;
  }

  prevBtn.addEventListener('click', () => show((idx - 1 + slides.length) % slides.length));
  nextBtn.addEventListener('click', () => show((idx + 1) % slides.length));

  // optionnel : support clavier gauche/droite quand la souris est dessus
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });
  // rendre le slider focusable pour le clavier
  slider.tabIndex = 0;
});
