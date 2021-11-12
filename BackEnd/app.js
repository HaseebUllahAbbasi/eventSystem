const express = require('express') 
const app = new express()
app.use(express.json())
const personRoutes = require('./Routers/PersonRoutes')
const eventRoutes = require('./Routers/EventRoutes')

app.use(eventRoutes)
app.use(personRoutes)

module.exports = app;