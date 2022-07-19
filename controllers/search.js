const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Category, Product, City } = require('../models');

const allowedCollections = [
    "categories",
    "cities",    
    "products",
    "productsByCategory",
    "roles",
    "users"
]

const searchUsers = async ( query = '', res = response) => {
    const isMongoId = ObjectId.isValid( query );

    if (isMongoId){
        const user = await User.findById(query);

        return res.json({
            results: (user) ? [ user ] : []
        })
    }

    const regex = new RegExp( query , 'i');

    const users = await User.find({ 
        $or: [{ name: regex }, {email: regex}],
        $and: [{status: true}]  
    });

    res.json({
        results: users
    })
}

const searchCategories = async (query = '', res = response) => {
    const isMongoId = ObjectId.isValid( query );

    console.log({valor: isMongoId, query: query});

    if (isMongoId){
        const category = await Category.findById(query);

        return res.json({
            results: (category) ? [ category ] : []
        })
    }

    const regex = new RegExp( query , 'i');

    const categories = await Category.find({name: regex, status: true });

    res.json({
        results: categories
    })

}

const searchProducts = async (query = '', res = response) => {
    const isMongoId = ObjectId.isValid( query );

    if (isMongoId){
        const product = await Product.findById( query ).populate('category', 'name');

        return res.json({
            results: (product) ? [ product ] : []
        })
    }

    const regex = new RegExp( query , 'i');

    const products = await Product.find({
        $or: [{ name: regex }, { description: regex}],
        $and:[{ status: true }]  
    }).populate('category', 'name');

    res.json({
        results: products
    })

}


const searchProductsByCategory = async (category = '', res = response) => {
    let mongoId = 'Hola';
    const isMongoId = ObjectId.isValid( category ); 
    
    if (isMongoId){
        mongoId = category;
        // const product = await Product.find( {
        //     category: ObjectId(category),
        //     status: true
        // } ).populate('category', 'name');

        // return res.json({
        //     resultados: (product) ? [ product ] : []
        // })
    }
    else{

        const name = category.toUpperCase();
    
        const categoryBd = await Category.findOne({ name });
    
        if (!categoryBd){
            return res.status(400).json({
                msg: 'Category  incorrect'
            });
        }

        mongoId = category._id;
    }

        console.log(mongoId);

    const products = await Product.find( {
        category: ObjectId(mongoId),
        status: true
    } ).populate('category', 'name');

    return res.json({
        results: (products) ? [ products ] : []
    })
}

const searchCities = async (query, res = response) => {
    const isMongoId = ObjectId.isValid( query );

    if (isMongoId){
        const city = await City.findById( query );

        return res.json({
            results: (city) ? [ city ] : []
        })
    }

    const regex = new RegExp( query , 'i');

    const cities = await City.find({ name: regex })

    res.json({
        results: cities
    })
}


const search = (req = request, res = response) => {

    const { collection, query } = req.params;

    if ( !allowedCollections.includes( collection )) {
        return res.status(400).json({
            msg: `The collections allowed are [${ allowedCollections }]`
        });
    }

    switch (collection) {
        case "categories":
            searchCategories(query, res);
            break;
        case "products":
            searchProducts(query, res);
            break;
        case "productsByCategory":
            searchProductsByCategory(query, res);
            break;
        case "users":
            searchUsers(query, res);
            break;
        case "cities":
            searchCities(query, res);
            break;
        default:
            res.status(500).json({
                msg: `Actually, '${ collection }' collection  is not allowed...`
            })
    }

    
}

module.exports = {
    search
}