import {
  useState,
  useEffect
} from 'react'
import {
  Button,
  Col,
  Form,
  Row,
  Table
} from 'react-bootstrap'
import {
  Link,
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
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  useListInvoicesQuery,
  useDeleteInvoiceMutation
} from '../slices/invoicesApiSlice'
import EditInvoiceModal from '../components/EditInvoiceModal'
import {Helmet} from 'react-helmet'
const InvoicesPage = () => {
  const {
    data: invoices,
    isLoading,
    isError,
    error,
    refetch
  } = useListInvoicesQuery()
  const navigate = useNavigate()
  const [
    searchTerm,
    setSearchTerm
  ] = useState('')
  const [
    searchDate,
    setSearchDate
  ] = useState('')
  const [
    showEditInvoiceModal,
    setShowEditInvoiceModal
  ] = useState(false)
  const [
    selectedInvoice,
    setSelectedInvoice
  ] = useState(null)
  const [
    selectedInvoices,
    setSelectedInvoices
  ] = useState([])
  const [
    allInvoices,
    setAllInvoices
  ] = useState([])
  const [
    sortCriteria,
    setSortCriteria
  ] = useState({
    field: 'vendor',
    order: 'asc'
  })
  const [deleteInvoice, {
    isLoading: deleting
  }] = useDeleteInvoiceMutation()
  const sortHandler = (
    field,
    order
  ) => setSortCriteria({
    field,
    order
  })
  const openEditInvoiceModal = invoice => {
    setSelectedInvoice(invoice)
    setShowEditInvoiceModal(true)
  }
  const closeEditInvoiceModal = () => {
    setSelectedInvoice(null)
    setShowEditInvoiceModal(false)
  }
  const floatify = number => (Math.round(number * 100) / 100).toFixed(2)
  const deleteHandler = async id => {
    try {
      const response = await deleteInvoice(id).unwrap()
      refetch()
      toast.success(response.message)
    } catch (error) {
      toast.error(error.toString())
    }
  }
  const bulkDeleteHandler = async () => {
    try {
      await Promise.all(selectedInvoices.map(id => deleteInvoice(id).unwrap()))
      refetch()
      setSelectedInvoices([])
      toast.success('Invoices deleted.')
    } catch (error) {
      toast.error(error.toString())
    }
  }
  const sortedInvoices = [...invoices].sort((
    a,
    b
  ) => {
    const orderFactor = sortCriteria.order === 'asc' ? 1 : -1
    return a[sortCriteria.field] < b[sortCriteria.field]
    ? orderFactor
    : a[sortCriteria.field] > b[sortCriteria.field]
    ? -orderFactor
    : 0
  })
  const filteredInvoices = sortedInvoices.filter(invoice =>
    invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(invoice.date).toLocaleDateString() === searchDate
  )
  const checkAllHandler = event => event.target.checked
  ? setSelectedInvoices(allInvoices.map(invoice => invoice.id))
  : setSelectedInvoices([])
  useEffect(() => setAllInvoices(invoices ?? []), [
    invoices
  ])
  return (
    <>
      <Helmet>
        <title>
          {isLoading ? 'Loading...' : isError ? 'Error' : 'Invoices'} | Invoices
        </title>
      </Helmet>
      {isLoading ? (
        <Loader/>
      ) : isError ? (
        <Message variant='danger'>
          {error?.data?.message?.toString() ?? error?.error.toString()}
        </Message>
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
                onChange={event => setSearchTerm(event.target.value)}
              />
            </Col>
            <Col
              sm={4}
              className='d-flex align-items-center'
            >
              <Form.Control
                type='date'
                value={searchDate}
                onChange={event => setSearchDate(event.target.value)}
              />
            </Col>
            <Col sm={2}>
              <Button
                type='button'
                variant='primary'
                onClick={() => navigate('/invoices/add')}
              >
                <FaPlus/> Add invoice
              </Button>
            </Col>
            <Col sm={2}>
              <Button
                type='button'
                variant='danger'
                disabled={selectedInvoices.length === 0}
                onClick={bulkDeleteHandler}
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
                    onChange={event => checkAllHandler(event)}
                  />
                </th>
                <th>
                  Vendor
                  <div className="d-flex">
                    <Link
                      to={'#'}
                      onClick={() => sortHandler(
                        'vendor',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={() => sortHandler(
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
                      onClick={() => sortHandler(
                        'subtotal',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={() => sortHandler(
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
                      onClick={() => sortHandler(
                        'hst',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={() => sortHandler(
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
                      onClick={() => sortHandler(
                        'total',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={() => sortHandler(
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
                      onClick={() => sortHandler(
                        'invoiceId',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={() => sortHandler(
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
                      onClick={() => sortHandler(
                        'date',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={() => sortHandler(
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
                      onClick={() => sortHandler(
                        'createdAt',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={() => sortHandler(
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
                      onClick={() => sortHandler(
                        'updatedAt',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={() => sortHandler(
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
              {filteredInvoices.map(invoice => (
                <tr key={invoice.id}>
                  <td>
                    <Form.Check
                      type='checkbox'
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={event => {
                        const id = invoice.id
                        event.target.checked ? setSelectedInvoices([
                          ...selectedInvoices,
                          id
                        ]) : setSelectedInvoices(selectedInvoices.filter(pk => pk !== id))
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
                      onClick={() => openEditInvoiceModal(invoice)}
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
                      onClick={() => deleteHandler(invoice.id)}
                    >
                      <FaTrash/> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {showEditInvoiceModal && (
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