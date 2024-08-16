const winston = require('winston');

// Configure the logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            // format: 'YYYY-MM-DD HH:mm:ss'
            format: 'DD-MM-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'database.log', level: 'info' })
    ]
});

module.exports = logger;