const dotenv = require('dotenv')
dotenv.config()

module.exports = {
MONGO_PATH:process.env.MONGO_PATH,
PORT:process.env.PORT,
JWT_SECRET_KEY:process.env.JWT_SECRET_KEY

}