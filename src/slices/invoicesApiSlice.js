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
        url: `${INVOICES_URL}/${data.uuid}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['invoice']
    }),
    deleteInvoice: builder.mutation({
      query: uuid => ({
        url: `${INVOICES_URL}/${uuid}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['invoice']
    })
  })
})
export const {
  useAddInvoiceMutation,
  useListInvoicesQuery,
  useEditInvoiceMutation,
  useDeleteInvoiceMutation
} = invoicesApiSlice