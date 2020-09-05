const express = require('express')
const Task = require('../models/task')
const router = express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {

    try{
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        res.status(500).send()  
    }
})

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
    // Object.keys returns array of given objects
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValid = updates.every((update) => {
        allowedUpdates.includes(updates)
    })

    if(!isValid){
        return res.status(400).send({
            "error": "Invalid updates!"
        })
    }

    try{
        // returns the new modified object and runsValidation according to the model's schema
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task)
            return res.status(404).send()
        
        res.send(task)
    } catch(e){
        res.status(400).send(e)   
    }
})


router.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user)
            return res.status(404).send()

        res.send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router