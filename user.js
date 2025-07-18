const express = require('express')
const jwt = require('jsonwebtoken')

const User = require('./userModel')

const router = express.Router()

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' })
}

// login a user
router.post('/login', async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({
      token, 
      user: {
        _id: user._id,
        email: user.email
      }
    })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// signup a user
router.post('/signup', async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({
      token, 
      user: {
        _id: user._id,
        email: user.email
      }
    })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = router
