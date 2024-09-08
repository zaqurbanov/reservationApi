const HTTP_CODE = require("../config/HTTP_CODE")
const logger = require("../logger/logger")


const getCatchError = (error)=>{
    logger.error(error.message)
    return Response.error(error,error.message,HTTP_CODE.server_error.internal_server_error)
}

module.exports = getCatchError