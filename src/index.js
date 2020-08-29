const express = require('express')
require('./db/mongoose')
const User = require('./models/users')
const Task = require('./models/task')

const app = express()

const port = process.env.PORT || 3000

// returns middleware that only parses json
app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)
    
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// two option of handling find
// 1. use promise .then() .catch() structure
// 2. use callback functions
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.status(500).send()
    })
    
    // User.find({}, (result, error) => {
    //     if(error)
    //        res.send(users)
    //     else
    //         console.log(result)
    // })    
})

// we use if condition since mongoDB returns an empty query result as a sucess as well
app.get('/users/:id', (req,res) => {
    User.findById(req.params.id).then((user) => {
        if(!user)
            return res.status(404).send()
        res.send(user)
    }).catch((e) => {
        res.status(500).send
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send()  
    })
})

app.get('/tasks/:id', (req, res) => {
    const id = req.params.id
    Task.findById(id).then((task) => {
        if(!task)
            res.status(404).send()
    
        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})

