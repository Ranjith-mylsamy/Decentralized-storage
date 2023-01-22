// code to toggle navbar
document.querySelector("#menu").addEventListener("click",()=>{
    document.querySelector("nav").classList.toggle("nav-toggle");
    document.querySelector("#menu").classList.toggle("fa-times");
})
let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

let querytext = id("text"),
    queryemail= id("email"),
    query     = id("query");

form.addEventListener("submit", (e) => {
e.preventDefaut();
engine(querytext,0,"Name cannot be blank");
engine(queryemail,1,"Email cannot be blank");
engine(query,2,"Query cannot be blank");
});

let engine = (id,serial,message) => {
    if(id.value.trim()==="") {
        errorMsg[serial].innerHTML = message;
        id.style.border = "2px solid red";
    }
    else 
    {
        errorMsg[serial].innerHTML="";
        id.style.border = "2px solid green";
    }
};