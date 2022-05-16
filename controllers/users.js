const { response, request } = require('express');

const usersGet = (req = request, res = response) => {

    const { q, name, key } = req.query;

    res.json({                
        'msg': 'Get API - Controller',
        q, name, key
    })
}

const usersPut = (_req, res = response) => {

    const id = _req.params.id;

    res.json({                
        'msg': 'PUT API - Controller',
        id
    })
}

const usersPost = (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({                
        'msg': 'POST API - Controller',
        nombre,
        edad
    })
}

const usersDelete = (_req, res = response) => {
    res.json({                
        'msg': 'DELETE API - Controller'
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