const jsonwebtoken = require("jsonwebtoken");

module.exports.checkToken = ((res, req, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decod = jsonwebtoken.verify(token, 'LOST_AND_FOUND_SECRET');
    if (!decod) {
        next(new Error("Invalid token"))
    }
    next();
    
});