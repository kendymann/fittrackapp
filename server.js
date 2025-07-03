require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./workoutRoutes')
const userRoutes = require('./user')

// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.json({mssg: 'Welcome to the app'})
})

// connect to db
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
})
  .then(() => {
    console.log('✅ Connected to database')
  })
  .catch((error) => {
    console.log('❌ Database connection failed:', error.message)
    console.log('🔄 Server will continue without database for testing...')
  })

// listen for requests (start server regardless of database connection)
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT}`)
})