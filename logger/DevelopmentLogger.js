const winston = require('winston');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp}  [${level.toUpperCase()}] ${message}`;
});

const developmentLogger = () => {
    return createLogger({
        level: 'info',
        format: combine(timestamp(), customFormat),
        transports: [
            new transports.Console()
        ],
    });
}

module.exports = developmentLogger;