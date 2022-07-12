const { request, response } = require("express");
const { State } = require("../models");


const getStates = async (req = request, res = response) => {

    const {limit = 32, from = 0}  = req.query;
    //const status = {status: true}

    const [ total, states ] = await Promise.all(
        [
            State.countDocuments()
                .skip(Number( from ))
                .limit(Number( limit )),            
            State.find()                   
                .skip(Number( from ))
                .limit(Number( limit ))
        ]
    )

    res.json({ total, states })
}

module.exports = { 
    getStates
}
