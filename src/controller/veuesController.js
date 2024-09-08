
const generateResult = require('../helpers/resultGenerator')
const venuesService = require('../Services/venuesService')

 //admin
const createVenues = async(req,res)=>{
        const {name,location,capacity,description} = req.body

        const result = await venuesService.createVenuses(name,location,capacity,description)

        generateResult(res,result)

        
}


const getAllVenues = async (req,res)=>{
    const page = parseInt(req.query.page) ||1
    const limit = parseInt(req.query.limit)||10 
    const skip =(page-1)*limit
    const location  = req.query.location

//pagination
const result = await venuesService.getAllVenues(page,limit,skip,location)
generateResult(res,result)
}


const getVenuesById = async(req,res)=>{
    const {id} = req.params
    const result = await venuesService.getVenuesById(id)
    generateResult(res,result)
}

const updateVenuesById = async(req,res)=>{
    const {name,location,capacity,description} = req.body
    const data = {
        name,
        location,
        capacity,
        description
    }
    const {id} = req.params
    const result = await venuesService.updateVenuesById(data,id)

    generateResult(res,result)
}

const deleteVenuesById = async(req,res)=>{
    const {id} = req.params
    const result  = await venuesService.deleteVenuesById(id)

    generateResult(res,result)
}

module.exports = {
    createVenues,
    getAllVenues,
    getVenuesById,
    updateVenuesById,
    deleteVenuesById
}