import {Router} from 'express'
import {
    getStatus,
    createRoot
} from '../controllers/setupController.mjs'
const setupRouter = Router()
setupRouter.get('/status', getStatus)
setupRouter.post('/root', createRoot)
export default setupRouter