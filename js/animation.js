
const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show")

}

})

})

const hiddenElements = document.querySelectorAll(".skill-card, .timeline-item")

hiddenElements.forEach((el)=>observer.observe(el))
