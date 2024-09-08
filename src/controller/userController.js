const generateResult = require('../helpers/resultGenerator')
const userService = require('../Services/userService')


const createUser =  async (req,res)=>{
        
    const {username,password,email} = req.body

    const result = await userService.registerUser(username,password,email)
   
    generateResult(res,result)
}

const loginUser = async (req,res)=>{
    const {email,password} = req.body
       
    const result = await userService.loginUser(email,password);

   
    generateResult(res,result)

}

module.exports = { 
    createUser,
    loginUser
}