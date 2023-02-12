const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const getCipherKey = require('./getCipherKey');

function decrypt({ file, password }) {
  // First, get the initialization vector from the file.

  // Once we’ve got the initialization vector, we can decrypt the file.
    const cipherKey = getCipherKey(password);
    const readStream = fs.createReadStream(file);
    const decipher = crypto.createDecipher('aes256', cipherKey);
    const unzip = zlib.createUnzip();
    const writeStream = fs.createWriteStream(file + '.unenc');

    readStream
      .pipe(decipher)
      .pipe(unzip)
      .pipe(writeStream);
}
decrypt({ file: './video.mp4.enc', password: 'dogzrgr8' });