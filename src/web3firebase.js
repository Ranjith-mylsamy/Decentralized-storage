import { Web3Storage } from 'web3.storage';
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

    const totalSize = file.size;
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
