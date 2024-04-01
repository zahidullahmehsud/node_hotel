const mongoose = require('mongoose')


// Define MongoDB Connection String / Url
const mongoURL = "mongodb://localhost:27017/hotels"

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