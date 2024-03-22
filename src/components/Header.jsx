import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import {FaUser, FaKey, FaArrowLeft} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
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
      console.error(error)
    }
  }
  const changePasswordHandler = () => {
    navigate('/users/changePassword')
  }
  return (
    <header>
      <Navbar bg='primary' variant='primary' expand='sm' collapseOnSelect>
        <Container>
          <LinkContainer to='/home'>
            <Navbar.Brand className='text-white'>
              Invoices
            </Navbar.Brand>
          </LinkContainer>
            {user && (
              <>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='ms-auto'>
                    <FaUser/>
                    {`${user.name} `}
                    <Button
                      type='submit'
                      variant='dark'
                      className='mt-2 mx-auto text-white'
                      onClick={changePasswordHandler}
                    ><FaKey/>Change password</Button>
                    <Button
                      type='submit'
                      variant='dark'
                      className='mt-2 mx-auto text-white'
                      onClick={logoutHandler}
                    ><FaArrowLeft/>Log out</Button>
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