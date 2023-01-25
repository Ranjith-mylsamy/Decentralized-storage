let loader=document.querySelector(".sec-06")
// var styleWebkit=document.createElement("style");
// styleWebkit.appendChild(document.createTextNode("html::-webkit-scrollbar{width:1rem;}html::-webkit-scrollbar-track{background:var(--blue2);}html::-webkit-scrollbar-thumb{background:var(--gradient);border-radius:10px;}"));
// document.getElementsByTagName("head")[0].appendChild(styleWebkit);
let scrollbar=document.getElementsByTagName("html");
scrollbar.style.overflowY="hidden";
window.onload = function(){
    loader.style.display="none";
}
scrollbar.tagName.style
//setting time out is the solution 