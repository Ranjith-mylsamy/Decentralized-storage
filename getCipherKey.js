const crypto = require('crypto-js');
var sha256 = crypto.algo.SHA256.create();
value=getCipherKey("mySup3rC00lP4ssWord");
function getCipherKey(password) {
    const SHA256= sha256.update(password);
    var hash = SHA256.finalize();
    return hash.toString(crypto.enc.Hex);
  }
module.exports = getCipherKey;