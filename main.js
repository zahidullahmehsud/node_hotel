var prompt = require('prompt-sync')()


var age = prompt('Enter Your age')

if (age < 18) {
    console.log('You are get 20% Discount')

}

if (age >= 18 && age <= 65) {
    console.log('Normal Ticket Price Applies')
}
if (age >= 65) {
    console.log('You get 30% senior discount')
}

