const router = require('express').Router()
const { verify } = require("../middleware/auth")
const {
    insert,
    HowManyitem,
    GetOneItem,
    GetAll,
    UpdateData,
    DeleteData,
    SortItemByPrice,
    SortItemByName

} = require("../controller/item.ctrl");

router.post('/insert',verify, insert);
router.get('/HowManyItem',verify, HowManyitem);
router.get("/GetOneItem/:id",verify, GetOneItem);
router.get('/GetAll', GetAll);
router.put('/update/:id',verify, UpdateData);
router.delete('/delete/:id', DeleteData)
router.get("/SortItemByPrice", SortItemByPrice);
router.get('/SortItemByName', SortItemByName)

module.exports = router;