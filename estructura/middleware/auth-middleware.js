const jwt = require('jsonwebtoken');
const SK = process.env.SK;

const verify = (req,res,next) =>{

    try {
        const decode =  jwt.verify(req.headers.Authorization,SK);
        next();
    }catch(error){
        res.status(401).send("No autorizado");
    }     
}

module.exports = {verify}