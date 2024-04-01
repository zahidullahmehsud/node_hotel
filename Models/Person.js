const mongoose = require('mongoose')


//Define Schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['cheif', 'manager', 'waiter'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    }

})

const Person = mongoose.model('Person', personSchema);

module.exports = Person;