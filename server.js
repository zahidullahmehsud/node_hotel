const express = require('express')
const app = express()
const db = require('./db.js')
var bodyParser = require('body-parser')


app.use(bodyParser.json())   // req.body
const PORT = 3000;






app.get('/', function (req, res) {
    res.send('WELCOME to Hotel')
})

app.get('/categories', function (req, res) {
    res.send('Tech , Sports , News , Finance')
})

//Import all router Files
const peronRoutes = require('./routes/personRoutes.js')
const menuItemRoutes = require('./routes/menuItemRoutes.js')

app.use('/person', peronRoutes)
app.use('/menuitem', menuItemRoutes)




app.listen(PORT, () => {
    console.log('Server is listening on Port', PORT)
})
