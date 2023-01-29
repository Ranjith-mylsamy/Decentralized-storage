// function callbackName(response) {
//     document.getElementById('visits').innerText = response.value;
// }
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut} from "firebase/auth";
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
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    createUserWithEmailAndPassword(auth , email , password)
     .then((cred)=>{
        console.log('user created:',cred.user)
        signupForm.reset()
     })
     .catch((err) => {
        console.log(err.message)})
  })
  
  //logging in and out
  const logoutButton = document.getElementById("signout");
  logoutButton.addEventListener('click',() => {
    signOut(auth)
    .then(()=>{
        console.log('The user is logged out');
    })
    .catch((err) => {
        console.log(err.message)
    })
  })
  const loginForm = document.querySelector('.form-container sign-in-container');
  loginForm.addEventListener('submit',(e) => {
    e.preventDefault()
  })