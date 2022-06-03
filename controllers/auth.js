const { response, request } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { genJWT } = require('../helpers/gen-jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {       
        
        const user = await User.findOne({ email });

        if (!user){
            return res.status(400).json({
                msg: 'User or password incorrect'
            });
        }


        if ( !user.status ){
            return res.status(400).json({
                msg: 'User status is false'
            });
        }

        const validatePassowrd = bcryptjs.compareSync( password, user.password);

        if (! validatePassowrd){
            return res.status(400).json({
                msg: "Password invalid"
            });
        }

        const token = await genJWT(user.id);

        res.json(
            {
                user,
                token
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Contacte al administrador"
        });
    }
    
}

module.exports = {
    login
}