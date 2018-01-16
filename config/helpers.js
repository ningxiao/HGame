const path = require('path');
const projectRoot = path.resolve(__dirname, '../');
const helpers = {
    resolve: (filePath)=>{
        return path.resolve(filePath);
    }
}
module.exports = helpers;