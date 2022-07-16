const { request, response } = require("express");
const { Client }            = require("../models");


const getClients = async (req = request, res = response) => {

    const {limit = 1000, from = 0}  = req.query;
    //const status = {status: true} 

    const [ total, data ] = await Promise.all(
        [
            Client.countDocuments()
                .skip(Number( from ))
                .limit(Number( limit )),            
            Client.find()                   
                .skip(Number( from ))
                .limit(Number( limit ))
        ]
    )

    res.json({ total, data })
    //!  verificar si regresar un objeto o directamente el arreglo de los clientes
    //res.json(clients) 
}

module.exports = { 
    getClients
}
