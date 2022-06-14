const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFile, updateImage, getImage, updateImageCloudinary } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');
const { validate, validateFile } = require('../middlewares');


const router = Router();

router.post('/', validateFile, uploadFile);

router.put('/:collection/:id', [
    validateFile,
    check('id', 'Id must be mongoID valid').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'])),
    validate
], updateImageCloudinary);
// ], updateImage);

router.get('/:collection/:id', [    
    check('id', 'Id must be mongoID valid').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'])),
    validate
], getImage);


module.exports = router; 