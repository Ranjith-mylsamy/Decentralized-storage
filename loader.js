// var styleWebkit=document.createElement("style");
// styleWebkit.appendChild(document.createTextNode("html::-webkit-scrollbar{width:1rem;}html::-webkit-scrollbar-track{background:var(--blue2);}html::-webkit-scrollbar-thumb{background:var(--gradient);border-radius:10px;}"));
// document.getElementsByTagName("head")[0].appendChild(styleWebkit);
let loader=document.querySelector(".sec-06");
let scrollbar=document.getElementsByTagName("html");
window.onload = function(){
    loader.style.display="none";
    document.getElementsByTagName('html')[0].style.overflowY = "scroll";
}
//setting time out is the solution sample