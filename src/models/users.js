const mongoose = require('mongoose')
const validator = require('validator')

// created a user model

// using validator module to validate email
// use simple logic to validate if age >= 0
const user = mongoose.model('user', {
    name: {
        type: String, 
        required:true,
        trim: true
    },
    email: {
        type: String,    
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("Invalid email")
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Cannot contain "password" ')
            }
        }
    },
    age: {
        type: Number, 
        default: 0,
        validate(value){
            if(value < 0)
                throw new Error('Age must be positive')
        }
    }
})

module.exports = user
