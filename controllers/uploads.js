const { fileUploadFunc } = require("../helpers/");

const uploadFile = async (req, res = response) => {
  
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({ msg: 'No files were uploaded.'  });

      return;
    }
  
    if (!req.files) {
      res.status(400).json({ msg: 'No files were uploaded.' });

      return;
    }

    try {     
      const pathFile = await fileUploadFunc(req.files, undefined, 'images' );
  
      res.json({
        name: pathFile
      })
    } catch (msg) {
      res.status(400).json({
        msg
      })
    }

           
    
}


module.exports  = {
  uploadFile  
}