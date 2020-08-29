const mongoose = require('mongoose')

// created a task model
const Task = mongoose.model('task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean, 
        default: false
    }
})

module.exports = Task
