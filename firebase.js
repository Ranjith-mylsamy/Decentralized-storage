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
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCmvBcRblmn4O0yx1UAetfPnyMRgqC8C-4",
    authDomain: "web3storage-5f50b.firebaseapp.com",
    databaseURL: "https://web3storage-5f50b-default-rtdb.firebaseio.com",
    projectId: "web3storage-5f50b",
    storageBucket: "web3storage-5f50b.appspot.com",
    messagingSenderId: "709180782228",
    appId: "1:709180782228:web:b479d09d2055d2dc54e681",
    measurementId: "G-ELP48BVPP3"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  //signing users up
  const signupForm = document.querySelector('.sign-up-container')
  signupForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    createUserWithEmailAndPassword(auth , email , password)
     .then((cred)=>{
        console.log('user created:',cred.user)
        signupForm.reset()
     })
     .catch((err) => {
        console.log(err.message)})
  })