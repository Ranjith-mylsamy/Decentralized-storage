import { Web3Storage } from 'web3.storage';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore,collection,getDocs,
  addDoc,deleteDoc,doc,setDoc,
  onSnapshot,query,orderBy,updateDoc,
  serverTimestamp,
  getDoc , getCountFromServer
} from 'firebase/firestore'
import { onAuthStateChanged,getAuth } from './firebase.js';
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


//firebase part
const app = initializeApp(firebaseConfig);

//assigning authentication
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if(user){
        console.log(window.location)
        window.location = '/index.html'
    }
})