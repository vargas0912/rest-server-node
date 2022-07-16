const  { Schema, model} = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const StateSchema = Schema(
    {
        id_sql: {
            type: Number,
            require: [true, 'Id is required']
        },
        name: {
            type: String,
            require: [true, 'The name is required']
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

StateSchema.methods.toJSON = function() {
    const {__v, ...state} = this.toObject();

    return state;
}

StateSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = model('State', StateSchema);