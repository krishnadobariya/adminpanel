const router = require("express").Router();
const { verify } = require("../middleware/auth")
const {

    signup,
    login,
    HowManyUser

} = require('../controller/user.ctrl');

router.post('/singup', signup);
router.post('/login', login);
router.get('/HowManyUser',verify, HowManyUser);


module.exports = router;