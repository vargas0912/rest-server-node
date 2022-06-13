const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validate } = require('../middlewares/validateUser');


const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),    
    check('password', 'Passowrd is required').not().isEmpty(),
    validate
],login );

module.exports = router;