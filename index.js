
require('dotenv').config()
const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')

// Create server express
const app = express()

// Database
dbConnection()

// CORS
app.use(cors())

// Public Dir
app.use(express.static('public'))

// Reading and parsing the body
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

// Petitions lisener
app.listen(process.env.PORT, () => {
    console.log(`Server runing in port: ${process.env.PORT}`)
})