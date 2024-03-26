import {useState} from 'react'
import{Button, Form, Modal} from 'react-bootstrap'
import {FaCheck, FaFileInvoiceDollar, FaTimes} from 'react-icons/fa'
import {toast} from 'react-toastify'
import FormContainer from './FormContainer'
import Loader from './Loader'
import {useEditInvoiceMutation} from '../slices/invoicesApiSlice'
const EditInvoiceModal = ({
    pk,
    Vendor,
    Date,
    Subtotal,
    HST,
    Total,
    InvoiceID,
    closeModal
}) => {
    const [vendor, setVendor] = useState(Vendor)
    const [date, setDate] = useState(Date)
    const [subtotal, setSubtotal] = useState(Subtotal)
    const [hst, setHST] = useState(HST)
    const [total, setTotal] = useState(Total)
    const [invoiceId, setInvoiceID] = useState(InvoiceID)
    const [editInvoice, {isLoading}] = useEditInvoiceMutation()
    const submitHandler = async event => {
        event.preventDefault()
        try {
            const response = await editInvoice({
                pk,
                vendor,
                subtotal,
                hst,
                total,
                invoiceId,
                date
            }).unwrap()
            closeModal()
            toast.success(response.message)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }
    const enterKeyHandler = event => {
        if (event.key === 'Enter') {
            event.preventDefault()
            submitHandler(event)
        }
    }
  return (
    <Modal show={true} onHide={closeModal}>
      <FormContainer>
        <h1><FaFileInvoiceDollar/> Edit invoice</h1>
        <Form onSubmit={submitHandler} className='py-1'>
            <Form.Group controlId='vendor' className='py-1'>
                <Form.Label>Vendor</Form.Label>
                <Form.Control
                    type='text'
                    value={vendor}
                    onChange={event => setVendor(event.target.value)}
                    onKeyDown={event => enterKeyHandler(event)}
                />
            </Form.Group>
            <Form.Group controlId='date' className='py-1'>
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type='date'
                    value={date}
                    onChange={event => setDate(event.target.value)}
                    onKeyDown={event => enterKeyHandler(event)}
                />
            </Form.Group>
            <Form.Group controlId='invoiceId' className='py-1'>
                <Form.Label>Invoice ID</Form.Label>
                <Form.Control
                    type='text'
                    value={invoiceId}
                    onChange={event => setInvoiceID(event.target.value)}
                    onKeyDown={event => enterKeyHandler(event)}
                />
            </Form.Group>
            <Form.Group controlId='subtotal' className='py-1'>
                <Form.Label>Subtotal</Form.Label>
                <Form.Control
                    type='number'
                    step='any'
                    value={subtotal}
                    onChange={event => setSubtotal(event.target.value)}
                    onKeyDown={event => enterKeyHandler(event)}
                />
            </Form.Group>
            <Form.Group controlId='hst' className='py-1'>
                <Form.Label>HST</Form.Label>
                <Form.Control
                    type='number'
                    step='any'
                    value={hst}
                    onChange={event => setHST(event.target.value)}
                    onKeyDown={event => enterKeyHandler(event)}
                />
            </Form.Group>
            <Form.Group controlId='total' className='py-1'>
                <Form.Label>Total</Form.Label>
                <Form.Control
                    type='number'
                    step='any'
                    value={total}
                    onChange={event => setTotal(event.target.value)}
                    onKeyDown={event => enterKeyHandler(event)}
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
            ><FaCheck/> Save</Button>
            {' '}
            <Button
                type='button'
                variant='danger'
                className='p-auto text-white'
                disabled={isLoading}
                onClick={() => closeModal()}
            ><FaTimes/> Cancel</Button>
            {isLoading && <Loader/>}
        </Form>
      </FormContainer>
    </Modal>
  )
}
export default EditInvoiceModal