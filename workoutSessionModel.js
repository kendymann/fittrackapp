const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Individual exercise/activity within a workout session
const exerciseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['strength', 'cardio', 'sport']
  },
  
  // Strength training fields
  reps: {
    type: Number,
    required: function() { return this.type === 'strength'; }
  },
  sets: {
    type: Number,
    required: function() { return this.type === 'strength'; }
  },
  load: {
    type: Number,
    required: function() { return this.type === 'strength'; }
  },
  
  // Cardio/Sport fields
  duration: {
    type: Number,
    required: function() { return this.type === 'cardio' || this.type === 'sport'; }
  },
  distance: {
    type: Number,
    required: function() { return this.type === 'cardio'; }
  },
  pace: {
    type: String,
    required: false
  },
  
  // Universal fields
  notes: {
    type: String,
    required: false
  }
})

// Workout session containing multiple exercises
const workoutSessionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  exercises: [exerciseSchema], // Array of exercises in this session
  totalDuration: {
    type: Number, // Total session duration in minutes
    required: false
  },
  notes: {
    type: String,
    required: false
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('WorkoutSession', workoutSessionSchema)
