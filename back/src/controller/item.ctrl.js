const item = require('../model/item.model');


//insert item
exports.insert = async (req, res) => {
    try {

        const data = await new item({
            Name: req.body.Name,
            Price: req.body.Price,
            Description: req.body.Description
        })

        const result = await data.save()

        res.status(201).json({
            message: "Item inserted successfully",
            status: 201,
            data: result
        })

    } catch (error) {
        console.log("--error--", error);
        res.status(500).json({
            message: "something went wrong , please try again",
            status: 500,
            error: error.message
        })
    }
}


//how many iteam
exports.HowManyitem = async (req, res) => {
    try {

        const data = await item.find({}).count()

        if (data) {
            res.status(200).json({
                message: "Total item",
                status: 200,
                data: data
            })
        } else {
            res.status(200).json({
                message: "item data not found",
                status: 404,
                data:0
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


//item get by id
exports.GetOneItem = async (req, res) => {
    try {

        const data = await item.findOne({ _id: req.params.id }).select('-__v')

        if (data) {

            res.status(200).json({
                message: "get one iteam data",
                status: 200,
                data: data
            })
        } else {
            res.status(404).json({
                message: "item data not found",
                status: 404
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


//item get all
exports.GetAll = async (req, res) => {
    try {

        const data = await item.find({}).select('-__v').sort({ createdAt: -1 })

        if (data[0]) {
            res.status(200).json({
                message: "get all item data",
                status: 200,
                data: data
            })
        } else {
            res.status(404).json({
                message: "item data not found",
                status: 404
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


//update
exports.UpdateData = async (req, res) => {
    try {
        const data = await item.findById({ _id: req.params.id })

        if (data) {

            const result = await item.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    Name: req.body.Name,
                    Price: req.body.Price,
                    Description: req.body.Description
                }
            }, {
                new: true,
                useFindAndModify: false
            })

            res.status(200).json({
                message: "item data updated successfully",
                status: 200
            })
        } else {
            res.status(404).json({
                message: "item data not found",
                status: 404
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

//delete
exports.DeleteData = async (req, res) => {
    try {

        const data = await item.findById({ _id: req.params.id })

        if (data) {
            const result = await item.findByIdAndDelete({ _id: req.params.id })

            res.status(200).json({
                message: "delete item data",
                status: 200
            })

        } else {
            res.status(404).json({
                message: 'item data not found',
                status: 404
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


//sorting ->price
exports.SortItemByPrice = async (req, res) => {
    try {

        const data = await item.find({}).sort({ Price: 1 }).select('-__v')

        if (data[0]) {
            res.status(200).json({
                message: 'get item data',
                status: 200,
                data: data
            })
        } else {
            res.status(404).json({
                message: "item data not found",
                status: 404
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



//sorting ->name
exports.SortItemByName = async (req, res) => {
    try {

        const data = await item.find({}).sort({ Name: 1 }).select('-__v')

        if (data[0]) {
            res.status(200).json({
                message: 'get item data',
                status: 200,
                data: data
            })
        } else {
            res.status(404).json({
                message: "item data not found",
                status: 404
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


