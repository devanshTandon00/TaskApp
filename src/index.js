const express = require('express')
require('./db/mongoose')
const User = require('./models/users')
const Task = require('./models/task')

const app = express()

const port = process.env.PORT || 3000

// returns middleware that only parses json
app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try{
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

// two option of handling find
// 1. use promise .then() .catch() structure
// 2. use callback functions
app.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch(e){
        res.status(500).send()
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((error) => {
    //     res.status(500).send()
    // })
    
    // User.find({}, (result, error) => {
    //     if(error)
    //        res.send(users)
    //     else
    //         console.log(result)
    // })    
})

// we use if condition since mongoDB returns an empty query result as a sucess as well
app.get('/users/:id', async (req,res) => {

    try{
        const user = await User.findById(req.params.id)
        if(!user)
            return res.status(404).send()
        res.send(user)
    } catch (e){
        res.status(500).send
    }
})

app.patch('/users/:id', async (req, res) => {
    // returns an array of elements of req.body 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
        return res.status(400).send({
            "error": 'Invalid Updates!'
        })
    }


    // check if there is no user since mongoDB is gonna consider it as a sucess so we need to handle that
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if(!user){
            return res.status(404).send()
        }

        // update old user and send modified user
        res.send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch(e){
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {

    try{
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        res.status(500).send()  
    }
})

app.get('/tasks/:id', async (req, res) => {
    const id = req.params.id

    try{
        const task = await Task.findById(id)
        if(!task)
            res.status(404).send()
        res.send(task)
    } catch(e){ 
        res.status(500).send()
    }   
})

/**
 * Challenge:
 * Write HTTP patch request to update tasks by ID
 * 
 */

app.patch('/tasks/:id', async (req, res) => {
    try{
        const task = Task.findByIdAndUpdate(req)
    } catch(e){

    }
})


app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})

