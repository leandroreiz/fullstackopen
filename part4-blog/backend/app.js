const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app