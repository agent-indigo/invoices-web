import Invoice from '@/types/Invoice'
import ModalProps from '@/types/ModalProps'
export default interface EditInvoiceModalProps extends ModalProps {
  invoice: Invoice,
}