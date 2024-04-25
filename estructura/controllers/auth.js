require('mongoose');
const Usr = require('../models/user');
const jwt = require('jsonwebtoken');
const SK = process.env.SK;

const login = async(email,password) => {

    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');

    const  result = await Usr.findOne({ email: email, password:cryptoPass })
    
    if (result){
            // retorno token
            jwt.sign(Usr,SK,{expiresIn: "60m"})
            //const token = jwt.sign({ foo: 'bar' }, SK);    
            return token;
    }
    return null; // retorno 

}

module.exports = {login}