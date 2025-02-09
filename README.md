# 💪 FitTrack - Your Personal Workout Companion

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A powerful, intuitive workout tracking application built with the MERN stack. FitTrack helps you maintain consistency in your fitness journey by providing comprehensive workout tracking, goal setting, and progress visualization.

![FitTrack Demo](path/to/demo.gif)

## ✨ Key Features

- **🔐 Secure Authentication**
  - JWT-based user authentication
  - Password encryption
  - Protected routes
  - Session management

- **📝 Workout Management**
  - Create custom workout routines
  - Track sets, reps, and weights
  - Log cardio sessions
  - Add notes and ratings
  - Timer functionality

- **📊 Progress Analytics**
  - Visual progress tracking
  - Weight progression charts
  - Personal records tracking
  - Performance insights
  - Export workout data

- **🎯 Goal Setting**
  - Set weekly/monthly targets
  - Track completion rates
  - Milestone celebrations
  - Custom goal categories

## 🛠️ Tech Stack

### Core MERN Stack
- **MongoDB** - Database
- **Express.js** - Backend framework
- **React.js** - Frontend library
- **Node.js** - Runtime environment

### Development & Testing
- **Postman** - API testing and documentation
- **MongoDB Atlas** - Cloud database service
- **Git** - Version control

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB
- Postman
- Git

### Installation

1. **Clone the repository**
bash
git clone https://github.com/kendymann/workoutapp.git
cd workoutapp
2. **Install dependencies**
bash
# Install backend dependencies
npm install
# Install frontend dependencies
cd client npm install
3. **Environment Setup**
bash
# Create .env file in root directory
cp .env.example .env
# Add your environment variables
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
4. **Start the application**
bash
# Run backend (from root directory)
npm run server
# Run frontend (from client directory)
npm run server

## 📱 Usage

1. Register an account or login
2. Create your first workout routine
3. Log your exercises and sets
4. Track your progress through the dashboard
5. Set and monitor fitness goals

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/)

---

<p align="center">Made with ❤️ by Kendymann</p>
