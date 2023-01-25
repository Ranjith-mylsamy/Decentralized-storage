let icon=document.getElementById("signout");
var user=1;
if(user==1){
    icon.classList.add('fa-arrow-right-from-bracket');
}
else{
    icon.classList.remove('fa-arrow-right-from-bracket');
}
function callbackName(response) {
    document.getElementById('visits').innerText = response.value;
}
