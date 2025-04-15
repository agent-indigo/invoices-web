import {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  ReactElement,
  useState
} from 'react'
import {
  NavigateFunction,
  useNavigate
} from 'react-router-dom'
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
import ContextProps from '@/types/ContextProps'
import {useGetContext} from '../components/ContextProvider'
const AddInvoicePage: FunctionComponent = (): ReactElement => {
  const {
    user,
    invoices,
    setInvoices
  }: ContextProps = useGetContext()
  const [
    vendor,
    setVendor
  ] = useState<string>('')
  const [
    date,
    setDate
  ] = useState<string>('')
  const [
    subtotal,
    setSubtotal
  ] = useState<string>('')
  const [
    hst,
    setHST
  ] = useState<string>('')
  const [
    total,
    setTotal
  ] = useState<string>('')
  const [
    invoiceId,
    setInvoiceID
  ] = useState<string>('')
  const [
    loading,
    setLoading
  ] = useState<boolean>(false)
  const navigate: NavigateFunction = useNavigate()
  const submitHandler: Function = async (): Promise<void> => {
    setLoading(true)
    const response: Response = await fetch(
      'http://localhost:8080/invoices', {
        method: 'POST',
        body: JSON.stringify({
          vendor,
          date,
          subtotal,
          hst,
          total,
          invoiceId
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        }
      }
    )
    if (response.ok) {
      setInvoices([
        ...invoices,
        await response.json()
      ])
      navigate('/invoices/list')
      toast.success('Invoice added.')
    } else {
      toast.error(await response.text())
    }
    setLoading(false)
  }
  return (
    <>
      <Helmet>
        <title>
          {loading ? 'Processing...' : 'Add Invoice'} | Invoices
        </title>
      </Helmet>
      {loading ? (
        <Loader/>
      ) : (
        <FormContainer>
          <h1>
            <FaFileInvoiceDollar/> Add invoice
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
                step='any'
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
              onClick={(): void => navigate('/invoices/list')}
            >
              <FaTimes/> Cancel
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}
export default AddInvoicePage