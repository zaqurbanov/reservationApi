const HTTP_CODE = require("../config/HTTP_CODE")
const messages = require("../config/messages")
const Response = require("../config/response")
const getCatchError = require("../helpers/catchError")
const ReservationModel = require("../Models/ReservationModel")
const VenuesModel = require("../Models/VenuesModel")


const createReservation = async (venueId,date,time,numberOfPeople,userId)=>{


    try {
        const venue = await VenuesModel.findById(venueId)
       
        if(!venue)
            return Response.error("Venue Not Found ",null,HTTP_CODE.client_error.bad_request)
        
        const isExistsReservation = await ReservationModel.findOne({
            venueId,
            date,
            time
    
        }) 
       

        if(isExistsReservation){
            return Response.error("The venue is already reserved for the specified date and time.",null,HTTP_CODE.client_error.bad_request)
        }

        const result  = await ReservationModel.create({
            venueId,
            date,
            time,
            numberOfPeople,
            userId
        }) 
        
        return Response.success(messages.post.success,result, HTTP_CODE.success.ok)

    } catch (error) {
        return getCatchError(error.message)
    }
}
// giris etmis istifadecinin butun reservasiyalarini qaytarir
const getReservationByUserId = async(userId)=>{
        try {
            const result = await ReservationModel.find({userId}).populate('venueId  userId')

            if(result.length<1)
                return Response.error("Reservation Not Found",null,HTTP_CODE.client_error.not_found)

            return Response.success(messages.get.success,result,HTTP_CODE.success.ok)
        } catch (error) {
            
            return getCatchError(error.message)
            
        } 
}

const getReservationDetailById = async(id,userId,userRole)=>{
    try {
            const reservation = await ReservationModel.findById(id).populate('venueId userId')

            if(!reservation){
                return Response.error(messages.get.error,null,HTTP_CODE.client_error.not_found)
            }
            if(reservation.userId.toString() !== userId.toString() && userRole !=="admin" )
                return Response.error("Access denied. Only the creator or admin can view this reservation.",null,HTTP_CODE.client_error.forbidden)

                return Response.success(messages.get.success,reservation,HTTP_CODE.success.ok)


    } catch (error) {
        return getCatchError(error.message)
    }

} 

const deleteReservationById = async(id,userId,userRole)=>{

    try {
        const reservation = await ReservationModel.findById(id)

            if(!reservation){
                return Response.error(messages.get.error,null,HTTP_CODE.client_error.not_found)
            }
            if(reservation.userId.toString() !== userId.toString() && userRole !=="admin" )
                return Response.error("Access denied. Only the creator or admin can view this reservation.",null,HTTP_CODE.client_error.forbidden)

            await ReservationModel.findByIdAndDelete(id)

            return Response.success(messages.delete.success,null,HTTP_CODE.success.ok)
    } catch (error) {
        return getCatchError(error.message)
    }
}

 
module.exports = {
createReservation,
getReservationByUserId,
getReservationDetailById,
deleteReservationById


}