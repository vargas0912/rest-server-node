
const Role = require('../models/role');
const User = require('../models/user');

const validRole = async(role = '') => {
    const roleExists = await Role.findOne( { role })

    if (! roleExists ) {
        throw new Error(`The role ${ role } not found`);
    }
}

// * Validar si el email ya existe
const emailExists = async(email = '') => {
    const  emailexists  = await User.findOne({ email });

    if (emailexists) { 
        throw new Error(`The mail ${ email } already exists`);
    }
} 



// * Validar si el email ya existe
const findUserById = async(id) => {
    const  existsId  = await User.findById(id);

    if (!existsId) { 
        throw new Error(`The id ${ id } not exists`);
    }
} 

module.exports = {
    validRole,
    emailExists, 
    findUserById
}