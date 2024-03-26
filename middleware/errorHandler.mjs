import 'dotenv/config'
import errorMessage from '../utilities/errorMessage.mjs'
export const notFound = (request, response, next) => {
    response.status(404)
    next(errorMessage(`${request.originalUrl} not found.`, 404))
}
export const errorHandler = (error, request, response, next) => {
    const MODE = process.env.NODE_ENV || 'production'
    console.error(error.stack)
    if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map(error => error.message)
        error.message = errorMessage(validationErrors, 400)
    } else if (error.name === 'SequelizeUniqueConstraintError') {
        error.message = errorMessage('Duplicate field value entered.', 400)
    } else if (error.name === 'SequelizeForeignKeyConstraintError') {
        error.message = errorMessage('Foreign key constraint violation.', 400)
    } else if (error.name === 'SequelizeConnectionError') {
        error.message = errorMessage('Database connection error.', 500)
    } else if (error.name === 'SequelizeTimeoutError') {
        error.message = errorMessage('Database operation timed out.', 500)
    } else if (error.name === 'SequelizeAccessDeniedError') {
        error.message = errorMessage('Access denied.', 403)
    } else if (error.name === 'SequelizeError') {
        error.message = errorMessage('Database operation failed.', 500)
    }                
    response.status(response.statusCode || 500).json({
        error: error.message || '500 internal server error.',
        stack: MODE === 'production' ? null : error.stack
    })
}