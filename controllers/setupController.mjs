import {hash} from 'bcryptjs'
import asyncHandler from '../middleware/asyncHandler.mjs'
import userModel from '../models/userModel.mjs'
/**
 * @name    getStatus
 * @desc    Get the config status (Does the root user exist?)
 * @route   GET /api/setup/status
 * @access  public
 */
export const getStatus = asyncHandler(async (request, response) => {
    const root = await userModel.findOne({where: {role: 'root'}})
    const firstRun = root ? false : true
    response.json(firstRun)
})
/**
 * @name    createRoot
 * @desc    Create the root user
 * @route   POST /api/setup/root
 * @access  public
 */
export const createRoot = asyncHandler(async (request, response) => {
    const {password, confirmPassword} = request.body
    const root = await userModel.findOne({where: {role: 'root'}})
    if (root) {
        response.status(403)
        throw new Error('Root user already exists.')
    } else {
        if (password !== confirmPassword) {
            response.status(403)
            throw new Error('Passwords do not match')
        } else {
            const shadow = await hash(password, 10)
            await userModel.create({
                name: 'root',
                shadow,
                role: 'root'
            })
            response.status(201).json({message: 'Created root user.'})
        }
    }
})