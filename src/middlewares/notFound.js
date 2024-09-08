const getCatchError = require("../helpers/catchError")
const logger = require("../logger/logger")

const notFound = (req,res)=>{

    try {
        logger.error("page not found")
        return    res.status(404).json({
        statusCode:404,
        message:"page not found",
        error:"an error"

    })
    } catch (error) {
        logger.error(error.message)
        return getCatchError(error)
    }

}

module.exports= notFound