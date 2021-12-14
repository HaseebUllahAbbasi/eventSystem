const express = require('express') 
const app = new express()
var cors = require('cors')
app.use(express.json())
const personRoutes = require('./Routers/PersonRoutes')
const eventRoutes = require('./Routers/EventRoutes')
const taskRoutes = require('./Routers/TasksRoutes')
const noteRoutes = require('./Routers/NotesRouter')

app.use(cors())

app.use(eventRoutes)
app.use(personRoutes)
app.use(taskRoutes)
app.use(noteRoutes)

module.exports = app;