const fs = require('fs');
const os = require('os');
const notes = require('./notes.js')
var _ = require('lodash')

console.log('notes  is loaded Successfully')

const age = 32;

function add(a, b) {
    return a + b
}

module.exports = {
    age,
    add
}




// var userInfo = os.userInfo()
// console.log(userInfo.username)

// fs.appendFile("FS.txt", 'My new Data\n', () => console.log('File Read Successfully'))

// a = 2;
// b = 3;
// var data = ['cat', 'dog', 'elephant', 23]

// var filerData = data.filter(checkAnimal)

// function checkAnimal(name) {
//     return (name > 20)
// }

// data.push('apple')
// console.log(filerData)
// console.log(data)
// console.log(data.keys)

// Import (varaibles and Function)  in Node JS
// const age = notes.age
// console.log('age is : ' + age)
// const result = notes.add(2, 90)
// console.log("Addition is :", result)

//Lodash 

const data = ['name', 'name', 'country', 1, 2, 1, 3, 4, 12, '2'];

var uniqueData = _.uniq(data)
console.log(uniqueData)