
const Response = require("../config/response");
const logger = require("../logger/logger");


 const verifyAdmin = async (req, res, next) => {


        
    if (req.user.role !== 'admin') {
      logger.error("Access denied. Admins only.")
        return res.status(403).json({

          message:"Access denied. Admins only."
        })


          
    }
    // "email":"admin@gmail.com",
    // "password":"Admin@123",
    // "username":"admin"
   
    next(); 
  };

  module.exports = verifyAdmin  