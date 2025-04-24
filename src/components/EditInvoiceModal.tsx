import {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  ReactElement,
  useState
} from 'react'
import {
  Button,
  Form,
  Modal
} from 'react-bootstrap'
import {
  FaCheck,
  FaFileInvoiceDollar,
  FaTimes
} from 'react-icons/fa'
import {toast} from 'react-toastify'
import FormContainer from './FormContainer'
import Loader from './Loader'
import EditInvoiceModalProps from '@/types/EditInvoiceModalProps'
import Invoice from '@/types/Invoice'
import ContextProps from '@/types/ContextProps'
import {useGetContext} from './ContextProvider'
const EditInvoiceModal: FunctionComponent<EditInvoiceModalProps> = ({
  invoice,
  closeModal
}): ReactElement => {
  const {id}: Invoice = invoice
  const {
    user,
    invoices,
    setInvoices
  }: ContextProps = useGetContext()
  const [
    vendor,
    setVendor
  ] = useState<string>(invoice.vendor)
  const [
    date,
    setDate
  ] = useState<string>(invoice.date)
  const [
    subtotal,
    setSubtotal
  ] = useState<number | string>(invoice.subtotal)
  const [
    hst,
    setHST
  ] = useState<number | string>(invoice.hst)
  const [
    total,
    setTotal
  ] = useState<number | string>(invoice.total)
  const [
    invoiceId,
    setInvoiceID
  ] = useState<string>(invoice.invoiceId)
  const [
    loading,
    setLoading
  ] = useState<boolean>(false)
  const submitHandler: Function = async (): Promise<void> => {
    setLoading(true)
    const patch: FormData = new FormData()
    vendor !== invoice.vendor && patch.append(
      'vendor',
      vendor
    )
    date !== invoice.date && patch.append(
      'date',
      date
    )
    subtotal !== invoice.subtotal && patch.append(
      'subtotal',
      subtotal.toString()
    )
    hst !== invoice.hst && patch.append(
      'hst',
      hst.toString()
    )
    total !== invoice.total && patch.append(
      'total',
      total.toString()
    )
    invoiceId !== invoice.invoiceId && patch.append(
      'invoiceId',
      invoiceId
    )
    const response: Response = await fetch(
      `http://localhost:8080/invoices/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(Object.fromEntries(patch.entries())),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        }
      }
    )
    if (response.ok) {
      setInvoices(invoices.filter((invoice: Invoice): boolean => invoice.id !== id))
      setInvoices([
        ...invoices,
        await response.json()
      ])
      closeModal()
      toast.success('Changes saved.')
    } else {
      toast.error(await response.text())
    }
    setLoading(false)
  }
  return (
    <Modal
      show={true}
      onHide={(): void => closeModal()}
    >
      {loading ? (
        <Loader/>
      ) : (
        <FormContainer>
          <h1>
            <FaFileInvoiceDollar/> Edit invoice
          </h1>
          <Form
            action={submitHandler.bind(null)}
            className='py-1'
          >
            <Form.Group
              controlId='vendor'
              className='py-1'
            >
              <Form.Label>
                Vendor
              </Form.Label>
              <Form.Control
                type='text'
                value={vendor}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setVendor(event.target.value)}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => event.key === 'Enter' && submitHandler()}
              />
            </Form.Group>
            <Form.Group
              controlId='date'
              className='py-1'
            >
              <Form.Label>
                Date
              </Form.Label>
              <Form.Control
                type='date'
                value={date}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setDate(event.target.value)}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => event.key === 'Enter' && submitHandler()}
              />
            </Form.Group>
            <Form.Group
              controlId='invoiceId'
              className='py-1'
            >
              <Form.Label>
                Invoice ID
              </Form.Label>
              <Form.Control
                type='text'
                value={invoiceId}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setInvoiceID(event.target.value)}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => event.key === 'Enter' && submitHandler()}
              />
            </Form.Group>
            <Form.Group
              controlId='subtotal'
              className='py-1'
            >
              <Form.Label>
                Subtotal
              </Form.Label>
              <Form.Control
                type='number'
                value={subtotal}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setSubtotal(event.target.value)}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => event.key === 'Enter' && submitHandler()}
              />
            </Form.Group>
            <Form.Group
              controlId='hst'
              className='py-1'
            >
              <Form.Label>
                HST
              </Form.Label>
              <Form.Control
                type='number'
                step='any'
                value={hst}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setHST(event.target.value)}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => event.key === 'Enter' && submitHandler()}
              />
            </Form.Group>
            <Form.Group
              controlId='total'
              className='py-1'
            >
              <Form.Label>
                Total
              </Form.Label>
              <Form.Control
                type='number'
                step='any'
                value={total}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setTotal(event.target.value)}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => event.key === 'Enter' && submitHandler()}
              />
            </Form.Group>
            <Button
              type='submit'
              variant='success'
              className='p-auto text-white'
              disabled={
                loading ||
                !vendor ||
                !date ||
                !invoiceId ||
                !subtotal ||
                !hst ||
                !total
              }
            >
              <FaCheck/> Save
            </Button> <Button
              type='button'
              variant='danger'
              className='p-auto text-white'
              disabled={loading}
              onClick={(): void => closeModal()}
            >
              <FaTimes/> Cancel
            </Button>
          </Form>
        </FormContainer>
      )}
    </Modal>
  )
}
export default EditInvoiceModal