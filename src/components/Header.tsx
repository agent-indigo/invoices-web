import {
  FunctionComponent,
  ReactElement
} from 'react'
import {
  Navbar,
  Nav,
  Container,
  Button
} from 'react-bootstrap'
import {
  FaUser,
  FaKey,
  FaArrowLeft,
  FaFileInvoiceDollar
} from 'react-icons/fa'
import {
  NavigateFunction,
  useNavigate
} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {toast} from 'react-toastify'
import {useGetContext} from './ContextProvider'
import ContextProps from '@/types/ContextProps'
const Header: FunctionComponent = (): ReactElement => {
  const {
    user,
    setUser,
    setUsers,
    setInvoices
  }: ContextProps = useGetContext()
  const navigate: NavigateFunction = useNavigate()
  const logoutHandler: Function = async (): Promise<void> => {
    const response: Response = await fetch('http://localhost:8080/users/logout', {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    if (response.ok) {
      setUser(undefined)
      setUsers([])
      setInvoices([])
      navigate('/users/login')
      toast.success('Logged out.')
    } else {
      toast.error(await response.text())
    }
  }
  return (
    <header>
      <Navbar
        bg='dark'
        expand='sm'
        collapseOnSelect
        className='text-center'
      >
        <Container className='justify-content-center'>
          <LinkContainer to='/'>
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
                    <FaUser/> {user.username}
                  </Navbar.Brand>
                  <Button
                    type='button'
                    variant='primary'
                    className='p-auto text-white'
                    onClick={(): void => navigate('/users/changePassword')}
                  >
                    <FaKey/> Change password
                  </Button>
                  <div className="px-1 py-1"/>
                  <Button
                    type='button'
                    variant='primary'
                    className='p-auto text-white'
                    onClick={(): void => logoutHandler()}
                  >
                    <FaArrowLeft/> Log out
                  </Button>
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