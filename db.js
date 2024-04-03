const mongoose = require('mongoose')
require('dotenv').config()

// Define MongoDB Connection String / Url
//const mongoURL = process.env.MONGODB_URL_LOCAL

const mongoURL = process.env.MONGODB_URL
console.log('Connection String' + mongoURL)

// set up the mongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get the Default Connection
const db = mongoose.connection;

//Define the Event Listener for Database Connection

db.on('connected', () => {
    console.log('connected to MongoDB server')
})

db.on('error', (err) => {
    console.log('mongoDB connection error', err)
})

db.on('disconnected', () => {
    console.log('MongoDB is Disconnected')
})

module.exports = {
    db
}