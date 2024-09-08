const HTTP_CODE = require("../config/HTTP_CODE")
const messages = require("../config/messages")
const Response = require("../config/response")
const getCatchError = require("../helpers/catchError")
const logger = require("../logger/logger")
const VenuesModel = require("../Models/VenuesModel")
const mongoose = require('mongoose')


const createVenuses =async (name,location,capacity,description)=>{
        try {
            if(!name ||name =="" || !location || location =="" ||!capacity || capacity=="")
                return Response.error(messages.post.error,null,HTTP_CODE.client_error.bad_request)

            const isVenues = await VenuesModel.findOne({name:name})
            if(isVenues)
                return Response.error("venues already exists",null,HTTP_CODE.client_error.bad_request)
            const result  = await VenuesModel.create({
                name,
                location,
                capacity,
                description              
            })

            logger.info("Success created "+result  )
            return Response.success(messages.post.success,result,HTTP_CODE.success.ok)
        } catch (error) {
            
            return getCatchError(error.message)
        }
}
const getAllVenues = async(page,limit,skip,location)=>{
    try {
        const query = {}
        if(location){
            query.location = location
        }
        const totalRecords = await VenuesModel.countDocuments(query);

        const totalPages = Math.ceil(totalRecords / limit);
            const result = await VenuesModel.find(query).limit(limit).skip(skip)
            
            return Response.success(messages.get.success, result, HTTP_CODE.success.ok, totalPages, page, {
                totalRecords,
                currentPage: page,
                limit,
            });
    } catch (error) {
        return getCatchError(error.message)
    }
}


const getVenuesById = async(id)=>{
    try {
            const result  = await VenuesModel.findById(id)
            if(!result)
                return Response.error(messages.get.error,null,HTTP_CODE.client_error.not_found)
            logger.info("success")
            return Response.success(messages.get.success,result,HTTP_CODE.success.ok)
    } catch (error) {
        return getCatchError(error.message)
    }

}

const updateVenuesById = async(data,id)=>{
    try {


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return Response.error('Invalid Venue ID format', null, HTTP_CODE.client_error.bad_request);
        }
        const dataById = await VenuesModel.findById(id)
        if(!dataById){
            return Response.error(messages.get.error,null,HTTP_CODE.client_error.bad_request)
 
        }
        // update olunmayan data namelerini silirik '
       
        Object.keys(data).forEach(name => {
            if (data[name] === undefined)
                delete data[name]
        }) 


        const result  = await VenuesModel.findByIdAndUpdate(id,{...data},{new:true})
        logger.info("updatedsuccessfully " + result)
        return Response.success(messages.updated.success,result,HTTP_CODE.success.ok)

        
    } catch (error) {
        return getCatchError(error.message)
    }
}

const deleteVenuesById = async(id)=>{
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return Response.error('Invalid Venue ID format', null, HTTP_CODE.client_error.bad_request);
        }
        const data  = await VenuesModel.findById(id)
        if(!data)
            return Response.error(messages.get.error,null,HTTP_CODE.client_error.not_found)
            
         await VenuesModel.findByIdAndDelete(id)

         logger.info("deleted Successfully")
        return Response.success(messages.delete.success,null,HTTP_CODE.success.ok)
            
    } catch (error) {
        
        return getCatchError(error.message)
    }
}
module.exports = {
    createVenuses,
    getAllVenues,
    getVenuesById,
    updateVenuesById,
    deleteVenuesById
}