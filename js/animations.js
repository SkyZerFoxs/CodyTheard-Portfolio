const observer = new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show")
}
})
})
const hidden = document.querySelectorAll(".skill-card,.timeline-item")
hidden.forEach(el=>observer.observe(el))