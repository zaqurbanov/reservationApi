

const generateResult = require('../helpers/resultGenerator')
const reservationService = require('../Services/reservationService')


const createReservation = async(req,res)=>{

    let {venueId,date,time,numberOfPeople} = req.body
    numberOfPeople = Number(numberOfPeople)
   const userId = req.user.id
  
    const result  = await reservationService.createReservation(venueId,date,time,numberOfPeople,userId)
 
    generateResult(res,result)

}

const getReservationByUserId = async(req,res)=>{
    
    const userId =req.user.id
    
    const result = await reservationService.getReservationByUserId(userId)
    generateResult(res,result)
}

const getReservationDetailById = async(req,res)=>{
        const {id} = req.body
        const userId = req.user.id
        const userRole = req.user.role

const result = await reservationService.getReservationDetailById(id,userId,userRole)
        generateResult(res,result)
}


const deleteReservationById =async (req,res)=>{
    const {id} = req.params
   
        const userId = req.user.id
        const userRole = req.user.role

        const result  =await reservationService.deleteReservationById(id,userId,userRole)

        generateResult(res,result)

} 
module.exports = {
    createReservation,
    getReservationByUserId,
    getReservationDetailById,
    deleteReservationById

} 

