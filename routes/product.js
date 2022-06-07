
const { Router } = require('express');
const { check } = require('express-validator');
const { addProduct, getProducts, getProduct } = require('../controllers/product');
const { findProductById } = require('../helpers/db-validators');

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

router.put('/:id', (req, res) => {
    return res.json({
        msg: "put route"
    })
});

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),   
    check('category', 'Category is invalid').isMongoId(), 
    validate
], addProduct);

router.delete('/:id', (req, res) => {
    return res.json({
        msg: "delete route"
    })
});



module.exports = router;
