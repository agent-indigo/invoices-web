import {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import {FaKey, FaArrowRight, FaUser, FaUserTag} from 'react-icons/fa'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useLoginMutation} from '../slices/usersApiSlice'
import {setCredentials} from '../slices/authenticationSlice'
import {toast} from 'react-toastify'
const LoginPage = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, {isLoading}] = useLoginMutation()
  const {user} = useSelector(state => state.authentication)
  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || '/home'
  useEffect(() => {
    if (user) {
      navigate(redirect)
    }
  }, [user, redirect, navigate])
  const submitHandler = async event => {
    event.preventDefault()
    try {
      const response = await login({name, password}).unwrap()
      dispatch(setCredentials({...response}))
      navigate(redirect)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  return (
    <>
      <Helmet>
        <title>Log In | Invoices</title>
      </Helmet>
      <FormContainer>
        <h1><FaUser/>Log in</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-3'>
            <Form.Label><FaUserTag/>User name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter user name...'
              value={name}
              onChange={event => setName(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className='my-3'>
            <Form.Label><FaKey/>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password...'
              value={password}
              onChange={event => setPassword(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  submitHandler(event);
                }
              }}
            ></Form.Control>
          </Form.Group>
          <Button
            type='submit'
            variant='success'
            className='m-auto p-auto text-white'
            disabled={isLoading}
          >
            Log in <FaArrowRight/>
          </Button>
          {isLoading && <Loader/>}
        </Form>
      </FormContainer>
    </>
  )
}
export default LoginPage