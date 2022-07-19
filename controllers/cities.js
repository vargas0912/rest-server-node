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

const getCitiesByState = async ( req = request, res = response ) => {

    const { idEstado } = req.params;    
    
    console.log(req.params);  

    const cities = await City.find({idEstado});

    res.json({
        cities
    })
   
}

const searchCities = async ( req = request, res = response ) => {

    const { idEstado, q } = req.params; 
    const regex = new RegExp( q , 'i');           

    const cities = await City.find({
        $and: [{ name: regex }, { idEstado }]
    });
    
    res.json({
        cities
    })
   
}


module.exports = { 
    getCities,
    getCitiesByState,
    searchCities
}
