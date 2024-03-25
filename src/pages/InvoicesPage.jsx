import {useState, useEffect} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
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
  useAddInvoiceMutation,
  useEditInvoiceMutation,
  useDeleteInvoiceMutation
} from '../slices/invoicesApiSlice'
import floatify from '../floatify'
import {Helmet} from 'react-helmet'
const InvoicesPage = () => {
  const {data: invoices, isLoading, isError, error, refetch} = useListInvoicesQuery()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedInvoicePk, setSelectedInvoicePk] = useState(null)
  const [selectedInvoices, setSelectedInvoices] = useState([])
  const [allInvoices, setAllInvoices] = useState([])
  const [sortCriteria, setSortCriteria] = useState({field: 'vendor', order: 'asc'})
  const [deleteInvoice, {isLoading: deleting}] = useDeleteInvoiceMutation()
  const [addInvoice, {isLoading: adding}] = useAddInvoiceMutation()
  const [editInvoice, {isLoading: editing}] = useEditInvoiceMutation()
  const sortHandler = (field, order) => {
    setSortCriteria({field, order})
  }
  const deleteHandler = async pk => {
    try {
      const response = await deleteInvoice(pk).unwrap()
      refetch()
      toast.success(response.message)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  const bulkDeleteHandler = async () => {
    try {
      await Promise.all(selectedInvoices.map(pk => deleteInvoice(pk).unwrap()))
      refetch()
      setSelectedInvoices([])
      toast.success('Invoices deleted.')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  useEffect(() => {
    setAllInvoices(invoices || [])
  }, [invoices])
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Processing... | Invoices</title>
        </Helmet>
        <Loader/>
      </>
    )
  } else if (isError) {
    return (
      <>
        <Helmet>
          <title>Error | Invoices</title>
        </Helmet>
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      </>
    )
  } else {
    const sortedInvoices = [...invoices].sort((a, b) => {
      const orderFactor = sortCriteria.order === 'asc' ? 1 : -1
      if (a[sortCriteria.field] < b[sortCriteria.field]) {
        return -1 * orderFactor
      } else if (a[sortCriteria.field] > b[sortCriteria.field]) {
        return 1 * orderFactor
      } else {
        return 0
      }
    })
    const filteredInvoices = sortedInvoices.filter(invoice =>
      invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const checkAllHandler = event => {
      if (event.target.checked) {
        setSelectedInvoices(allInvoices.map(invoice => invoice.pk))
      } else {
        setSelectedInvoices([])
      }
    }
    return (
      <>
        <Helmet>
          <title>List | Invoices</title>
        </Helmet>
        <h1><FaFileInvoiceDollar/> Invoices</h1>
        <Row className='mb-3'>
          <Col sm={8} className='d-flex align-items-center'>
            <FaSearch className='mx-1'/>
            <Form.Control
              type='text'
              placeholder='Search invoices'
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
          </Col>
          <Col sm={2}>
            <Button
              type='button'
              variant='primary'
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
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>
                <FaCheckDouble/>
                <Form.Check
                  type='checkbox'
                  checked={filteredInvoices.length > 0 &&
                    filteredInvoices.length === selectedInvoices.length}
                  onChange={event => checkAllHandler(event)}
                />
              </th>
              <th>
                Vendor
                <div className="d-flex">
                  <Link to={'#'} onClick={() => sortHandler('vendor', 'asc')}>
                    <FaArrowUp/>
                  </Link>
                  <Link to={'#'} onClick={() => sortHandler('vendor', 'desc')}>
                    <FaArrowDown/>
                  </Link>
                </div>
              </th>
              <th>
                Date
                <div className="d-flex">
                  <Link to={'#'} onClick={() => sortHandler('date', 'asc')}>
                    <FaArrowUp/>
                  </Link>
                  <Link to={'#'} onClick={() => sortHandler('date', 'desc')}>
                    <FaArrowDown/>
                  </Link>
                </div>
              </th>
              <th>
                Subtotal
                <div className="d-flex">
                  <Link to={'#'} onClick={() => sortHandler('subtotal', 'asc')}>
                    <FaArrowUp/>
                  </Link>
                  <Link to={'#'} onClick={() => sortHandler('subtotal', 'desc')}>
                    <FaArrowDown/>
                  </Link>
                </div>
              </th>
              <th>
                HST
                <div className="d-flex">
                  <Link to={'#'} onClick={() => sortHandler('hst', 'asc')}>
                    <FaArrowUp/>
                  </Link>
                  <Link to={'#'} onClick={() => sortHandler('hst', 'desc')}>
                    <FaArrowDown/>
                  </Link>
                </div>
              </th>
              <th>
                Total
                <div className="d-flex">
                  <Link to={'#'} onClick={() => sortHandler('total', 'asc')}>
                    <FaArrowUp/>
                  </Link>
                  <Link to={'#'} onClick={() => sortHandler('total', 'desc')}>
                    <FaArrowDown/>
                  </Link>
                </div>
              </th>
              <th>
                Invoice ID
                <div className="d-flex">
                  <Link to={'#'} onClick={() => sortHandler('invoiceId', 'asc')}>
                    <FaArrowUp/>
                  </Link>
                  <Link to={'#'} onClick={() => sortHandler('invoiceId', 'desc')}>
                    <FaArrowDown/>
                  </Link>
                </div>
              </th>
              <th>
                Registered
                <div className="d-flex">
                  <Link to={'#'} onClick={() => sortHandler('createdAt', 'asc')}>
                    <FaArrowUp/>
                  </Link>
                  <Link to={'#'} onClick={() => sortHandler('createdAt', 'desc')}>
                    <FaArrowDown/>
                  </Link>
                </div>
              </th>
              <th>
                Modified
                <div className="d-flex">
                  <Link to={'#'} onClick={() => sortHandler('updatedAt', 'asc')}>
                    <FaArrowUp/>
                  </Link>
                  <Link to={'#'} onClick={() => sortHandler('updatedAt', 'desc')}>
                    <FaArrowDown/>
                  </Link>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map(invoice => (
              <tr key={invoice.pk}>
                <td>
                  <Form.Check
                    type='checkbox'
                    checked={selectedInvoices.includes(invoice.pk)}
                    onChange={event => {
                      const pk = invoice.pk
                      if (event.target.selected) {
                        setSelectedInvoices([...selectedInvoices, pk])
                      } else {
                        setSelectedInvoices(selectedInvoices.filter(
                          id => id !== pk
                        ))
                      }
                    }}
                  />
                </td>
                <td>{invoice.vendor}</td>
                <td>{new Date(invoice.date).toLocaleString()}</td>
                <td>${floatify(invoice.subtotal)}</td>
                <td>${floatify(invoice.hst)}</td>
                <td>${floatify(invoice.total)}</td>
                <td>{invoice.invoiceId}</td>
                <td>{new Date(invoice.createdAt).toLocaleString()}</td>
                <td>{invoice.createdAt === invoice.updatedAt ? null : new Date(
                  invoice.updatedAt).toLocaleString()
                }</td>
                <td>
                  <Button
                    type='button'
                    variant='primary'
                    className='p-auto text-white'
                  >
                    <FaEdit/> Edit
                  </Button>
                  <Button
                    type='button'
                    variant='danger'
                    className='p-auto text-white'
                    onClick={() => deleteHandler(invoice.pk)}
                  >
                    <FaTrash/> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )
  }
}
export default InvoicesPage