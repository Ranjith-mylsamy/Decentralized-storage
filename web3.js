import { Web3Storage } from 'web3.storage';
function getAccessToken () {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc1Yjc3RThhNmRCMTNlNjhmZThlMUMwMzEwMDk4QUNlNEZFN2RBNWEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzYxOTk5Nzk1MDEsIm5hbWUiOiJ3ZWIzIn0.IUPdIPd94UXhLK8HWzyeZ7rDLFtzj2DWmAlm0t8LDkM";
    return token
}
function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}
//function for storing the file,retry,cid and chunk size
export async function StoreFiles (file){
    const client = makeStorageClient();
    const onRootCidReady = rootCid => {return rootCid};
    const onStoredChunk = chunkSize => {return chunkSize};
    const rootCid = await client.put(file, {
        name: file.name,
        maxRetries: 3,
        onRootCidReady,
        onStoredChunk,
      });
    return rootCid;
}
//function for getting the file
export async function retrieveFiles (rootCid){
    const res = await client.get(rootCid); // Web3Response
    const files = await res.files(); // Web3File[]
    for (const file of files) {
        return file;
    }
}
//To get status of file (date, size and storage provider)
export async function checkStatus(rootCid){
    const info = await client.status(rootCid);
    return info.cid,info.dagSize,info.created;
}
//To 

// function info(){
//     return{
//         cid:"you",
//         dagsize:112,
//         created:"12/3/2004",
//     }
// }
// let ucid=info().cid;
// let udagsize=info().dagsize;
// let ucreated=info().created;
// console.log(ucid,udagsize,ucreated);