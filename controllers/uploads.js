const { fileUploadFunc } = require("../helpers/");

const {User, Product} = require('../models');


const uploadFile = async (req, res = response) => {

    try {
      const pathFile = await fileUploadFunc(req.files, undefined, 'images' );
  
      res.json({ name: pathFile })
    } catch (msg) {
      res.status(400).json({ msg })
    }               
}

const updateImage = async( req, res = response) => {
  const { id, collection } = req.params;
  let model;

  switch ( collection ) {
    case 'users':
      model = await User.findById( id );

      if ( !model ) {
        return res.status(400).json({ msg: `User id ${ id } not exists` }); 
      }
      break; 

    case 'products':
      model = await Product.findById( id );

      if ( !model ) {
        return res.status(400).json({ msg: `Product id ${ id } not exists` }); 
      }
      break;
  
    default:
      return res.status(500).json({ msg: 'Not available...'});
  }

  const pathFile = await fileUploadFunc(req.files, undefined, collection );

  model.img = pathFile;
  
  await model.save();
  

  res.json({ model });  
}


module.exports  = {
  uploadFile,
  updateImage  
}