const { request, response } = require("express");

const { Product, Category } = require('../models');


const getProduct = async ( req = request, res = response ) => {

    const { id } = req.params;

    // ? Verificar si se requiere incluir el nombre del usuario relacionado
    const product = await Product.findById(id).populate('user', 'name').populate('category', 'name');    

    res.json({
        product
    })
   
}


const getProducts = async (req = request, res = response) => {

    const {limit = 5, from = 0}  = req.query;
    const status = {status: true}

    const [ total, products ] = await Promise.all(
        [
            Product.countDocuments(status),            
            Product.find(status)   
                .populate('user', 'name')       //! Agregar el user relacionado (name)      
                .populate('category', 'name')
                .skip(Number( from ))
                .limit(Number( limit ))
        ]
    )

    res.json({ total, products })
}


const addProduct = async (req= request, res = response) => {
    const name = req.body.name.toUpperCase();
    const idCategory = req.body.category;

    const productDB = await Product.findOne({ name });
    
    if ( productDB ){
        return res.status(400).json({
            msg: `The product ${ name }, already exists`
        })
    }

    const category = await Category.findById( idCategory ) ;

    if ( !category){
        return res.status(400).json({
            msg: 'Category not exists'
        })
    }
    
    // No esiste, seguimos    
    const data = {
        name,         
        user: req.user._id ,
        price: req.body.price,
        category: category._id,
        description: req.body.description,        
    };
     
    const newProduct = new Product( data );

    //Guardar
    newProduct.save();

    //Devolver objeto guardado
    res.status(200).json({
        newProduct
    })
}

module.exports = {
    addProduct, 
    getProducts,
    getProduct
}