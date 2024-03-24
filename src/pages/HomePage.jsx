import {Button, Row} from 'react-bootstrap'
import {FaFileInvoiceDollar, FaUsers} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Helmet} from 'react-helmet'
const HomePage = () => {
  const navigate = useNavigate()
  const {user} = useSelector(state => state.authentication)
  return (
    <>
      <Helmet>
        <title>Home | Invoices</title>
      </Helmet>
      <Row>
        <Button
          type='button'
          variant='secondary'
          className='m-auto p-auto text-white'
          onClick={() => navigate('/invoices/list')}
        >
          <FaFileInvoiceDollar/> Invoices
        </Button>
      </Row>
        {user.role === 'root' && (
          <Row>
            <div className="py-1"></div>
            <Button
              type='button'
              variant='secondary'
              className='m-auto p-auto text-white'
              onClick={() => navigate('/users/list')}
            >
              <FaUsers/> Users
            </Button>
          </Row>
        )}
    </>
  )
}
export default HomePage