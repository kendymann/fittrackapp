// Simple test script to check if the backend starts properly
require('dotenv').config()
const express = require('express')

const app = express()

console.log('Starting test server...')
console.log('PORT:', process.env.PORT)
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set')

app.get('/', (req, res) => {
  res.json({ message: 'Test server is running' })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`)
}).on('error', (err) => {
  console.error('❌ Server error:', err)
})
