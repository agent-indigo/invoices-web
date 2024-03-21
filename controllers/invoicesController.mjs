import asyncHandler from '../middleware/asyncHandler.mjs'
import invoiceModel from '../models/invoiceModel.mjs'
/**
 * @name    addInvoice
 * @desc    Add a invoice
 * @route   POST /api/invoices
 * @access  private
 */
export const addInvoice = asyncHandler(async (request, response) => {
    const invoice = await invoiceModel.create(request.body)
    response.status(201).json(invoice)
})
/**
 * @name    listInvoices
 * @desc    List all invoices
 * @route   GET /api/invoices
 * @access  private
 */
export const listInvoices = asyncHandler(async (request, response) => {
    const invoices = await invoiceModel.findAll()
    response.status(200).json(invoices)
})
/**
 * @name    editInvoice
 * @desc    Edit a Invoice
 * @route   PUT /api/invoices/:pk
 * @access  private
 */
export const editinvoice = asyncHandler(async (request, response) => {
    const invoice = invoiceModel.findByPk(request.params.pk)
    await invoice.update(request.body)
    response.status(200).json(invoice)
})
/**
 * @name    deleteInvoice
 * @desc    Delete a invoice
 * @route   DELETE /api/invoices/:pk
 * @access  private
 */
export const deleteInvoice = asyncHandler(async (request, response) => {
    const invoice = invoiceModel.findByPk(request.params.pk)
    await invoice.destroy()
    await invoiceModel.bulkD
    response.status(204).json({message: 'Deleted invoice.'})
})