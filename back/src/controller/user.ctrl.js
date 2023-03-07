const user = require('../model/user.model');
const bcrypt = require('bcrypt')

//signup
exports.signup = async (req, res) => {
    try {
        const userEmail = await user.findOne({ Email: req.body.Email })

        if (userEmail) {
            res.status(409).json({
                message: "email is already exists",
                status: 409
            })
        } else {
            const data = await new user({
                Username: req.body.Username,
                Email: req.body.Email,
                PhoneNumber: req.body.PhoneNumber,
                Password: bcrypt.hashSync(req.body.Password, bcrypt.genSaltSync(8), null)
            })

            const result = await data.save();
            console.log("result", req.body.Password);
            res.status(201).json({
                message: "Registerastion Successfully",
                status: 201,
                data: result
            })
        }


    } catch (error) {
        console.log("--error--", error);
        res.status(500).json({
            message: "something went wrong , please try again",
            status: 500,
            error: error.message
        })
    }
}


//login
exports.login = async (req, res) => {
    try {

        const email = req.body.Email

        const useremail = await user.findOne({ Email: email });

        if (useremail == null) {

            res.status(404).json({
                message: "User data not exists",
                status: 404
            })

        } else {

            const token = await useremail.generateauthtoken()

            bcrypt.compare(req.body.Password, useremail.Password, (err, data) => {

                if (data) {

                    res.cookie('jwt', token, {
                        expires: new Date(Date.now() + 300000000 * 3),
                        httpOnly: true
                    })

                    res.status(200).json({
                        message: "login successfully",
                        status: 200,
                        token: token
                    })

                } else {
                    console.log("sds",req.body.Password);
                    console.log("shdjs",useremail.Password);
                    res.status(401).json({
                        message: "Password dose not matched",
                        status: 401
                    })
                }
            })
        }

    } catch (error) {
        console.log("--error--", error);
        res.status(500).json({
            message: "something went wrong , please try again",
            status: 500,
            error: error.message
        })
    }
}


//how many user
exports.HowManyUser = async (req, res) => {
    try {

        const data = await user.find({}).count()
        if (data) {
            res.status(200).json({
                message: "Total user",
                status: 200,
                data: data
            })
        } else {
            res.status(200).json({
                message: "user data not found",
                status: 404,
                data:data
            })
        }

    } catch (error) {
        console.log("--error--", error);
        res.status(500).json({
            message: "something went wrong , please try again",
            status: 500,
            error: error.message
        })
    }
}