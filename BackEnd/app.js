const express = require('express') 
const app = new express()
app.use(express.json())
const personRoutes = require('./Routers/PersonRoutes')
app.use(personRoutes)

module.exports = app;