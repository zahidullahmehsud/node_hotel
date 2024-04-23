const express = require('express')
const app = express()
const db = require('./db.js')
var bodyParser = require('body-parser')
require('dotenv').config()
const passport = require('./auth.js')



app.use(bodyParser.json())   // req.body
const PORT = process.env.PORT || 3000

//Middleware Function

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`)
    next()
}

app.use(logRequest)

app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local', { session: false })

app.get('/', function (req, res) {
    res.send('WELCOME to Hotel')
})



//Import all router Files
const peronRoutes = require('./routes/personRoutes.js')
const menuItemRoutes = require('./routes/menuItemRoutes.js')

app.use('/person', peronRoutes)
app.use('/menuitem', menuItemRoutes)



app.listen(PORT, () => {
    console.log('Server is listening on Port', PORT)
})
