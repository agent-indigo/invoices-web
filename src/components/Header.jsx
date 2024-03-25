import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import {
  FaUser,
  FaKey,
  FaArrowLeft,
  FaFileInvoiceDollar} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {useLazyLogoutQuery} from '../slices/usersApiSlice'
import {logout} from '../slices/authenticationSlice'
const Header = () => {
  const {user} = useSelector(state => state.authentication)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLazyLogoutQuery()
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/users/login')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  return (
    <header>
      <Navbar bg='dark' expand='sm' collapseOnSelect>
        <Container>
          <LinkContainer to='/home'>
            <Navbar.Brand className='text-white'>
              <FaFileInvoiceDollar/> Invoices
            </Navbar.Brand>
          </LinkContainer>
            {user && (
              <>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='ms-auto'>
                    <Navbar.Brand className='text-white'>
                      <FaUser/> {user.name}
                    </Navbar.Brand>
                    <Button
                      type='button'
                      variant='primary'
                      className='m-auto p-auto text-white'
                      onClick={() => navigate('/users/changePassword')}
                    ><FaKey/> Change password</Button>
                    <div className="px-1"/>
                    <Button
                      type='button'
                      variant='primary'
                      className='m-auto p-auto text-white'
                      onClick={logoutHandler}
                    ><FaArrowLeft/> Log out</Button>
                  </Nav>
                </Navbar.Collapse>
              </>
            )}
        </Container>
      </Navbar>
    </header>
  )
}
export default Header