const toggle = document.getElementById("langToggle")
function setLanguage(lang){
const elements = document.querySelectorAll("[data-en]")
for(const el of elements){
el.textContent = el.getAttribute(`data-${lang}`)
}
localStorage.setItem("lang",lang)
}
const savedLang = localStorage.getItem("lang") || "en"
setLanguage(savedLang)
if(toggle){
if(savedLang === "en") toggle.checked = true
toggle.addEventListener("change",()=>{
if(toggle.checked) setLanguage("en")
else setLanguage("fr")
})
}

(function(){
  const img = document.getElementById('cvImg');
  const download = document.querySelector('.cv .download'); // l'élément lien (mise à jour par setLang)
  const downloadBtn = document.getElementById('downloadBtn');
  const toggle = document.getElementById('langToggle');
  const langFR = document.getElementById('langFR');
  const langEN = document.getElementById('langEN');

  // éléments qui contiennent data-en / data-fr (nav, titres, bouton download...)
  const transEls = document.querySelectorAll('[data-en][data-fr]');

  const files = {
    fr: {
      img: 'assets/images/CVFR.jpg',
      pdf: 'cv/CVGameDevCodyTheardFR.pdf'
    },
    en: {
      img: 'assets/images/CVEN.jpg',
      pdf: 'cv/CVGameDevCodyTheardEN.pdf'
    }
  };

  function applyTranslations(lang){
    transEls.forEach(el=>{
      const text = (lang === 'en') ? el.dataset.en : el.dataset.fr;
      if(text !== undefined) el.textContent = text;
    });
  }

  function setLang(lang){
    const resource = files[lang] || files.fr;
    img.src = resource.img;
    download.href = resource.pdf;
    download.textContent = (lang === 'en') ? download.dataset.en : download.dataset.fr;
    localStorage.setItem('cvLang', lang);
    toggle.checked = (lang === 'en');
    applyTranslations(lang);
  }

  // téléchargement forcé via fetch + blob
  downloadBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = download.href;
    try {
      const res = await fetch(url, {cache: 'no-store'});
      if(!res.ok) throw new Error('Erreur réseau');
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = url.split('/').pop() || 'cv.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      // fallback : ouvrir dans un nouvel onglet si fetch échoue
      window.open(url, '_blank');
    }
  });

  // initialisation
  const saved = localStorage.getItem('cvLang');
  if(saved){
    setLang(saved);
  } else {
    setLang(toggle.checked ? 'en' : 'fr');
  }

  toggle.addEventListener('change', ()=> setLang(toggle.checked ? 'en' : 'fr'));
  langFR.addEventListener('click', ()=> setLang('fr'));
  langEN.addEventListener('click', ()=> setLang('en'));
})();
