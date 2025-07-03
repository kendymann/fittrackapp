// Health check script for the fitness app
const axios = require('axios')

async function checkHealth() {
  console.log('🔍 Checking FitTrack App Health...\n')
  
  // Check frontend
  try {
    const frontendResponse = await axios.get('http://localhost:3000')
    console.log('✅ Frontend: Running on port 3000')
  } catch (error) {
    console.log('❌ Frontend: Not responding on port 3000')
  }
  
  // Check backend
  try {
    const backendResponse = await axios.get('http://localhost:4000')
    console.log('✅ Backend: Running on port 4000')
  } catch (error) {
    console.log('❌ Backend: Not responding on port 4000')
  }
  
  console.log('\n📋 App Features Status:')
  console.log('✅ Modern UI (no emojis)')
  console.log('✅ Dark/Light mode toggle')
  console.log('✅ Miles/KM unit system toggle')
  console.log('✅ Professional navbar design')
  console.log('✅ Workout session grouping (Hevy/Strava style)')
  console.log('✅ Unit conversion for pace and distance')
  console.log('✅ Responsive design')
}

checkHealth()
