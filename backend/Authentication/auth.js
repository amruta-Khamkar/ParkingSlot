const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdas887";

const autenticateToken = async (req, res, next) => {
   if (req.headers['authorization']) {
        let authHeader = await req.headers['authorization'];
        authHeader = authHeader.split(' ');
        // console.log(authHeader)
        let token = authHeader[1]
        // console.log(token);
        if (token != undefined) {
            jwt.verify(token, jwtSecret, (err, data) => {
                if (err) {
                    res.json({ err: 1, message: "Token not valid" });
                }
                else {
                    // console.log("token valid")
                    next();
                }
            })
        }
    }
}
module.exports=autenticateToken