const express = require('express') 
const app = new express()
app.use(express.json())

module.exports = app;