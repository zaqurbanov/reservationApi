# Reservation and Venue Management API

This project provides an API for managing venues and reservations. Users can register, login, and make reservations for venues. Admins can manage venues and users. The API is built using Node.js, Express.js, and MongoDB.

## Features

- User registration and login with JWT authentication.
- Role-based access control (admin and user roles).
- Venue management (create, read, update, delete) by admins.
- Reservation management by authenticated users.
- Full Swagger API documentation.
  
## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- Winston for logging
- Swagger for API documentation

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository.git


cd project-directory
npm install


npm start

## API Documentation

To access the API documentation, navigate to the following URL in your browser:

http://localhost:3755/api-docs


## API Endpoints
## Authentication
POST /auth/register: Register a new user.
POST /auth/login: Log in as a user and receive a JWT token.
 ## Venue Management (Admin Only)
POST /venues: Create a new venue.
GET /venues: Get all venues with pagination.
GET /venues/:id: Get a specific venue by ID.
PUT /venues/:id: Update a venue by ID.
DELETE /venues/:id: Delete a venue by ID.
  ## Reservation Management (Authenticated Users)
POST /reservations: Create a new reservation for a venue.
GET /reservations: Get all reservations for the logged-in user.
GET /reservations/:id: Get details of a specific reservation (only accessible by the creator or admin).
DELETE /reservations/:id: Delete a reservation (only accessible by the creator or admin).
Logging
Winston is used for logging different levels of messages to both console and log files. Log files are located in the logs directory.

info.log: Logs general information.
error.log: Logs error messages.
combined.log: Logs both error and info messages.
Error Handling
All responses follow a standard structure. In case of errors, an appropriate HTTP status code and message are returned.