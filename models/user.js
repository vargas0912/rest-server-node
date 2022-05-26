const  { Schema, model} = require('mongoose');


const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Mail is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    photo: {
        type: String
        ////required: [true, 'Password is required']
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['Admin', 'User', 'Ventas']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJson = function() {
    const {__v, password, ...user } = this.toObject();
    return user;
}


module.exports = model('Usuario', UserSchema) ;