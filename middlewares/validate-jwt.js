const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg: 'No token'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.PRIVATEKEY);

        const user = await User.findById( uid );
        
        if ( !user ){
            return res.status(401).json({
                msg: "User not exists"
            });
        }

        //* Verificar si no tiene borrado logico
        if ( !user.status) {
            return res.status(401).json({
                msg: "User has been logical deleted"
            });
        }

        req.user = user;

        next();
    } catch (error) {
        //console.log(error);
        
        res.status(401).json({
            msg: "Token invalid"
        });
    }        
}

module.exports = { validateJWT } 