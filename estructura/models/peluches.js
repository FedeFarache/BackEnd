const { ObjectId } = require('bson');
const mongoose = require ('mongoose');
const { userInfo } = require('os');
const Schema = mongoose.Schema;
const pelucheSchema = new Schema({
    
    animal:{
        type : String,
        required : true,
    },
    color:{
        type : String,
        required : true,
    },
    accesorio:{
        type : String,
        required : true,
    },
    creador : {
        type : String,
        required : true,
    }


})

const Peluche = mongoose.model('peluche',pelucheSchema);
module.exports = Peluche;