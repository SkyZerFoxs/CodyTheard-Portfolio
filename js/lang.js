
const toggle = document.getElementById("langToggle")

function setLanguage(lang){

const elements = document.querySelectorAll("[data-en]")



for(let el of elements){

el.textContent = el.getAttribute(`data-${lang}`)

}

localStorage.setItem("lang",lang)

}



const savedLang = localStorage.getItem("lang") || "en"

setLanguage(savedLang)



if(savedLang === "en"){

toggle.checked = true

}



toggle.addEventListener("change",()=>{

if(toggle.checked){

setLanguage("en")

}else{

setLanguage("fr")

}

})
