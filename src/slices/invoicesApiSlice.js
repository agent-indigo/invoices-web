import {INVOICES_URL} from '../urls'
import apiSlice from './apiSlice'
const invoicesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addInvoice: builder.mutation({
            query: data => ({
                url: INVOICES_URL,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['invoice']
        }),
        listInvoices: builder.query({
            query: () => ({
                url: INVOICES_URL,
                method: 'GET'
            }),
            providesTags: ['invoice']
        }),
        editInvoice: builder.mutation({
            query: data => ({
                url: `${INVOICES_URL}/:pk`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['invoice']
        }),
        deleteInvoice: builder.mutation({
            query: () => ({
                url: `${INVOICES_URL}/:pk`,
                method: 'DELETE'
            }),
            invalidatesTags: ['invoice']
        })
    })
})
export const {
    useAddInvoiceMutation,
    useListInvoicesQuery,
    useLazyListInvoicesQuery,
    useEditInvoiceMutation,
    useDeleteInvoiceMutation
} = invoicesApiSlice