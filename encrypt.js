/*Importing necessary modules*/
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const crypto = require('crypto');

/*driver program*/
// const AppendInitVect = require('./appendInitVect');
const getCipherKey = require('./getCipherKey');

function Encrypt({ file, password }){
// const initVect = crypto.randomBytes(16);
const CIPHER_KEY = getCipherKey(password);
const readStream = fs.createReadStream(file);
const zip = zlib.createGzip();
const cipher = crypto.createCipher('aes256', CIPHER_KEY);
// const appendInitVect = new AppendInitVect(initVect);
const writeStream =fs.createWriteStream(path.join(file + ".enc"));
readStream
    .pipe(zip)
    .pipe(cipher)
    .pipe(writeStream);
}
Encrypt({ file: './video.mp4', password: 'dogzrgr8' });