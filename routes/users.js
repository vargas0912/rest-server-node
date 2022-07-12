const { Router } = require('express');
const { check } = require('express-validator');


const { usersGet, usersPut, usersPost, usersDelete, usersPatch } = require('../controllers/users');
const { validRole, emailExists, findUserById } = require('../helpers/db-validators');

const {
    validate,
    validateJWT,
    isAdminRole,
    includeRole
} = require('../middlewares');



const router = Router();


router.get('/', usersGet);

router.put('/:id',[
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom(findUserById),
    check('role').custom(validRole),
    validate
], usersPut);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Passowrd must contain six characteres or more').isLength({min: 6 }),
    check('email', 'Email is invalid').isEmail(),
    check('email').custom(emailExists),
    ////check('role', 'Invalid role').isIn(['Admin', 'User']),    
    check('role').custom(validRole),
    validate
],usersPost);

router.delete('/:id',[    
    validateJWT,    
    //isAdminRole, //! Fuerza a que el role sea Admin...
    includeRole('Admin', 'Ventas'),
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom(findUserById),
    validate
], usersDelete);

router.patch('/', usersPatch);



module.exports = router;