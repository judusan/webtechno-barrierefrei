const express = require('express');
const router = express.Router();
const FridgeItem = require('../models/fridgeItems');


// get all items
router.get('/', async(req, res) => {
    const allFridgeItems = await FridgeItem.find();
    console.log(allFridgeItems);
    res.send(allFridgeItems);
});

// post one item
router.post('/', async(req, res) => {
    const newFridgeItem = new FridgeItem({
        name: req.body.name,
        quantity: req.body.quantity,
        date: req.body.date
    })
    await newFridgeItem.save();
    res.send(newFridgeItem);
});

// post one item via id
router.get('/:id', async(req, res) => {
    try {
        const fridgeItem = await FridgeItem.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(fridgeItem);
    } catch {
        res.status(404);
        res.send({
            error: "Item does not exist!"
        });
    }
})

// update one item
router.patch('/:id', async(req, res) => {
    try {
        const fridgeItem = await FridgeItem.findOne({ _id: req.params.id })

        if (req.body.name) {
            fridgeItem.name = req.body.name
        }

        if (req.body.quantity) {
            fridgeItem.quantity = req.body.quantity
        }

        if (req.body.date) {
            fridgeItem.date = req.body.date
        }

        await FridgeItem.updateOne({ _id: req.params.id }, fridgeItem);
        res.send(fridgeItem)
    } catch {
        res.status(404)
        res.send({ error: "Item does not exist!" })
    }
});

// delete one item via id
router.delete('/:id', async(req, res) => {
    try {
        await FridgeItem.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Item does not exist!" })
    }
});

module.exports = router;