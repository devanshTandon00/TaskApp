const express = require('express')
require('./db/mongoose')
const User = require('./models/users')
const Task = require('./models/task')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')
const app = express()

const port = process.env.PORT || 3000

// returns middleware that only parses json
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})

