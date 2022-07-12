
const { Router } = require('express');
const { check } = require('express-validator');
const { getStates } = require('../controllers/states');

const router = Router();

router.get('/', getStates);


module.exports = router;