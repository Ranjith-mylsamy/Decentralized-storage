import {
    StoreFiles,
    retrieveFiles,
    checkStatus
} from "./web3";
const upload = document.getElementById("fileupload");
const reader = new FileReader();
upload.addEventListener('click',(e)=>{
    e.preventDefault();
    storefilesinW3andFirebase();
});
function storefilesinW3andFirebase(){
    const file = document.querySelector('input[type=file]').files;
    const length = file.length;
    if(length>0)
    {
    const CID = StoreFiles(file);
    console.log(`file is stored successfully ${CID}`);
    }
    else{
        console.log("Please select the File");
    }
};