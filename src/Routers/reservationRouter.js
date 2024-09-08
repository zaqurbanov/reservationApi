const express = require('express');

const router = express.Router()
const reservationController = require('../controller/reservationController')

//! Swagger comment
/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Create a new reservation
 *     description: Create a new reservation for a venue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - venueId
 *               - date
 *               - time
 *               - numberOfPeople
 *             properties:
 *               venueId:
 *                 type: string
 *                 description: The ID of the venue to reserve
 *               date:
 *                 type: string
 *                 description: Reservation date (ISO format or specific format)
 *               time:
 *                 type: string
 *                 description: Reservation time
 *               numberOfPeople:
 *                 type: integer
 *                 description: Number of people for the reservation
 *     responses:
 *       200:
 *         description: Reservation created successfully
 *       400:
 *         description: Invalid input data or venue already reserved
 *       500:
 *         description: Internal server error
 */

router.post('/',reservationController.createReservation)

//! Swagger Comment
/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations for the logged-in user
 *     description: Retrieve a list of all reservations for the authenticated user
 *     responses:
 *       200:
 *         description: Successfully retrieved list of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Reservation ID
 *                   venueId:
 *                     type: string
 *                     description: Venue ID
 *                   date:
 *                     type: string
 *                     description: Reservation date
 *                   time:
 *                     type: string
 *                     description: Reservation time
 *                   numberOfPeople:
 *                     type: integer
 *                     description: Number of people for the reservation
 *       404:
 *         description: No reservations found for the user
 *       500:
 *         description: Internal server error
 */

router.get('/',reservationController.getReservationByUserId)






//! Swagger Comment 

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get reservation details by ID
 *     description: Retrieve details of a reservation by its ID. Only the creator or admin can view this reservation.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the reservation to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved reservation details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Reservation ID
 *                 venueId:
 *                   type: string
 *                   description: Venue ID
 *                 date:
 *                   type: string
 *                   description: Reservation date
 *                 time:
 *                   type: string
 *                   description: Reservation time
 *                 numberOfPeople:
 *                   type: integer
 *                   description: Number of people for the reservation
 *       403:
 *         description: Access denied. Only the creator or admin can view this reservation.
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Internal server error
 */

router.get('/:id',reservationController.getReservationDetailById)


//! swagger comment 
/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Delete a reservation by ID
 *     description: Delete a reservation from the system. Only the creator or admin can delete it.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the reservation to delete
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       403:
 *         description: Access denied. Only the creator or admin can delete this reservation.
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:id',reservationController.deleteReservationById)

module.exports = router