const express = require('express')
const router = express.Router()

const MenuItem = require('../Models/MenuItem')

// Saved Menue Item
router.post('/', async (req, res) => {
    try {
        //data of body
        const data = req.body
        //Create the new Person using the Mongoose model
        const newMenuItem = new MenuItem(data)

        const response = await newMenuItem.save();
        console.log('data saved ')
        res.status(200).json(response)


    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

//Get All Menu Items Data
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data feched')
        res.status(200).json(data)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

router.get('/:taste', async (req, res) => {
    try {

        const taste = req.params.taste;
        console.log()
        if (taste == 'sweet' || taste == 'spicy' || taste == 'sour') {
            const data = await MenuItem.find({ taste: taste })
            console.log('Data Fetched')
            res.status(200).json(data.length == 0 ? 'data not found' : data)

        }
        else {
            res.status(404).json({ error: 'Use Wrong Parameter' })

        }


    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


// update menu Item

router.put('/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const updatedMenuData = req.body
        const response = await MenuItem.findByIdAndUpdate(id, updatedMenuData, {
            new: true,
            runValidators: true
        })

        if (!response) {
            return res.status(404).json({ error: "Menu Not Found" })
        }
        console.log('Menu Item Updated')
        res.status(200).json(response)


    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })

    }
})

// Delete Menu Item

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const response = await MenuItem.findByIdAndDelete(id)
        if (!response) {
            return res.status(404).json({ error: "Menu Item not found" })
        }
        console.log('menue item deleted')
        res.status(200).json('Menue Item Deleted')

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })

    }
})



module.exports = router

