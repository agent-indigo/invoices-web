import {useState} from 'react'
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
import {useEditInvoiceMutation} from '../slices/invoicesApiSlice'
import enterKeyHandler from '../enterKeyHandler'
const EditInvoiceModal = ({
  invoice,
  closeModal
}) => {
  const {id} = invoice
  const [
    vendor,
    setVendor
  ] = useState(invoice.vendor)
  const [
    date,
    setDate
  ] = useState(invoice.date)
  const [
    subtotal,
    setSubtotal
  ] = useState(invoice.subtotal)
  const [
    hst,
    setHST
  ] = useState(invoice.hst)
  const [
    total,
    setTotal
  ] = useState(invoice.total)
  const [
    invoiceId,
    setInvoiceID
  ] = useState(invoice.invoiceId)
  const [
    editInvoice, {
      isLoading
    }
  ] = useEditInvoiceMutation()
  const submitHandler = async event => {
    event.preventDefault()
    try {
      const patch = new FormData()
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
        subtotal
      )
      hst !== invoice.hst && patch.append(
        'hst',
        hst
      )
      total !== invoice.total && patch.append(
        'total',
        total
      )
      invoiceId !== invoice.invoiceId && patch.append(
        'invoiceId',
        invoiceId
      )
      const response = await editInvoice(
        id,
        JSON.stringify(Object.fromEntries(patch.entries()))
      ).unwrap()
      closeModal()
      toast.success(response.message)
    } catch (error) {
      toast.error(error.toString())
    }
  }
  return (
    <Modal
      show={true}
      onHide={closeModal}
    >
      <FormContainer>
        <h1>
          <FaFileInvoiceDollar/> Edit invoice
        </h1>
        <Form
          onSubmit={submitHandler}
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
              onChange={event => setVendor(event.target.value)}
              onKeyDown={event => enterKeyHandler(
                event,
                submitHandler
              )}
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
              onChange={event => setDate(event.target.value)}
              onKeyDown={event => enterKeyHandler(
                event,
                submitHandler
              )}
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
              onChange={event => setInvoiceID(event.target.value)}
              onKeyDown={event => enterKeyHandler(
                event,
                submitHandler
              )}
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
              step='any'
              value={subtotal}
              onChange={event => setSubtotal(event.target.value)}
              onKeyDown={event => enterKeyHandler(
                event,
                submitHandler
              )}
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
              onChange={event => setHST(event.target.value)}
              onKeyDown={event => enterKeyHandler(
                event,
                submitHandler
              )}
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
              onChange={event => setTotal(event.target.value)}
              onKeyDown={event => enterKeyHandler(
                event,
                submitHandler
              )}
            />
          </Form.Group>
          <Button
            type='submit'
            variant='success'
            className='p-auto text-white'
            disabled={
              isLoading ||
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
            disabled={isLoading}
            onClick={() => closeModal()}
          >
            <FaTimes/> Cancel
          </Button>
          {isLoading && <Loader/>}
        </Form>
      </FormContainer>
    </Modal>
  )
}
export default EditInvoiceModal