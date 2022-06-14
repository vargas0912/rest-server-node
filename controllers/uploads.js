const path = require('path');
const fs = require('fs');

// Require the Cloudinary library
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL);

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

const updateImageCloudinary = async( req, res = response) => {
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

  //Deletin g previous image  
  if ( model.img ){
    //TODO: limpiar imagen previa

    const nameArray = model.img.split('/');
    const name = nameArray[ nameArray.length -1 ]; 

    const [ public_id ] = name.split('.');

    cloudinary.uploader.destroy( public_id );
  }

  const { tempFilePath } = req.files.file;

  const { secure_url } = await cloudinary.uploader.upload( tempFilePath ) ;

  // const pathFile = await fileUploadFunc(req.files, undefined, collection );

  model.img = secure_url; 
  
  await model.save();
  

   res.json({ model });  
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

  //Deleting previous image
  try {
    if ( model.img ){
      const pathImage = path.join(__dirname, '../uploads', collection, model.img);

      if (fs.existsSync(pathImage)){
        fs.unlinkSync(pathImage);
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: 'Fatal error'
    })
  }

  const pathFile = await fileUploadFunc(req.files, undefined, collection );

  model.img = pathFile;
  
  await model.save();
  

  res.json({ model });  
}





/**
 * Get images from product or user
 * @param {request} req 
 * @param {response} res 
 * @returns response
 */
const getImage = async (req, res ) => {
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


  try {
    if ( model.img ){
      const pathImage = path.join(__dirname, '../uploads', collection, model.img);

      if (fs.existsSync(pathImage)){
        return res.sendFile( pathImage );
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: 'Fatal error' + error
    })
  }

  const placeHolder = path.join(__dirname, '../assets/no-image.jpg')

  res.sendFile (placeHolder);
}


module.exports  = {  
  getImage,
  uploadFile,
  updateImage,
  updateImageCloudinary  
}