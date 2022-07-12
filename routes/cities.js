
const { Router } = require('express');
const { check } = require('express-validator');
const { getCities, getCitisByState } = require('../controllers/cities');

const router = Router();

router.get('/', getCities);

router.get('/:id_state', getCitisByState);


module.exports = router;