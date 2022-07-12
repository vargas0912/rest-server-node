const { request, response } = require("express");
const { City } = require("../models");


const getCities = async (req = request, res = response) => {

    const {limit = 100, from = 0}  = req.query;
    //const status = {status: true}

    const [ total, cities ] = await Promise.all(
        [
            City.countDocuments()
                .skip(Number( from ))
                .limit(Number( limit )),            
            City.find()                   
                .skip(Number( from ))
                .limit(Number( limit ))
        ]
    )

    res.json({ total, cities })
}

const getCitisByState = async ( req = request, res = response ) => {

    const { id_state } = req.params;    
    
    const cities = await City.find({id_state});

    res.json({
        cities
    })
   
}


module.exports = { 
    getCities,
    getCitisByState
}
