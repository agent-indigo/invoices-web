import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
  Button,
  Form
} from 'react-bootstrap'
import {
  FaFileInvoiceDollar,
  FaTimes,
  FaCheck
} from 'react-icons/fa'
import {Helmet} from 'react-helmet'
import {toast} from 'react-toastify'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useAddInvoiceMutation} from '../slices/invoicesApiSlice'
import enterKeyHandler from '../enterKeyHandler'
import Message from '../components/Message'
const AddInvoicePage = () => {
  const [
    vendor,
    setVendor
  ] = useState('')
  const [
    date,
    setDate
  ] = useState('')
  const [
    subtotal,
    setSubtotal
  ] = useState('')
  const [
    hst,
    setHST
  ] = useState('')
  const [
    total,
    setTotal
  ] = useState('')
  const [
    invoiceId,
    setInvoiceID
  ] = useState('')
  const [
    addInvoice, {
      isLoading,
      isError,
      error
    }
  ] = useAddInvoiceMutation()
  const navigate = useNavigate()
  const submitHandler = async event => {
    event.preventDefault()
    try {
      await addInvoice({
        vendor,
        date,
        subtotal,
        hst,
        total,
        invoiceId
      })
      navigate('/invoices/list')
      toast.success('Invoice added.')
    } catch (error) {
      toast.error(error.toString())
    }
  }
  return (
    <>
      <Helmet>
        <title>
          {isLoading ? 'Processing...' : isError? 'Error' : 'Add Invoice'} | Invoices
        </title>
      </Helmet>
      {isLoading ? (
        <Loader/>
      ) : isError ? (
        <Message variant='danger'>
          {error.toString()}
        </Message>
      ) : (
        <FormContainer>
          <h1>
            <FaFileInvoiceDollar/> Add invoice
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
                autoFocus
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
              onClick={() => navigate('/invoices/list')}
            >
              <FaTimes/> Cancel
            </Button>
            {isLoading && <Loader/>}
          </Form>
        </FormContainer>
      )}
    </>
  )
}
export default AddInvoicePage