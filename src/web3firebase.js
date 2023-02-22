import { Web3Storage } from 'web3.storage';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore,collection,getDocs,
  addDoc,deleteDoc, doc
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
  console.log(`${file.cid} ${file.name} ${file.size}`);
}
const info = await client.status(rootCid);
console.log(`value 1 :${info.cid} value 2:${info.dagSize} ${info.created}`);
}

async function storefilesinW3andFirebase(){
    const file = document.querySelector('input[type=file]').files;
    const length = file.length;
    if(length>0)
    {
    const CID = StoreFiles(file);
    console.log(`file is stored successfully ${CID}`);
    }
    else{
        let rootCid = "bafybeiemkp7jp2vawckbpnijvdtnlkzltyfzib34zwxq76am3mqpxya6eu";
        const rCID = retrieveFiles (rootCid);
        console.log("Please select the File");
    }
};

//firebase part
const app = initializeApp(firebaseConfig);

//init services
const db = getFirestore()
//collection ref
const colRef = collection(db,'W3Data')
//get collection data
getDocs(colRef).then((snapshot)=>{
  let W3Data = []
  snapshot.docs.forEach((doc)=>{
    W3Data.push({ ...doc.data(), id: doc.id})
  })
  console.log(W3Data);
})
.catch(err=>{
  console.log(err.message);
})
//adding documents
addDoc(colRef,{
  userId:Ranjith,
  CID:Cid,
})
.then(()=>{
  console.log("Document has been added");
})
//deleting documents
const deleteW3Data = document.querySelector('.delete');
deleteW3Data.addEventListener('click',(e)=>{
  e.preventDefault()
  const docRef = doc(db,'W3Data','Enter the Id')
  deleteDoc(docRef)
  .then(()=>{
    console.log("Document has been deleted");
  })
})