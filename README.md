# Moodify

Moodify is a full-stack web application that detects a user's facial expression through the webcam and plays music based on the detected mood. The experience combines real-time computer vision, authentication, and a mood-driven music player into a single interactive app.

Live-Link: https://moodify-o0p9.onrender.com/

## Overview

Moodify allows users to:
- Register and log in securely
- Use their webcam to detect emotions such as happy, sad, surprised, angry, and neutral
- Receive mood-based song recommendations and playback
- Upload songs with metadata and cover art to the backend

## Features

### Frontend
- React + Vite-based UI
- Real-time face expression detection using face-api.js and TensorFlow.js
- Mood-driven music player experience
- Responsive home screen layout
- Authentication pages for login and registration

### Backend
- Express.js REST API
- JWT-based authentication with cookie storage
- MongoDB database integration via Mongoose
- Song upload endpoint with MP3 metadata and poster image handling
- Cloudinary-based storage for audio and poster assets
- Redis-backed token handling for logout flow

## Tech Stack

### Frontend
- React 19
- Vite
- Axios
- face-api.js
- TensorFlow.js
- SCSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + bcryptjs
- Multer
- Cloudinary
- Redis
- node-id3

## Project Structure

```text
Moodify/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── config/
│   ├── public/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   ├── App.jsx
│   │   └── AppRoutes.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Prerequisites

Before running the app, make sure you have the following installed:
- Node.js 18 or newer
- npm or pnpm
- MongoDB instance
- Cloudinary account
- Redis server (recommended for full auth/logout handling)

## Environment Variables

Create a `.env` file inside the backend directory with the following values:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

> The app uses MongoDB for user and song data, Cloudinary for media storage, and Redis for logout token handling.

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Moodify
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

## Running the Application

### Start the backend

```bash
cd backend
node server.js
```

The backend will run on:
- http://localhost:3000

### Start the frontend

```bash
cd frontend
npm run dev
```

The frontend will run on:
- http://localhost:5173

## API Endpoints

### Authentication
- POST `/api/auth/register` – Register a new user
- POST `/api/auth/login` – Log in a user
- GET `/api/auth/me` – Fetch authenticated user details
- POST `/api/auth/logout` – Log out the current user

### Songs
- GET `/api/song` – Fetch songs, optionally filtered by mood via `?mood=happy`
- POST `/api/song` – Upload a song file as `song`

## Usage Flow

1. Open the app in your browser.
2. Register or log in.
3. Allow webcam access.
4. The app detects your facial expression and maps it to a supported mood.
5. The player loads songs that match the detected mood.
6. Upload songs through the backend when needed for your own dataset.

## Notes

- The emotion detection feature relies on browser camera access.
- Song uploads require a valid MP3 file with embedded ID3 metadata and cover art.
- The app currently supports the moods: `sad`, `happy`, `surprised`, `angry`, and `neutral`.

## License

This project is distributed under the ISC license as defined in the backend package metadata.
