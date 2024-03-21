import {Router} from 'express'
import {
    addInvoice,
    listInvoices,
    editinvoice,
    deleteInvoice
} from '../controllers/invoicesController.mjs'
import {
    authenticate,
    authorize
} from '../middleware/securityHandler.mjs'
const invoicesRouter = Router()
invoicesRouter.use(authenticate)
invoicesRouter.use(authorize('user', 'root'))
invoicesRouter.get('/', listInvoices)
invoicesRouter.post('/', addInvoice)
invoicesRouter.put('/:pk', editinvoice)
invoicesRouter.delete('/:pk', deleteInvoice)
export default invoicesRouter