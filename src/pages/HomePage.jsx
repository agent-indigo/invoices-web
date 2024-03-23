import {LinkContainer} from 'react-router-bootstrap'
import {Card, Row} from 'react-bootstrap'
import {FaFileInvoiceDollar, FaUser} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {Helmet} from 'react-helmet'
const HomePage = () => {
  const {user} = useSelector(state => state.authentication)
  return (
    <>
      <Helmet>
        <title>Home | Invoices</title>
      </Helmet>
      <Row>
        <LinkContainer to='/invoices/list'>
          <Card
            bg='dark'
            className='m-auto p-auto text-white hover:bg-primary'
          >
            <FaFileInvoiceDollar/>Invoices
          </Card>
        </LinkContainer>
      </Row>
        {user.role === 'root' && (
          <Row>
            <LinkContainer to='/users/list'>
              <Card
                bg='dark'
                className='m-auto p-auto text-white hover:bg-primary'
              >
                <FaUser/>Users
              </Card>
            </LinkContainer>
          </Row>
        )}
    </>
  )
}
export default HomePage