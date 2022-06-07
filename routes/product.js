
const { Router } = require('express');
const { check } = require('express-validator');
const { addProduct, getProducts, getProduct, modifyProduct, deleteProduct } = require('../controllers/product');
const { findProductById, productExists } = require('../helpers/db-validators');

const { validateJWT, validate, isAdminRole } = require('../middlewares');

const router = Router();

router.get('/', [
    validateJWT,
    validate
], getProducts);

router.get('/:id', [
    validateJWT,
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom( findProductById ),
    validate
], getProduct);

router.put('/:id', [
    validateJWT,
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom( findProductById ),
    check('name').custom( productExists ),
    validate
], modifyProduct);

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),   
    check('name').custom( productExists ),
    check('category', 'Category is invalid').isMongoId(), 
    validate
], addProduct);

router.delete('/:id', [
    validateJWT,    
    isAdminRole, //! Fuerza a que el role sea Admin...
    // includeRole('Admin', 'Ventas'),
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom(findProductById),
    validate
], deleteProduct);



module.exports = router;
