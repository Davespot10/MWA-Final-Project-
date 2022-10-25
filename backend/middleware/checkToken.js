const jsonwebtoken = require("jsonwebtoken");

module.exports.checkToken =  ((req,res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const secreat = process.env.SECRET_KEY
    
    try {
        const decod = jsonwebtoken.verify(token, secreat);
        console.log(decod);
        next();
    }
    catch (e) {
        throw new Error("Authontication Failed")

    }
 
}); 

