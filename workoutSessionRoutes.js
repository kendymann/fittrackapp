const express = require('express')
const mongoose = require('mongoose')
const WorkoutSession = require('./workoutSessionModel')
const requireAuth = require('./middleware/requireAuth')

const router = express.Router()

// require auth for all workout session routes
router.use(requireAuth)

// GET all workout sessions
router.get('/', async (req, res) => {
  try {
    const user_id = req.user._id
    const sessions = await WorkoutSession.find({user_id}).sort({createdAt: -1})
    res.status(200).json(sessions)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// GET a single workout session
router.get('/:id', async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout session'})
  }

  try {
    const session = await WorkoutSession.findById(id)
    
    if (!session) {
      return res.status(404).json({error: 'No such workout session'})
    }
    
    res.status(200).json(session)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// POST a new workout session
router.post('/', async (req, res) => {
  const { title, exercises, totalDuration, notes } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!exercises || exercises.length === 0) {
    emptyFields.push('exercises')
  }

  // Validate each exercise
  if (exercises && exercises.length > 0) {
    exercises.forEach((exercise, index) => {
      if (!exercise.title) emptyFields.push(`exercises[${index}].title`)
      if (!exercise.type) emptyFields.push(`exercises[${index}].type`)

      if (exercise.type === 'strength') {
        if (!exercise.sets) emptyFields.push(`exercises[${index}].sets`)
        if (!exercise.reps) emptyFields.push(`exercises[${index}].reps`)
        if (exercise.load === undefined || exercise.load === null) emptyFields.push(`exercises[${index}].load`)
      } else if (exercise.type === 'cardio') {
        if (!exercise.duration) emptyFields.push(`exercises[${index}].duration`)
        if (!exercise.distance) emptyFields.push(`exercises[${index}].distance`)
      } else if (exercise.type === 'sport') {
        if (!exercise.duration) emptyFields.push(`exercises[${index}].duration`)
      }
    })
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ 
      error: 'Please fill in all required fields', 
      emptyFields
    })
  }

  try {
    const user_id = req.user._id
    const session = await WorkoutSession.create({
      title,
      exercises,
      totalDuration,
      notes,
      user_id
    })
    res.status(200).json(session)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// DELETE a workout session
router.delete('/:id', async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout session'})
  }

  try {
    const session = await WorkoutSession.findOneAndDelete({_id: id})

    if(!session) {
      return res.status(400).json({error: 'No such workout session'})
    }

    res.status(200).json(session)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// UPDATE a workout session
router.patch('/:id', async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout session'})
  }

  try {
    const session = await WorkoutSession.findOneAndUpdate({_id: id}, {
      ...req.body
    }, { new: true })

    if (!session) {
      return res.status(400).json({error: 'No such workout session'})
    }

    res.status(200).json(session)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = router
