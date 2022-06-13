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
    img: {
        type: String
        ////required: [true, 'Password is required']
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['Admin', 'User', 'Ventas']
    },
    status: {
        type: Boolean
    },
    google: {
        type: Boolean,
        default: true
    }
});

UserSchema.methods.toJSON = function() {
    const {__v, password, _id, ...user } = this.toObject();

    user.uid = _id;
    return user;
}


module.exports = model('Usuario', UserSchema) ;