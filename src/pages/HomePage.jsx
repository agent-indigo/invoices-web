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
          <Col xs={2} sm={5}/>
          <Col xs={8} sm={2}>
            <Button
              type='button'
              variant='primary'
              className='px-1 text-white'
              onClick={() => navigate('/invoices/list')}
            >
              <FaFileInvoiceDollar/> Invoices
            </Button>
          </Col>
          <Col xs={2} sm={5}/>
        </Row>
        {user.role === 'root' && (
          <Row>
            <div className="py-1"/>
            <Col xs={2} sm={5}/>
            <Col xs={8} sm={2}>
              <Button
                type='button'
                variant='primary'
                className='text-white'
                onClick={() => navigate('/users/list')}
              >
                <FaUsers/> Users
              </Button>
            </Col>
            <Col xs={2} sm={5}/>
          </Row>
        )}
      </Card>
    </>
  )
}
export default HomePage