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
  if (user) {
    var userid = user.uid;
    if(userid != null)
    {
      var userval = 1 ;
    } 
    var location = window.location.pathname;
    if(location == "/Dstorage/uploadcontent.html")
    {
      var locationval = 1;
    }
    if((userval) && (locationval))
    {
    window.stop();
    }

//init services
const db = getFirestore()

//collection ref for user counting
const docRefuser = doc(db,"ListofCollection","users")

//regular updation of userid in database
async function usersCount (userid){
  await setDoc(doc(db, "ListofCollection", userid), {
    user:userid
  });
}
usersCount(userid)

const Usercoll = query(collection(db, "ListofCollection"));
const realtimeusercoll = onSnapshot(Usercoll, (querySnapshot) => {
const Usercollection = [];
querySnapshot.forEach((doc) => {
Usercollection.push(doc.data().users);
length = Usercollection.length
});
document.getElementById("userscount").innerHTML = length;
});

//collection ref
const colRef = collection(db, userid)

//queries
const q = query(colRef,orderBy('CREATEDAT','asc'))

//function to update table
// function updatetable(){
//   let row = `<tr>
//   <td>${data.NAME}</td>
//   <td id="copy">${data.CID}<i class="fa-regular fa-clipboard" id="clipboard"></i></td>
//   <td>${data.STORAGEPROVIDERS}</td>
//   <td>${data.SIZE}</td>
//   <td>${data.CREATED}</td>
//   <td><i class="fa-solid fa-download"></i></td>
//   <td><i class="fa-solid fa-trash" id="deletetd" onclick="deletedoc()"></i></td>
// </tr>`;
// let table = document.getElementById('tabledata');
// table.innerHTML += row;
// }

function nodata () {
  let row = `<tr>
                <td colspan="7"> no data found <td>
              <tr>`;
  let table = document.getElementById('tabledata');
  table.innerHTML += row;
}  

function resettable () {
  let row = `<tr id="datasample">
                <td colspan="7" id="wait">Content is loading ....</td>
              </tr>`
  let table = document.getElementById('tabledata');
  table.innerHTML += row;
}

function filestatusgetter (upload) {
  if(upload.pins.length==0)
  {
    return "Queued"
  }
  else
  {
    let status = "Pinned";
    upload.pins.forEach((Element) => {
      if(Element.status != "Pinned")
      {
        status = "Queued";
      }
    });
    return status;
  }
}

function filestorageprovider (filestatus,upload,CID) {
  if (filestatus == "Queued")
  {
    return filestatus
  }
  else 
  {
    if(upload.deals.length != 0)
    {
      let STORAGEPROVIDERS = "";
      upload.deals.forEach((provider) =>{
        setDoc(doc(colRef, CID), {
          DEAL_ID:provider.dealId
        })
        .then(()=>{
          console.log("Document has been added");
        })
        STORAGEPROVIDERS += provider.storageProvider ;
      })
      return STORAGEPROVIDERS; 
    }
    return filestatus; 
  }
}

//function to get pin status and deals of filecoin
async function listUploads (CID) {
  const client = makeStorageClient()
  for await (const upload of client.list()) {
    if(CID == upload.cid)
    {
    console.log(upload);
    let filestatus = filestatusgetter(upload);
    console.log(filestatus);
    let STORAGEPROVIDERS = filestorageprovider(filestatus,upload,CID)
    console.log(STORAGEPROVIDERS);
    await updateDoc(doc(colRef, CID), 
    {
      STORAGEPROVIDERS:STORAGEPROVIDERS
    })
    }
  }
}

//real time collection data
onSnapshot(q, (snapshot) => 
{
  let userid = []
  let CIDarray = []
  snapshot.docs.forEach((doc) => 
  {
    userid.push({ ...doc.data(),id:doc.id})
    let data = doc.data();
    if(data != null)
    {
        //function to reset table at every upload
      //   let flag_err;
      //   if(flag_err!=1)
      //   {
      //     console.log("I am here");
      //   flag_err = 1;
      // document.getElementById('datasample').remove();
      //   }
        // updatetable(data);
      // let flag;
      // if(flag==1){
      // document.getElementById('datam').remove();
      // }
      // flag=1;
      let row = `<tr id="datam">
                    <td>${data.NAME}</td>
                    <td id="copy">${data.CID}<i class="fa-regular fa-clipboard" id="clipboard"></i></td>
                    <td><a href="https://filfox.info/en/deal/${data.DEAL_ID}" target="blank">${data.STORAGEPROVIDERS} </a></td>
                    <td>${data.SIZE}</td>
                    <td>${data.CREATED}</td>
                    <td><i class="fa-solid fa-download"></i></td>
                    <td><i class="fa-solid fa-trash" id=${data.CID}></i></td>
                </tr>`;
    let table = document.getElementById('tabledata');
    table.innerHTML += row;
    CIDarray.push(data.CID);
   }
    else
    {
      nodata();
    }
  })
  CIDarray.forEach((datacid)=>{
    document.getElementById(datacid).addEventListener("click",function (e) {
      deletedoc(e.target);
      console.log(e.target);
    })
  })
  console.log(userid);
})

document.getElementById('dataloader').remove();
function getAccessToken () {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc1Yjc3RThhNmRCMTNlNjhmZThlMUMwMzEwMDk4QUNlNEZFN2RBNWEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzYxOTk5Nzk1MDEsIm5hbWUiOiJ3ZWIzIn0.IUPdIPd94UXhLK8HWzyeZ7rDLFtzj2DWmAlm0t8LDkM";
    return token
}
function makeStorageClient () {
    return new Web3Storage({ token: getAccessToken() })
}

const upload = document.getElementById("fileupload");

upload?.addEventListener('click',(e)=>{
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
async function retrieveFiles (rootCid)
{
  const client = makeStorageClient();
  const res = await client.get(rootCid); // Web3Response
  const files = await res.files();      // Web3File[]
    for (const file of files) 
    {
      const info = await client.status(rootCid);
      console.log(`value 1 :${info.cid} value 2:${info.dagSize} ${info.created}`);
          //adding documents
          await updateDoc(doc(colRef, rootCid), 
          {
            SIZE:formatBytes(file.size),
            NAME:file.name,
            CREATED:info.created.slice(0,9),
            STORAGEPROVIDERS:'Sample'
          })
      console.log(`${file.cid} ${file.name} ${file.size}`);
    }
}

async function storefilesinW3andFirebase()
{
  const file = document.querySelector('input[type=file]').files;
  const length = file.length;
  if(length>0)
  {
    const CID = await StoreFiles(file);

    //adding documents
    await setDoc(doc(colRef, CID), {
      CID:CID,
      CREATEDAT:serverTimestamp(),
      NAME:"filename"
    })
    .then(()=>{
      console.log("Document has been added");
    })
    console.log(`file is stored successfully ${CID}`);
    let rootCid = CID;
    console.log(`${rootCid} :added to retrieve files`);
    const rCID = retrieveFiles (rootCid);
  }
};

//delete doc
function deletedoc(element){
  console.log("clicked");
}

// // Get the delete table data
// function deletedocfile(element) {

//   var deletedocelement = document.getElementById("deletetd").innerText;
//   console.log(`delete CID copied: ${deletedocelement}`);

//   //copy the text inside the text field
//   navigator.clipboard.writeText(deletedocelement);

//   //Alert the copied text
//   alert("copied the table data: " + deletedocelement);

//   // deleting documents
//   const deleteCid = deletedocelement;
//   const docRef = doc(db ,userid ,deleteCid)
//   deleteDoc(docRef)
//   .then(()=>{
//     console.log("Document has been deleted");
//   })
// }

// deleting documents
// const deleteW3Data = document.getElementById('deletetd');
// deleteW3Data?.addEventListener('click',(e)=>{
//   e.preventDefault()
//   console.log("clicked");
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
copy?.addEventListener('click',(e)=>{
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
}
});