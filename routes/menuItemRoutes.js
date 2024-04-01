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




module.exports = router

