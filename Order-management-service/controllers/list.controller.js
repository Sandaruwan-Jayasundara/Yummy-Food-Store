const List = require('../models/list.model');

// Add  a  new list

const addList = async (req, res) => {

    if (req.body) {
        const list = new List(req.body);
        try {
            const newList = await list.save();
            res.status.json(newList);

        } catch (err) {
            res.status(400).json({message: err.message})
        }
    }
}


// Get all the lists

const getList = async (req, res) => {
    try {
        const lists = await List.find({});
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}


// Edit the list name

const editListName = async (req, res) => {
    if (req.params.id) {
        const list = List.findById(req.params.id);
        if (req.body.name != null) {
            list.name = req.body.name;
        }
        try {
            const updatedList = await list.save();
            res.status(200).json(updatedList)

        } catch (err) {
            res.status(400).json({message: err.message})
        }

    }
}


// Remove topping from list

const removeAToppingFromList = async (req, res) => {
    if (req.params.id) {
        try {
            const newList = await List.update({
                _id: req.params.id
            }, {
                $pull: {
                    toppings: req.body.id
                }
            });
            res.status(200).json(newList);
        } catch (err) {
            res.status(400).json({message: err.message})
        }

    }


}


module.exports={

    addList,
    getList,
    editListName,
    removeAToppingFromList
}