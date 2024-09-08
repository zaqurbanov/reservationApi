const express = require('express');

const router = express.Router()
const userController = require('../controller/userController')


//! swagger Comment
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user by providing username, email, and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password (minimum 8 characters, including one uppercase letter)
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: User with this email or username already exists
 *       500:
 *         description: Internal server error
 */

router.post('/register',userController.createUser)

//! Swagger comment for User Login
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Log in a user by providing email and password. Returns a JWT token on success.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: Successfully logged in and returned JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user
 *       400:
 *         description: Invalid credentials or bad request
 *       500:
 *         description: Internal server error
 */
router.post('/login',userController.loginUser)

module.exports = router