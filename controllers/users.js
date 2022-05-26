const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const bcrypt = require('bcryptjs/dist/bcrypt');

//* Get paginado
const usersGet = async (req = request, res = response) => {  
    const {limit = 5, from = 0}  = req.query;
    const status = {status: true}

    // const user = await User.find(status)
    //     .skip(Number( from ))
    //     .limit(Number( limit ));

    const [total, users] = await Promise.all(
        [
            User.countDocuments(status),
            User.find(status)
                .skip(Number( from ))
                .limit(Number( limit ))
        ]
    )

    res.json({total, users})
}


const usersPut = async (req, res = response) => {

    const { id } = req.params;  
    const { password, google, email, ...rest } = req.body;
    
    // * Validar contra base de datos
    if ( password ) {
        const salt = bcrypt.genSaltSync();

        rest.password = bcryptjs.hashSync( password, salt)
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json(user)
}

const usersPost = async (req, res = response) => {
    ////const {nombre, edad} = req.body; 
    const { name, email, password, role} = req.body; 

    const user = new User( {name, email, password, role} );    

    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync( password, salt)

    user.save();  

    res.json(user)
}

const usersDelete = async(req, res = response) => {
    const { id } = req.params;  
    ////const user = await User.findByIdAndDelete( id );

    //* Simuladno el borrado logico
    const user = await User.findByIdAndUpdate(id, {status: false});

    res.json({                
        user
    })
}

const usersPatch = (_req, res = response) => {
    res.json({                
        'msg': 'PATCH API - Controller'
    })
}


module.exports = {
    usersGet,
    usersPut, 
    usersPost,
    usersDelete,
    usersPatch
} 