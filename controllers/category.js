const { request, response } = require("express");
const { Category } = require("../models");
const { aggregate, populate } = require("../models/user");



const getCategory = async ( req = request, res = response ) => {

    const { id } = req.params;

    const category = await Category.findById(id).populate('user', 'name');

    

    res.json({
        category
    })

   
}


const getCategories = async (req = request, res = response) => {

    const {limit = 5, from = 0}  = req.query;
    const status = {status: true}

    const [ total, categories ] = await Promise.all(
        [
            Category.countDocuments(status),            
            Category.find(status)   
                .populate('user', 'name')             
                .skip(Number( from ))
                .limit(Number( limit ))
        ]
    )

    res.json({ total, categories })
}

const addCategory = async (req= request, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });
    

    if ( categoryDB ){
        return res.status(400).json({
            msg: `The category ${ name }, already exists`
        })
    }
    
    // No esiste, seguimos    
    const data = {
        name,         
        user: req.user._id 
    };
     
    const newCategory = new Category( data );

    //Guardar
    newCategory.save();

    //Devolver objeto guardado
    res.status(200).json({
        newCategory
    })
}

const modifyCategory = async (req = request, res = response ) => {

    const { id } = req.params;  
    const { status, user, ...rest} = req.body;

    rest.name = rest.name.toUpperCase();
    rest.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, rest, {new: true});

    res.status(200).json({
        category
    })
}

const deleteCategory = async (req = request, res = response ) => {

    const { id } = req.params;  
 
    //* Simulando el borrado logico
    const category = await Category.findByIdAndUpdate(id, {status: false}, {new: true});

    ////const userAuth = req.user;

    res.status(200).json(category)
}


module.exports = {
    addCategory,
    modifyCategory,
    deleteCategory,
    getCategories,
    getCategory
}