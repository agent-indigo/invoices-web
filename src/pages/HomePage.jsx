import {Button, Card, Col, Row} from 'react-bootstrap'
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
      <Card bg='light' className='py-3'>
        <Row>
          <Col sm={5}/>
          <Col xs={2}>
            <Button
              type='button'
              variant='primary'
              className='m-auto p-auto text-white'
              onClick={() => navigate('/invoices/list')}
            >
              <FaFileInvoiceDollar/> Invoices
            </Button>
          </Col>
          <Col sm={5}/>
        </Row>
        {user.role === 'root' && (
          <Row>
            <div className="py-1"></div>
            <Col sm={5}/>
            <Col xs={2}>
              <Button
                type='button'
                variant='primary'
                className='m-auto p-auto text-white'
                onClick={() => navigate('/users/list')}
              >
                <FaUsers/> Users
              </Button>
            </Col>
            <Col sm={5}/>
          </Row>
        )}        
      </Card>
    </>
  )
}
export default HomePage