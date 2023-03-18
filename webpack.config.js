const path = require('path')

module.exports = {
    mode:'development',
    entry:['./src/web3firebase.js','./src/firebase.js'],
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    watch:true,
    experiments: {
        topLevelAwait: true
      }
}