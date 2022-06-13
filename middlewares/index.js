
const validateJWT       = require('../middlewares/validate-jwt');
const validateRoles     = require('../middlewares/validate-roles');
const validateErrors    = require('../middlewares/validateUser');
const validateFile      = require('../middlewares/validate-file');


module.exports = {
    ...validateJWT,
    ...validateRoles,
    ...validateErrors,
    ...validateFile
}
 