const  { Schema, model} = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const ClientSchema = Schema(
    {
        id_sql:         {type: Number, require: [true, 'Id is required']},
        branches_id_sql:{type: Number, require: [true, 'Location is required']},
        first_name:     {type: String, require: [true, 'The first name is required']},
        second_name:     {type: String},
        name:           {type: String, require: [true, 'The name is required']},
        rfc:            {type: String},
        address:        {type: String},
        reference:      {type: String},
        phone:          {type: String},
        email:          {type: String}
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


ClientSchema.methods.toJSON = function() {
    const {deleted, _id, key, cities, ...clients} = this.toObject();

    return clients;
}

ClientSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = model('Client', ClientSchema);