import Data from '@/src/types/Data'
export default interface Invoice extends Data {
  vendor: string
  subtotal: number,
  hst: number
  total: number
  invoiceId: string
  date: string
}