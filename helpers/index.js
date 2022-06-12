
const dbValidators  = require('./db-validators');
const JWTGenerator  = require('./gen-jwt');
const uploadFile    = require('./upload-file');


module.exports = {
    ...dbValidators,
    ...JWTGenerator,
    ...uploadFile
}