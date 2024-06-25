const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const token = req.headers.authorization; // bearer token
    const words = token.split(" "); // ["Bearer", "token"]
    const jwtToken = words[1]; // token
    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
         // It checks that the JWT token's signature is valid using the secret key (JWT_SECRET). This ensures that the token was not tampered with after it was signed.
        // If the signature is valid, it decodes the payload of the token. The payload contains the claims (information) that were encoded into the token when it was created.
        //decoded example
        /*
        {
          "userId": "12345",
          "username": "johndoe",
          "iat": 1620000000,
          "exp": 1620003600
        }

        */
        if (decodedValue.username) {
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    } catch(e) {
        res.json({
            msg: "Incorrect inputs"
        })
    }
    
}

module.exports = adminMiddleware;