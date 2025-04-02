import {
  useState,
  useEffect
} from 'react'
import {useNavigate} from 'react-router-dom'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  Form,
  Button
} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import {
  FaKey,
  FaArrowRight,
  FaUser,
  FaUserTag
} from 'react-icons/fa'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useLoginMutation} from '../slices/usersApiSlice'
import {setCredentials} from '../slices/authenticationSlice'
import enterKeyHandler from '../enterKeyHandler'
import {toast} from 'react-toastify'
import Message from '../components/Message'
const LoginPage = () => {
  const [
    name,
    setName
  ] = useState('')
  const [
    password,
    setPassword
  ] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [
    login, {
      isLoading,
      isError,
      error
    }
  ] = useLoginMutation()
  const {user} = useSelector(state => state.authentication)
  useEffect(() => {
    user && navigate('/home')
  }, [
    user,
    navigate
  ])
  const submitHandler = async event => {
    event.preventDefault()
    try {
      const response = await login({
        name,
        password
      }).unwrap()
      dispatch(setCredentials({...response}))
      navigate('/home')
    } catch (error) {
      toast.error(error.toString())
    }
  }
  return (
    <>
      <Helmet>
        <title>
          {isLoading ? 'Processing...' : isError ? 'Error' : 'Log In'} | Invoices
        </title>
      </Helmet>
      {isLoading ? (
        <Loader/>
      ) : isError ? (
        <Message variant='danger'>
          {error.toString()}
        </Message>
      ) : (
        <FormContainer>
          <h1>
            <FaUser/> Log in
          </h1>
          <Form onSubmit={submitHandler}>
            <Form.Group
              controlId='name'
              className='my-3'
            >
              <Form.Label>
                <FaUserTag/> User name
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter user name'
                value={name}
                onChange={event => setName(event.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              controlId='password'
              className='my-3'
            >
              <Form.Label>
                <FaKey/> Password
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={event => setPassword(event.target.value)}
                onKeyDown={event => enterKeyHandler(
                  event,
                  submitHandler
                )}
              />
            </Form.Group>
            <Button
              type='submit'
              variant='success'
              className='p-auto text-white'
              disabled={isLoading || !name || !password}
            >
              Log in <FaArrowRight/>
            </Button>
            {isLoading && <Loader/>}
          </Form>
        </FormContainer>
      )}
    </>
  )
}
export default LoginPage