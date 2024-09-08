const HTTP_CODE = require("../config/HTTP_CODE");
const Response = require("../config/response");
const getCatchError = require("../helpers/catchError");
const generateToken = require("../helpers/tokenGenerator");
const logger = require("../logger/logger");
const UserModel = require("../Models/UserModel");
const bcrypt = require('bcrypt')


const registerUser = async(username,password,email)=>{
        try {
            const validationPattern =  /^[A-Za-z][A-Za-z0-9]*$/; // stringle baslamali,bosluq olmamali, 
    const passwordPattern = /^(?=.*[A-Z]).{8,}$/ // an azi bir eded boyukherf olmalidir. minimum 8simvol olmalidir
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!username || username== "" || !email || email =="" || !password ||password =="" )
                return Response.error("please correct value",null,HTTP_CODE.client_error.bad_request)
                
            if(!validationPattern.test(username)){
                return Response.error("Username Must be string and can not use empty value",null,HTTP_CODE.client_error.bad_request)
            }
    
            if(!passwordPattern.test(password)){ 
                return Response.error('Password must be minimum 8 simvol an includes least one uppercase string ',null,HTTP_CODE.client_error.bad_request)
            }
    
            if(!emailPattern.test(email)){
                return Response.error('invalid Email Value ',null,HTTP_CODE.client_error.bad_request)
            }


            const isExistsForUserName  = await UserModel.findOne({username:username})
            const isExistsForEmail = await UserModel.findOne({email:email})
            if(isExistsForUserName){ 
                return Response.error("UserName already exists",null, HTTP_CODE.client_error.bad_request)
            } 
            if(isExistsForEmail){
                return Response.error("Email already exists",null, HTTP_CODE.client_error.bad_request)
            }

            const hashPassword = await bcrypt.hash(password,10)

            const result  = await UserModel.create({username,password:hashPassword,email})
                logger.info(result + "success created")
            return Response.success("User created Successfully",result,HTTP_CODE.success.ok)
        } catch (error) {
            return getCatchError(error.message)
        }

}

const loginUser =async (email,password)=>{
    try {
        const user = await UserModel.findOne({email:email})
        if(!user){
            logger.error("User Not Found")
            return Response.error("User Not found",null, HTTP_CODE.client_error.bad_request)
        }
            const compareHash = await bcrypt.compare(password,user.password)
            if(!compareHash){
                logger.error("Please input Correct Password")
                return Response.error("Please input Correct Password",null,HTTP_CODE.client_error.bad_request)
            } 

        const token =  generateToken(user)

           
            logger.info(`login success true ${user}` )
           return Response.success('login success true',token,HTTP_CODE.success.ok)

    } catch (error) {
       
return getCatchError(error.message)
    }
}

module.exports = {
    registerUser,
    loginUser
}