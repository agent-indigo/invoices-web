import {
  useState,
  useEffect,
  FunctionComponent,
  ReactElement,
  ChangeEventHandler,
  ChangeEvent
} from 'react'
import {
  Alert,
  Button,
  Col,
  Form,
  Row,
  Table
} from 'react-bootstrap'
import {
  Link,
  NavigateFunction,
  useNavigate
} from 'react-router-dom'
import {
  FaEdit,
  FaPlus,
  FaTrash,
  FaSearch,
  FaFileInvoiceDollar,
  FaArrowUp,
  FaArrowDown,
  FaCheckDouble
} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {Helmet} from 'react-helmet'
import Loader from '../components/Loader'
import EditInvoiceModal from '../components/EditInvoiceModal'
import {useGetContext} from '../components/ContextProvider'
import ContextProps from '@/types/ContextProps'
import SortCriteria from '@/types/SortCriteria'
import Invoice from '@/types/Invoice'
import Data from '@/types/Data'
const InvoicesPage: FunctionComponent = (): ReactElement => {
  const {
    user,
    invoices,
    setInvoices
  }: ContextProps = useGetContext()
  const [
    loading,
    setLoading
  ] = useState<boolean>(false)
  const [
    deleting,
    setDeleting
  ] = useState<boolean>(false)
  const [
    errorOccured,
    setErrorOccured
  ] = useState<boolean>(false)
  const [
    error,
    setError
  ] = useState<string>('')
  const deleteHandler: Function = async (id: string): Promise<void> => {
    setDeleting(true)
    const response: Response = await fetch(
      `http://localhost:8080/invoices/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      }
    )
    if (response.ok) {
      toast.success('Invoice deleted.')
      setInvoices(invoices.filter((invoice: Invoice): boolean => invoice.id !== id))
    } else {
      toast.error(await response.text())
    }
    setDeleting(false)
  }
  const navigate: NavigateFunction = useNavigate()
  const [
    searchTerm,
    setSearchTerm
  ] = useState<string>('')
  const [
    searchDate,
    setSearchDate
  ] = useState<string>('')
  const [
    showEditInvoiceModal,
    setShowEditInvoiceModal
  ] = useState<boolean>(false)
  const [
    selectedInvoice,
    setSelectedInvoice
  ] = useState<Invoice | undefined>(undefined)
  const [
    selectedInvoices,
    setSelectedInvoices
  ] = useState<string[]>([])
  const [
    sortCriteria,
    setSortCriteria
  ] = useState<SortCriteria>({
    field: 'updatedAt',
    order: 'asc'
  })
  const sortHandler: Function = (
    field: keyof Data,
    order: 'asc' | 'desc'
  ): void => setSortCriteria({
    field,
    order
  })
  const openEditInvoiceModal: Function = (invoice: Invoice): void => {
    setSelectedInvoice(invoice)
    setShowEditInvoiceModal(true)
  }
  const closeEditInvoiceModal: Function = (): void => {
    setSelectedInvoice(undefined)
    setShowEditInvoiceModal(false)
  }
  const floatify: Function = (value: number): string => (Math.round(value * 100) / 100).toFixed(2)
  const bulkDeleteHandler: Function = async (): Promise<void> => {
    await Promise.all(selectedInvoices.map(async (id: string): Promise<void> => await deleteHandler(id)))
    setSelectedInvoices([])
    toast.success('Invoices deleted.')
  }
  const sortedInvoices: Invoice[] = [...invoices].sort((
    a: Invoice,
    b: Invoice
  ): number => {
    const {
      field,
      order
    }: SortCriteria = sortCriteria
    const orderFactor: number = order === 'asc' ? 1 : -1
    return (
      a[field] < b[field]
      ? orderFactor
      : a[field] > b[field]
      ? -orderFactor
      : 0
    )
  })
  const filteredInvoices: Invoice[] = sortedInvoices.filter((invoice: Invoice): boolean => (
    invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(invoice.date).toLocaleDateString() === searchDate
  ))
  const checkAllHandler: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>): void => (
    event.target.checked
    ? setSelectedInvoices(invoices.map((invoice: Invoice): string => invoice.id))
    : setSelectedInvoices([])
  )
  useEffect((): void => {(async (): Promise<void> => {
    setLoading(true)
    const response: Response = await fetch('http://localhost:8080/invoices')
    if (response.ok) {
      setInvoices(await response.json())
    } else {
      setErrorOccured(true)
      setError(await response.text())
    }
    setLoading(false)
  })()}, [
    setInvoices
  ])
  return (
    <>
      <Helmet>
        <title>
          {loading ? 'Loading...' : errorOccured ? 'Error' : 'Invoices'} | Invoices
        </title>
      </Helmet>
      {loading ? (
        <Loader/>
      ) : errorOccured ? (
        <Alert variant='danger'>
          {error}
        </Alert>
      ) : (
        <>
          <h1>
            <FaFileInvoiceDollar/> Invoices
          </h1>
          <Row className='mb-3'>
            <Col
              sm={4}
              className='d-flex align-items-center'
            >
              <FaSearch className='mx-1'/>
              <Form.Control
                type='text'
                placeholder='Search invoices'
                value={searchTerm}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setSearchTerm(event.target.value)}
              />
            </Col>
            <Col
              sm={4}
              className='d-flex align-items-center'
            >
              <Form.Control
                type='date'
                value={searchDate}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setSearchDate(event.target.value)}
              />
            </Col>
            <Col sm={2}>
              <Button
                type='button'
                variant='primary'
                onClick={(): void => navigate('/invoices/add')}
              >
                <FaPlus/> Add invoice
              </Button>
            </Col>
            <Col sm={2}>
              <Button
                type='button'
                variant='danger'
                disabled={selectedInvoices.length === 0}
                onClick={async (): Promise<void> => await bulkDeleteHandler()}
              >
                <FaTrash/> Delete selected
              </Button>
            </Col>
          </Row>
          <Table
            striped
            hover
            responsive
          >
            <thead>
              <tr>
                <th>
                  <FaCheckDouble/>
                  <Form.Check
                    type='checkbox'
                    checked={
                      filteredInvoices.length > 0 &&
                      filteredInvoices.length === selectedInvoices.length
                    }
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => checkAllHandler(event)}
                  />
                </th>
                <th>
                  Vendor
                  <div className="d-flex">
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'vendor',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'vendor',
                        'desc'
                      )}
                    >
                      <FaArrowDown/>
                    </Link>
                  </div>
                </th>
                <th>
                  Subtotal
                  <div className="d-flex">
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'subtotal',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'subtotal',
                        'desc'
                      )}
                    >
                      <FaArrowDown/>
                    </Link>
                  </div>
                </th>
                <th>
                  HST
                  <div className="d-flex">
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'hst',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'hst',
                        'desc'
                      )}
                    >
                      <FaArrowDown/>
                    </Link>
                  </div>
                </th>
                <th>
                  Total
                  <div className="d-flex">
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'total',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'total',
                        'desc'
                      )}
                    >
                      <FaArrowDown/>
                    </Link>
                  </div>
                </th>
                <th>
                  Invoice ID
                  <div className="d-flex">
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'invoiceId',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'invoiceId',
                        'desc'
                      )}
                    >
                      <FaArrowDown/>
                    </Link>
                  </div>
                </th>
                <th>
                  Date
                  <div className="d-flex">
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'date',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'date',
                        'desc'
                      )}
                    >
                      <FaArrowDown/>
                    </Link>
                  </div>
                </th>
                <th>
                  Registered
                  <div className="d-flex">
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'createdAt',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'createdAt',
                        'desc'
                      )}
                    >
                      <FaArrowDown/>
                    </Link>
                  </div>
                </th>
                <th>
                  Modified
                  <div className="d-flex">
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'updatedAt',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'updatedAt',
                        'desc'
                      )}
                    >
                      <FaArrowDown/>
                    </Link>
                  </div>
                </th>
                <th>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice: Invoice): ReactElement => (
                <tr key={invoice.id}>
                  <td>
                    <Form.Check
                      type='checkbox'
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                        const id: string = invoice.id
                        event.target.checked ? setSelectedInvoices([
                          ...selectedInvoices,
                          id
                        ]) : setSelectedInvoices(selectedInvoices.filter((pk: string): boolean => pk !== id))
                      }}
                    />
                  </td>
                  <td>
                    {invoice.vendor}
                  </td>
                  <td>
                    ${floatify(invoice.subtotal)}
                  </td>
                  <td>
                    ${floatify(invoice.hst)}
                  </td>
                  <td>
                    ${floatify(invoice.total)}
                  </td>
                  <td>
                    {invoice.invoiceId}
                  </td>
                  <td>
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(invoice.createdAt).toLocaleString()}
                  </td>
                  <td>
                    {invoice.createdAt === invoice.updatedAt ? null : new Date(invoice.updatedAt).toLocaleString()}
                  </td>
                  <td>
                    <Button
                      type='button'
                      variant='primary'
                      className='p-auto text-white'
                      onClick={(): void => openEditInvoiceModal(invoice)}
                    >
                      <FaEdit/> Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      type='button'
                      variant='danger'
                      className='p-auto text-white'
                      disabled={deleting}
                      onClick={async (): Promise<void> => await deleteHandler(invoice.id)}
                    >
                      <FaTrash/> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {showEditInvoiceModal && selectedInvoice && (
            <EditInvoiceModal
              invoice={selectedInvoice}
              closeModal={closeEditInvoiceModal}
            />
          )}
        </>
      )}
    </>
  )
}
export default InvoicesPage