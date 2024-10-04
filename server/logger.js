// utils/logger.js
// import winston from 'winston';
const winston = require('winston');

const { combine, timestamp, printf, colorize, json } = winston.format;

// Define the custom format for log messages
const logFormat = printf(({ level, message, timestamp, ...meta }) => {
  return `${timestamp} ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
});

// Create the logger instance
const logger = winston.createLogger({
  level: 'trace', // Set the default log level to trace
  format: combine(
    colorize(), // Colorize the output
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamps
    json(), // Output logs in JSON format
    logFormat // Apply custom format
  ),
  transports: [
    new winston.transports.Console({ // Log to the console
      level: 'debug', // Set the console log level to debug
      handleExceptions: true, // Handle exceptions and rejections
      json: false, // Do not output logs in JSON format in the console
      colorize: true // Colorize the console output
    }),
    new winston.transports.File({ // Log errors to a file
      filename: 'logs/error.log',
      level: 'error',
      handleExceptions: true, // Handle exceptions and rejections
      json: true, // Output logs in JSON format in the error log file
      maxsize: 1024 * 1024 * 5, // Set the maximum file size to 5MB
      maxFiles: 5, // Set the maximum number of log files to 5
      tailable: true // Allow the log file to be tailed
    }),
    new winston.transports.File({ // Log all messages to a file
      filename: 'logs/combined.log',
      level: 'trace',
      handleExceptions: true, // Handle exceptions and rejections
      json: true, // Output logs in JSON format in the combined log file
      maxsize: 1024 * 1024 * 5, // Set the maximum file size to 5MB
      maxFiles: 5, // Set the maximum number of log files to 5
      tailable: true // Allow the log file to be tailed
    })
  ],
  exceptionHandlers: [ // Handle exceptions and rejections
    new winston.transports.File({
      filename: 'logs/exceptions.log',
      handleExceptions: true,
      json: true,
      maxsize: 1024 * 1024 * 5,
      maxFiles: 5,
      tailable: true
    })
  ]
});

// Export the logger instance
module.exports = logger;