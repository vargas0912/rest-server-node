
const { Router } = require('express');
const { check } = require('express-validator');
const { getCities, getCitiesByState, searchCities } = require('../controllers/cities');

const router = Router();

router.get('/', getCities);

router.get('/:idEstado', getCitiesByState);

router.get('/:idEstado/:q', searchCities); // Buscar por estado y por name (regex)


module.exports = router;