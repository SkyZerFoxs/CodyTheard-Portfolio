const cards = document.querySelectorAll(".project-card")
cards.forEach(card=>{
const iframe = card.querySelector("iframe")
if(!iframe) return
card.addEventListener("mouseenter",()=>{
iframe.src += "?autoplay=1"
})
})
