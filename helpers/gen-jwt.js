const jwt = require('jsonwebtoken');


const genJWT = ( uid = '') => {
    return new Promise( (resolve, reject)=> {
         const payload = { uid };

         jwt.sign( payload, process.env.PRIVATEKEY, {
             expiresIn: '4h'
         }, (err, token) => {

            if ( err ) {
                console.log(err);
                reject("Token canot generate");
            } else {
                resolve(token);
            }
         })
    })
}

module.exports = {
    genJWT
}