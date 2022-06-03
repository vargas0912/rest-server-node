
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');
const validateErrors = require('../middlewares/validateUser');

module.exports = {
    ...validateJWT,
    ...validateRoles,
    ...validateErrors
}
 