import {INVOICES_URL} from '../urls'
import apiSlice from './apiSlice'
const invoicesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addInvoice: builder.mutation({
      query: invoice => ({
        url: INVOICES_URL,
        method: 'POST',
        body: invoice
      }),
      invalidatesTags: [
        'invoice'
      ]
    }),
    listInvoices: builder.query({
      query: () => ({
        url: INVOICES_URL,
        method: 'GET'
      }),
      providesTags: [
        'invoice'
      ]
    }),
    editInvoice: builder.mutation({
      query: (
        id,
        changes
      ) => ({
        url: `${INVOICES_URL}/${id}`,
        method: 'PATCH',
        body: changes
      }),
      invalidatesTags: [
        'invoice'
      ]
    }),
    deleteInvoice: builder.mutation({
      query: id => ({
        url: `${INVOICES_URL}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [
        'invoice'
      ]
    })
  })
})
export const {
  useAddInvoiceMutation,
  useListInvoicesQuery,
  useEditInvoiceMutation,
  useDeleteInvoiceMutation
} = invoicesApiSlice