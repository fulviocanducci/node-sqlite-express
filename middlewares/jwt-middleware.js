const auth = require('../auth/auth');

const jwt_verify = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const decodedToken = auth.verifyToken(token);
            if (decodedToken) {
                resolve(decodedToken);
            } else {
                reject(error);
            }    
        } catch (e) {
            reject(e);
        }        
    });
}
const jwt = (req, res, next) => {
    let token = req.header('authorization') 
        ? req.header('authorization').replace('Bearer ', '') 
        : req.query.token;        
    jwt_verify(token)
        .then((decodedToken) =>
        {            
            req.user = decodedToken.user
            next();
        })
        .catch((err) =>
        {
            res.status(400)
                .json({error: err, message: "Invalid auth token provided."});
        });
}

module.exports = jwt;