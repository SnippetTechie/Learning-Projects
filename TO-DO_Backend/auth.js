//file for creating middleware for auth routes

const jwt = require("jsonwebtoken");
const JWT_SECRET = "Sec3etKEy"

function auth (req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token , JWT_SECRET);

    if(decodedData){
        req.userId = decodedData.id;  
        next();
    }
    else{
        res.status(403).send({
            "message": "Invalid Credencials"
        });
    }
}

module.exports = {
    auth,
    JWT_SECRET
}

