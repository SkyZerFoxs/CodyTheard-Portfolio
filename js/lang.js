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
  const TOGGLE_ID = "langToggle";
  const STORAGE_KEY = "lang";

  const toggle = document.getElementById(TOGGLE_ID);

  // applique la traduction sur tous les éléments [data-en][data-fr]
  function setLanguage(lang){
    const elements = document.querySelectorAll("[data-en][data-fr]");
    for(const el of elements){
      const value = el.getAttribute(`data-${lang}`);
      if (value !== null) el.textContent = value;
    }
    if(toggle) toggle.checked = (lang === "en");
    localStorage.setItem(STORAGE_KEY, lang);

    // --- mise à jour CV si présents ---
    try {
      if (typeof setCvResources === "function") setCvResources(lang);
    } catch(e){ /* safe guard */ }
  }

  // initialisation de base
  const savedLang = localStorage.getItem(STORAGE_KEY) || "en";
  setLanguage(savedLang);

  if(toggle){
    toggle.checked = (savedLang === "en");
    toggle.addEventListener("change", ()=> setLanguage(toggle.checked ? "en" : "fr"));
  }

  /* ------------------------------
     Bloc CV (protégé) : ne s'exécute
     que si les éléments existent.
     ------------------------------*/
  const cvImg = document.getElementById('cvImg');
  const downloadBtn = document.getElementById('downloadBtn'); // lien visible
  const downloadLinkInCv = document.querySelector('.cv .download'); // alternative
  const langFR = document.getElementById('langFR');
  const langEN = document.getElementById('langEN');

  const cvFiles = {
    fr: { img: 'assets/images/CVFR.jpg', pdf: 'cv/CVGameDevCodyTheardFR.pdf' },
    en: { img: 'assets/images/CVEN.jpg', pdf: 'cv/CVGameDevCodyTheardEN.pdf' }
  };

  function setCvResources(lang){
    const r = cvFiles[lang] || cvFiles.fr;
    if(cvImg) cvImg.src = r.img;
    const linkEl = downloadBtn || downloadLinkInCv;
    if(linkEl){
      linkEl.href = r.pdf;
      if(linkEl.dataset && linkEl.dataset.en && linkEl.dataset.fr){
        linkEl.textContent = (lang === 'en') ? linkEl.dataset.en : linkEl.dataset.fr;
      }
    }
  }

  // téléchargement forcé (sécurisé) : n'ajoute l'écoute que si l'élément existe
  if(downloadBtn){
    downloadBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = downloadBtn.href;
      try {
        const res = await fetch(url, {cache: 'no-store'});
        if(!res.ok) throw new Error('network');
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
        window.open(url, '_blank');
      }
    });
  }

  // lie boutons FR/EN si présents
  if(langFR) langFR.addEventListener('click', ()=> setLanguage('fr'));
  if(langEN) langEN.addEventListener('click', ()=> setLanguage('en'));

})();
