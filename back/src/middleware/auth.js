const user = require("../model/user.model");
const jwt = require("jsonwebtoken")
exports.verify = async (req, res, next) => {
    const token = req.headers['authorization']

    console.log(token);

    if (token) {
        console.log("token", token);
        const decoded = jwt.verify(token, process.env.JWT_SCREAT_KEY);
        const data = await user.findById({ _id: decoded._id })
        if(token==data.Token){

            req.user = data
            next();
        }
        else{
            res.status(401).json({
                msg: "UNAUTHORIZED USER",
                status: 401
            })
        }
        
    } else {
        res.status(403).json({
            msg: "forbidden",
            status: 403
        })
    }
}