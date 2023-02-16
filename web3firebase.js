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
    value = StoreFiles(file);
    console.log(`file is stored successfully ${value}`);
};