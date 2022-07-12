const  { Schema, model} = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const CitySchema = Schema(
    {
        id_sql: {
            type: Number,
            require: [true, 'Id is required']
        },
        name: {
            type: String,
            required: [true, 'The name is required']
        },
        id_state : {
            type: Number,
            require: [true, 'Id state is required']
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

CitySchema.methods.toJSON = function() {
    const {__v, deleted, ...city} = this.toObject();

    return city;
}

CitySchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = model('City', CitySchema);