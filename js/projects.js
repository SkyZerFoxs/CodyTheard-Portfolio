
function playVideoOnHover(card){

const iframe = card.querySelector("iframe")

if(!iframe) return

card.addEventListener("mouseenter",()=>{

iframe.src += "?autoplay=1"

})

}

const cards = document.querySelectorAll(".project-card")

cards.forEach(playVideoOnHover)
