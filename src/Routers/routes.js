const express = require('express');


const router = express.Router()

const userRouter = require('./userRouter')
const venuesRouter = require('./venuesRouter');
const reservationRouter = require('./reservationRouter')
const verifyToken = require('../middlewares/verifyToken');

router.use('/auth',userRouter)
router.use('/venues',verifyToken, venuesRouter)
router.use('/reservations',verifyToken,reservationRouter)
module.exports = router 