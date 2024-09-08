const {createLogger,format,transports} = require('winston')
const { combine, timestamp, printf, colorize } = format;
const path = require('path')
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });

  const logger = createLogger({
    level: 'info', // 
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
      colorize(), 
      logFormat 
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: path.join( __dirname ,'logs/error.log'), level: 'error' }),  
      new transports.File({ filename: path.join(__dirname, 'logs/info.log'  ) , level: 'info' }),  
      new transports.File({ filename: path.join(__dirname, 'logs/warning.log'  ) , level: 'warning' }),
      new transports.File({ filename: path.join(__dirname,'logs/combined.log')  }) ,

    ]
  });
  
  module.exports = logger;