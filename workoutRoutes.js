const express = require('express')
const mongoose = require('mongoose')
const Workout = require('./workoutModel')
const requireAuth = require('./middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', async (req, res) => {
  try {
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
    res.status(200).json(workouts)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// GET a single workout
router.get('/:id', async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  try {
    const workout = await Workout.findById(id)
    
    if (!workout) {
      return res.status(404).json({error: 'No such workout'})
    }
    
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// POST a new workout
router.post('/', async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if (!title) {
      emptyFields.push('title')
    }
    if (!load) {
      emptyFields.push('load')
    }
    if (!reps) {
      emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
      const user_id = req.user._id
      const workout = await Workout.create({title, load, reps, user_id})
      res.status(200).json(workout)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
})

// DELETE a workout
router.delete('/:id', async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  try {
    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout) {
      return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// UPDATE a workout
router.patch('/:id', async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  try {
    const workout = await Workout.findOneAndUpdate({_id: id}, {
      ...req.body
    })

    if (!workout) {
      return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = router
