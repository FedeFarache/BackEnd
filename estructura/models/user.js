const { ObjectId } = require('bson'); 
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const usrSchema = new Schema({
    
    
    name:{
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
        index: {unique: true}
    },
    password:{
		type: String,
		required:true
	},
    arregloIdPeluches:{
		type: Array,
		required:true,
        default: [null]
	}
}, 
{ timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id; //no devolver id
        delete object.password; //no devolver password
    }
});


const Usr = mongoose.model('usr',usrSchema);
module.exports = Usr;