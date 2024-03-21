import 'dotenv/config'
import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.mjs'
import userModel from '../models/userModel.mjs'
export const authenticate = asyncHandler(async (request, response, next) => {
    const token = request.cookies.token || request.header('Authorization')?.substring(7)
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findByPk(decoded.pk)
        if (user) {
            request.pk = user.pk
            next()
        } else {
            response.status(401)
            throw new Error('User not found.')
        }
    } else {
        response.status(401)
        throw new Error('Token not found.')
    }
})
export const authorize = async (...roles) => {
    return async (request, response, next) => {
        const user = await userModel.findByPk(request.pk)
        if (!roles.includes(user.role)) {
            response.status(401)
            throw new Error('Permission denied.')
        } else {
            next()
        }
    }
}