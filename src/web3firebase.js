import { Web3Storage } from 'web3.storage';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore,collection,getDocs,
  addDoc,deleteDoc,doc,setDoc,
  onSnapshot,query,orderBy,updateDoc,
  serverTimestamp
} from 'firebase/firestore'


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

//init services
const db = getFirestore()

//collection ref
const colRef = collection(db,'W3Data')

//queries
const q = query(colRef,orderBy('CREATEDAT','asc'))

//real time collection data
onSnapshot(q, (snapshot) => {
  let W3Data = []
  snapshot.docs.forEach((doc) => {
    W3Data.push({ ...doc.data(),id:doc.id})
  })
  console.log(W3Data);
})

function getAccessToken () {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc1Yjc3RThhNmRCMTNlNjhmZThlMUMwMzEwMDk4QUNlNEZFN2RBNWEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzYxOTk5Nzk1MDEsIm5hbWUiOiJ3ZWIzIn0.IUPdIPd94UXhLK8HWzyeZ7rDLFtzj2DWmAlm0t8LDkM";
    return token
}
function makeStorageClient () {
    return new Web3Storage({ token: getAccessToken() })
}

const upload = document.getElementById("fileupload");
const reader = new FileReader();

upload.addEventListener('click',(e)=>{
    e.preventDefault();
    storefilesinW3andFirebase();
});

//function for storing the file,retry,cid and chunk size
async function StoreFiles (file) {
    const client = makeStorageClient();
    const onRootCidReady = cid => {
        console.log('uploading files with cid:', cid)
    }

    const totalSize = file[0].size;
    let uploaded = 0;
    const onStoredChunk = size => {
        uploaded += size
        const pct = 100 * (uploaded / totalSize)
        console.log(`Uploading... ${Math.floor(pct / 100) * 100}% complete`)
      }

    const CID = await client.put(file, {
        name: file.item(0).name,
        maxRetries: 3,
        onRootCidReady,
        onStoredChunk,
      });
    return CID;
}

//function for getting the file
async function retrieveFiles (rootCid){
const client = makeStorageClient();
const res = await client.get(rootCid); // Web3Response
const files = await res.files();      // Web3File[]
for (const file of files) {
  const info = await client.status(rootCid);
  console.log(`value 1 :${info.cid} value 2:${info.dagSize} ${info.created}`);
      //adding documents
      await updateDoc(doc(colRef, "Username"), {
        SIZE:formatBytes(file.size),
        NAME:file.name,
        CREATED:info.created.slice(0,9)
      })
  console.log(`${file.cid} ${file.name} ${file.size}`);
}
}

async function storefilesinW3andFirebase(){
    const file = document.querySelector('input[type=file]').files;
    const length = file.length;
    if(length>0)
    {
    const CID = await StoreFiles(file);

    //adding documents
    await setDoc(doc(colRef, "Username"), {
      CID:CID,
      CREATEDAT:serverTimestamp(),
      NAME:"filename"
    })
    .then(()=>{
      console.log("Document has been added");
    })
    console.log(`file is stored successfully ${CID}`);
    }
    else{
        let rootCid = "bafybeifhl76id3tzuxrdbzkbk3ek7wavygmztcobkaauxhif4c4m5dvwc4";
        const rCID = retrieveFiles (rootCid);
        console.log("Please select the File");
    }
};


// deleting documents
// const deleteW3Data = document.querySelector('.delete');
// deleteW3Data.addEventListener('click',(e)=>{
//   e.preventDefault()
//   const docRef = doc(db,'W3Data','Enter-the-Id')
//   deleteDoc(docRef)
//   .then(()=>{
//     console.log("Document has been deleted");
//   })
// })

// function to format size
function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

//copy to clipboard
const copy = document.getElementById("clipboard");
copy.addEventListener('click',(e)=>{
    e.preventDefault();
    copyText();
});

function copyText() {
  // Get the text field
  var copyText = document.getElementById("copy").innerText;
  console.log("Text copied");

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText);

  // Alert the copied text
  alert("Copied the text: " + copyText);
}