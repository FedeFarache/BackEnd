require('mongoose');
const Usr = require ('../models/user');


const addUser = async (name, lastname, email, password) => {
    
    await Usr.findOne({ email: email });
    let existUser = null;
    console.log(existUser);
    if(existUser==null) {

        const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');
        
        const usr = new Usr(
            {
                name: name,
                lastname:lastname,
                email: email,
                password:cryptoPass,
            }
        );

        let user = await usr.save(); 
        console.log("usuario nuevo");
        console.log(user);
        return { user }; 

    }else{
        return false;
    }
}   

const getAllUsers = async (limit,offset) => {

    const users = await Usr.find({}).limit(limit).skip(offset);

    return users;
}

const getUser = async(id) => {

    const user = await Usr.findById(id);

    // await Usr.findOne({ _id: req.params.id })

    return user;
}

const editUser = async(user) => {

    const result = await Usr.findByIdAndUpdate(user._id,user,{new:true});

    return result;
}

const deleteUser = async(id) => {

    const result = await Usr.findByIdAndDelete(id);

    return result;
}


module.exports = { addUser, getAllUsers, getUser, editUser, deleteUser }