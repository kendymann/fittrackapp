const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  // NEW: Workout type to distinguish between different activities
  type: {
    type: String,
    required: true,
    enum: ['strength', 'cardio', 'sport'], // Only allow these 3 types
    default: 'strength'
  },
  
  // Strength training fields (like your current Hevy data)
  reps: {
    type: Number,
    required: function() { return this.type === 'strength'; } // Only required for strength
  },
  sets: {
    type: Number,
    required: function() { return this.type === 'strength'; }
  },
  load: {
    type: Number, // Weight lifted
    required: function() { return this.type === 'strength'; }
  },
  
  // Cardio/Sport fields (like your Strava data)
  duration: {
    type: Number, // Duration in minutes
    required: function() { return this.type === 'cardio' || this.type === 'sport'; }
  },
  distance: {
    type: Number, // Distance in miles/km
    required: function() { return this.type === 'cardio'; } // Only required for cardio
  },
  pace: {
    type: String, // e.g., "7:30/mile"
    required: false // Optional
  },
  
  // Universal fields for all workout types
  notes: {
    type: String,
    required: false
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'hard'],
    required: false
  },
  
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)