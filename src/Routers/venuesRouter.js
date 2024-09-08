const express = require('express');

const router = express.Router()
const venuesController = require('../controller/veuesController');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');



// !swagger comment
/**
 * @swagger
 * /venues:
 *   post:
 *     summary: Create a new venue
 *     description: Add a new venue to the system. Only admins can perform this action.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the venue
 *               location:
 *                 type: string
 *                 description: The location of the venue
 *               capacity:
 *                 type: string
 *                 description: The capacity of the venue
 *               description:
 *                 type: string
 *                 description: Additional information about the venue (optional)
 *     responses:
 *       201:
 *         description: Venue created successfully
 *       400:
 *         description: Invalid input data
 *       403:
 *         description: Forbidden (Admin only)
 *       500:
 *         description: Internal server error
 */


router.post('/',verifyToken,verifyAdmin ,venuesController.createVenues)

// Butun mekanlari goruntule


//! swagger comment
/**
 * @swagger
 * /venues:
 *   get:
 *     summary: Get all venues
 *     description: Get a list of all venues with pagination and optional location filter
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter venues by location
 *     responses:
 *       200:
 *         description: Successfully retrieved list of venues
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The venue ID
 *                       name:
 *                         type: string
 *                         description: The name of the venue
 *                       location:
 *                         type: string
 *                         description: The location of the venue
 *                       capacity:
 *                         type: string
 *                         description: The capacity of the venue
 *                       description:
 *                         type: string
 *                         description: Additional description of the venue
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/',venuesController.getAllVenues)


//!swagger comment
/**
 * @swagger
 * /venues/{id}:
 *   get:
 *     summary: Get venue by ID
 *     description: Retrieve a specific venue by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the venue to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the venue
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id',venuesController.getVenuesById)


//!swagger comment

/**
 * @swagger
 * /venues/{id}:
 *   put:
 *     summary: Update a venue by ID
 *     description: Update a venue's details. Only admins can perform this action.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the venue to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               capacity:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Venue updated successfully
 *       400:
 *         description: Invalid input data
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id',verifyAdmin,venuesController.updateVenuesById)



//! Swagger comment
/**
 * @swagger
 * /venues/{id}:
 *   delete:
 *     summary: Delete a venue by ID
 *     description: Delete a venue from the system. Only admins can perform this action.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the venue to delete
 *     responses:
 *       200:
 *         description: Venue deleted successfully
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id',verifyAdmin,venuesController.deleteVenuesById)
module.exports = router 