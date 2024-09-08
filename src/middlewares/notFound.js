const getCatchError = require("../helpers/catchError")

const notFound = (req,res)=>{

    try {
        return    res.status(404).json({
        statusCode:404,
        message:"page not found",
        error:"an error"
    })
    } catch (error) {
        return getCatchError(error)
    }

}

module.exports= notFound