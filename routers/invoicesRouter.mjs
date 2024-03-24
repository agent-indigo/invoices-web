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
import invoiceModel from '../models/invoiceModel.mjs'
import searchFilter from '../middleware/searchFilter.mjs'
const invoicesRouter = Router()
invoicesRouter.use(authenticate)
invoicesRouter.use(authorize('user', 'root'))
invoicesRouter.get('/', searchFilter(invoiceModel), listInvoices)
invoicesRouter.post('/', addInvoice)
invoicesRouter.put('/:pk', editinvoice)
invoicesRouter.delete('/:pk', deleteInvoice)
export default invoicesRouter