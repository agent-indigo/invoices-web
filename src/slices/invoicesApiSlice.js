import apiSlice from './apiSlice'
const invoicesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addInvoice: builder.mutation({
      query: body => ({
        url: '/invoices',
        method: 'POST',
        body
      }),
      invalidatesTags: [
        'invoice'
      ]
    }),
    listInvoices: builder.query({
      query: () => ({
        url: '/invoices',
        method: 'GET'
      }),
      providesTags: [
        'invoice'
      ]
    }),
    editInvoice: builder.mutation({
      query: (
        id,
        body
      ) => ({
        url: `/invoices/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: [
        'invoice'
      ]
    }),
    deleteInvoice: builder.mutation({
      query: id => ({
        url: `/invoices/${id}`,
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