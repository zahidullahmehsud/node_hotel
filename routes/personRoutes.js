const express = require('express')
const router = express.Router()

const Person = require('../Models/Person')


// Person Parameterized API (END POINT)
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType // Extract the work type from the URL parameter
        if (workType == 'cheif' || workType == 'manager' || workType == 'waiter') {
            const data = await Person.find({ work: workType })
            console.log('data feched')
            res.status(200).json(data)

        } else {
            res.status(404).json({ error: 'invalid work type' })
        }

    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

// Saved Person Data in Database
router.post('/', async (req, res) => {
    try {
        //data of body
        const data = req.body
        //Create the new Person using the Mongoose model
        const newPerson = new Person(data)

        const response = await newPerson.save();
        console.log('data saved ')
        res.status(200).json(response)


    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

// Get Data of Person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data feched')
        res.status(200).json(data)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(id, updatedPersonData, {
            new: true,
            runValidators: true
        })

        if (!response) {
            return res.status(404).json({ error: 'Peron not found' })
        }

        console.log('data update')
        res.status(200).json(response)



    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internal error' })

    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const response = await Person.findByIdAndDelete(id)

        if (!response) {
            return res.status(404).json({ error: 'Person ID not found' })
        }
        console.log('Delete Successfully')
        res.status(200).json('deleted successfully')

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internal error' })
    }
})

module.exports = router