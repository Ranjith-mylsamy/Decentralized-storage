// code to toggle navbar
document.querySelector("#menu").addEventListener("click",()=>{
    document.querySelector("nav").classList.toggle("nav-toggle");
    document.querySelector("#menu").classList.toggle("fa-times");
})