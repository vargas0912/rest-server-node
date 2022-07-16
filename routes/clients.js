
const { Router } = require('express');
const { check } = require('express-validator');
const { getClients } = require('../controllers/client');

const router = Router();

router.get('/', getClients);

module.exports = router;