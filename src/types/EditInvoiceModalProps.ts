import Invoice from '@/src/types/Invoice'
import ModalProps from '@/src/types/ModalProps'
export default interface EditInvoiceModalProps extends ModalProps {
  invoice: Invoice,
}