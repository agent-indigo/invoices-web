import {Router} from 'express'
import {
    login,
    logout,
    changePassword,
    resetPassword,
    addUser,
    listUsers,
    deleteUser
} from '../controllers/usersController.mjs'
import {
    authenticate,
    authorize
} from '../middleware/securityHandler.mjs'
const usersRouter = Router()
usersRouter.post('/login', login)
usersRouter.use(authenticate)
usersRouter.use(authorize('root'))
usersRouter.post('/', addUser)
usersRouter.get('/', listUsers)
usersRouter.delete('/:pk', deleteUser)
usersRouter.patch('/:pk/resetPassword', resetPassword)
usersRouter.use(authorize('user'))
usersRouter.get('/logout', logout)
usersRouter.patch('/:pk/changePassword', changePassword)
export default usersRouter