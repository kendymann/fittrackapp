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
    const { title, type, load, reps, sets, duration, distance, pace, notes, difficulty } = req.body

    let emptyFields = []

    // Universal validation - every workout needs these
    if (!title) {
      emptyFields.push('title')
    }
    if (!type) {
      emptyFields.push('type')
    }

    // Type-specific validation based on workout type
    if (type === 'strength') {
      // Strength workouts need: sets, reps, load (like Hevy)
      if (!sets) emptyFields.push('sets')
      if (!reps) emptyFields.push('reps')  
      if (!load) emptyFields.push('load')
    } 
    else if (type === 'cardio') {
      // Cardio workouts need: duration, distance (like Strava)
      if (!duration) emptyFields.push('duration')
      if (!distance) emptyFields.push('distance')
    }
    else if (type === 'sport') {
      // Sport workouts need: duration (basketball, soccer, etc.)
      if (!duration) emptyFields.push('duration')
    }
    else {
      // Invalid workout type
      return res.status(400).json({ error: 'Invalid workout type. Must be: strength, cardio, or sport' })
    }

    if (emptyFields.length > 0) {
      return res.status(400).json({ 
        error: 'Please fill in all required fields', 
        emptyFields,
        hint: `For ${type} workouts, you need: ${emptyFields.join(', ')}`
      })
    }

    try {
      const user_id = req.user._id
      
      // Create workout with all possible fields (MongoDB ignores undefined ones)
      const workout = await Workout.create({
        title, 
        type, 
        load, 
        reps, 
        sets, 
        duration, 
        distance, 
        pace, 
        notes, 
        difficulty, 
        user_id
      })
      
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
