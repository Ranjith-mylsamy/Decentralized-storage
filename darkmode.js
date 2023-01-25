const element = document.getElementById("light");
//creates lightmode
if(localStorage.getItem('lightMode')===null){
    localStorage.setItem('lightMode',"false");
}
//creates link in html
const link=document.createElement('link');
link.rel= 'stylesheet';
document.getElementsByTagName('HEAD')[0].appendChild(link);
//
checkStatus()

 function checkStatus(){
    if(localStorage.getItem('lightMode')==="true")
    {
        element.classList.remove('fa-moon');
        element.classList.add('fa-sun');
        link.href='./light.css';
    }
    else
    {
        element.classList.remove('fa-sun');
        element.classList.add('fa-moon');
        link.href='./style.css';
    }
 }
 function changeStatus(){
    if(localStorage.getItem('lightMode')==="true"){
        localStorage.setItem('lightMode',"false");
        element.classList.remove('fa-sun');
        element.classList.add('fa-moon');
        link.href='./style.css';
    }
    else
    {
        localStorage.setItem('lightMode',"true");
        element.classList.remove('fa-moon');
        element.classList.add('fa-sun');
        link.href='./light.css';
    }
 }
