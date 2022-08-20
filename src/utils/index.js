/* eslint-disable consistent-return */
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const winston = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file');
const { secretKey } = require('../config/config');

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.align(),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level} ${info.message}`,
    ),
);
winston.loggers.add('customLogger', {
    format: logFormat,
    transports: [
        // eslint-disable-next-line new-cap
        new winstonDailyRotateFile({
            filename: './logs/todo-backend-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: 5, // only keep 5 files in log folder (sorted in date order. ascending).
            // auto delete other files.
            level: 'info',
        }),
        new winston.transports.Console({
            level: 'info',
            timestamp: true,
            format: winston.format.combine(
                winston.format.colorize({
                    all: true,
                }),
            ),
        }),
    ],
});

const logger = winston.loggers.get('customLogger');

module.exports = {
    signUpValidation: () => Joi.object({
        email: Joi.string().email({ tlds: { allow: ['com', 'net', 'np'] } }).required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
    loginValidation: () => Joi.object({
        email: Joi.string().email({ tlds: { allow: ['com', 'net', 'np'] } }).required(),
        password: Joi.string().required(),
    }),
    taskValidation: () => Joi.object({
        email: Joi.string().email({ tlds: { allow: ['com', 'net', 'np'] } }).required(),
        taskName: Joi.string().required(),
        isDone: Joi.boolean().required(),
        subTasks: Joi.array(),
    }),
    responseFormat: (code, req, data, error, res) => {
        if (error !== null) {
            if (code === 201) {
                return res.status(201)
                    .send({
                        success: false,
                        message: error,
                    });
            }
            // log error for debugging
            logger.error(`[${req.originalUrl}] -- Failure \n ${error}`);
            console.log(error);
            return res.status(500)
                .send({
                    msg: 'Internal Server Error',
                });
        }
        return res.status(code)
            .send({
                ...data,
            });
    },
    authenticateToken: (req, res, next) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1];
            if (!token || token === '') {
                return res.status(401).send({
                    error: {
                        message: 'Invalid token',
                    },
                });
            }
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    console.log(err);
                    return res.status(401).send({
                        error: err,
                    });
                }
                req.user = decoded;
                next();
            });
        } else {
            return res.status(401).send({
                error: {
                    message: 'Invalid token',
                },
            });
        }
    },
};
