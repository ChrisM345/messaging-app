# Messenger App

A modern messaging web application inspired by Discord. Built with a React frontend and an Express backend, this app supports user authentication with JWT, responsive UI via TailwindCSS, and a dynamic interface for managing friends, messages, and requests. Real-time messaging is powered by Socket.IO.

## Features

- JWT Authentication
- User Login / Account Creation
- Friend System (Friends & Requests)
- Direct Messaging UI with real-time updates
- Protected Routes using Express middleware
- Global Auth State with React Context
- TailwindCSS Styling
- Real-time messaging with WebSocket (Socket.IO)

## Tech Stack

### Frontend

- React
- React Router DOM
- TailwindCSS
- Context API
- Socket.IO Client

### Backend

- Node.js
- Express.js
- JSON Web Token (JWT)
- Socket.IO Server
- REST API

## Notes

- Uses REST API for user, friends, and message persistence.
- Uses Socket.IO WebSocket for real-time direct messaging updates.
- Each user joins a private room for receiving messages in real-time.
- Messages are saved via REST and pushed via WebSocket.
