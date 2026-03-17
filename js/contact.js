// copie l'email et affiche le message localisé
(function () {
  const btn = document.getElementById('emailCopy');
  const msg = document.getElementById('copyMsg');
  if (!btn || !msg) return;

  // affiche l'email visible dans le bouton (accessible) selon la langue
  function getLang() {
    return localStorage.getItem('lang') || (document.getElementById('langToggle') && document.getElementById('langToggle').checked ? 'en' : 'fr') || 'en';
  }

  function texts(lang) {
    return {
      copied: lang === 'fr' ? 'Copié !' : 'Copied!',
      prompt: lang === 'fr' ? 'Copiez cette adresse e-mail' : 'Copy this email address',
      
      emailLabel: lang === 'fr' ? 'cody.theard1@gmail.com' : 'cody.theard1@gmail.com'
    };
  }

  function renderLang() {
    const lang = getLang();
    const t = texts(lang);
    btn.textContent = t.emailLabel;
  }

  // initial
  renderLang();

  // réagir aux changements de langue dans d'autres onglets
  window.addEventListener('storage', (e) => {
    if (e.key === 'lang' || e.key === 'cvLang') renderLang();
  });

  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = btn.dataset.email;
    const lang = getLang();
    const t = texts(lang);
    try {
      await navigator.clipboard.writeText(email);
      msg.textContent = t.copied;
      setTimeout(() => (msg.textContent = ''), 1800);
    } catch (err) {
      const fallback = window.prompt(t.prompt, email);
      if (fallback !== null) {
        msg.textContent = t.copied;
        setTimeout(() => (msg.textContent = ''), 1800);
      }
    }
  });
})();