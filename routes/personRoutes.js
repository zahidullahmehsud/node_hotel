const express = require('express')
const router = express.Router()

const Person = require('../Models/Person')
const { jwtAuthMiddleware, generateToken } = require('../jwt')


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

// Signup Person Route
router.post('/signup', async (req, res) => {
    try {
        //data of body
        const data = req.body
        //Create the new Person using the Mongoose model
        const newPerson = new Person(data)

        const response = await newPerson.save();

        const payload = {
            id: response.id,
            username: response.username
        }

        const token = generateToken(payload)
        console.log('token is ' + token)
        console.log('data saved ')
        res.status(200).json({ response: response, token: token })


    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

//Login Person route

router.post('/login', async (req, res) => {
    try {
        //Extract username and password from request body
        const { username, password } = req.body;

        //Find the user by username
        const response = await Person.findOne({ username: username })

        //if user does not exist or password is incorrect, return error
        if (!response || ! await response.comparePassword(password)) {
            return res.status(401).json({ error: 'invalid username or password' })
        }

        //Generate JWT token
        const payload = {
            id: response.id,
            username: response.username
        }

        const token = generateToken(payload)
        console.log('token is ' + token)

        //return token as a response
        res.status(200).json({ token: token })


    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })

    }
})

//Profile route

router.get('/profile', jwtAuthMiddleware, async (req, res) => {

    try {
        const userData = req.user;
        console.log('user data', userData)
        const user = await Person.findById(userData.id);
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'internal server error' })
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


// Update Function
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

//Delete Function
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