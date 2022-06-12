const path = require('path');
const { v4: uuidv4 } = require('uuid');

const fileUploadFunc = ( files, allowedExtensions = ['png', 'jpg', 'gif'], folderName = '' ) => {

    return new Promise ( (resolve, reject) => {

        const { file } = files;    
    
        const fileCut = file.name.split('.');
    
        const extension = fileCut[ fileCut.length -1 ]; 
    
        //Extension validate    
 
        if ( !allowedExtensions.includes( extension ) ){
            return reject(`Extension .${ extension } not allowed. Only use [${ allowedExtensions }] `);         
        }
        const tempFileName = uuidv4() + '.' + extension;
      
        const uploadPath = path.join( __dirname, '../uploads/', folderName, tempFileName);
      
        file.mv(uploadPath, (err) => {
          if (err) {
            reject(err);            
          }
      
          resolve( tempFileName );
        });
    });
}

module.exports = {
    fileUploadFunc
}