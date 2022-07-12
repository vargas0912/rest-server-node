
const { Router } = require('express');
const { check } = require('express-validator');

const { 
    addCategory, 
    getCategories, 
    getCategory, 
    modifyCategory, 
    deleteCategory 
} = require('../controllers/category');

const { findCategoryById, categoryExists } = require('../helpers/db-validators');
const { validateJWT, validate, isAdminRole } = require('../middlewares');


const router = Router();

router.get('/', [
    validateJWT,
    validate
], getCategories);

router.get('/:id',[
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom( findCategoryById ),
    validate
], getCategory);

router.put('/:id', [
    validateJWT,
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom( findCategoryById ),
    check('name').custom( categoryExists ),
    validate
], modifyCategory);

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),    
    validate
], addCategory);

router.delete('/:id', [
    validateJWT,    
    isAdminRole, //! Fuerza a que el role sea Admin...
    // includeRole('Admin', 'Ventas'),
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom(findCategoryById),
    validate
], deleteCategory);



module.exports = router;
