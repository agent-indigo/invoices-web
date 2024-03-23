import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import {FaWrench, FaKey, FaCheck} from 'react-icons/fa'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useCreateRootMutation} from '../slices/setupApiSlice'
import {useLoginMutation} from '../slices/usersApiSlice'
import {setCredentials} from '../slices/authenticationSlice'
import {toast} from 'react-toastify'
const SetupPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const [createRoot, {isLoading}] = useCreateRootMutation()
  const [login] = useLoginMutation()
  const dispatch = useDispatch()
  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || '/home'
  const submitHandler = async event => {
    event.preventDefault()
    try {
      await createRoot({password, confirmPassword}).unwrap()
      const response = await login('root', password).unwrap()
      dispatch(setCredentials({...response}))
      navigate(redirect)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  return (
    <>
      <Helmet>
        <title>Setup | Invoices</title>
      </Helmet>
      <FormContainer>
        <h1><FaWrench/>Setup</h1>
        <p>
          You are running this application for the first time.
          Please create a password for <strong>root</strong>.
        </p>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='password' className='my-3'>
            <Form.Label><FaKey/>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={event => setPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword' className='my-3'>
            <Form.Label><FaCheck/>Confirm password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
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
          ><FaCheck/>Confirm</Button>
          {isLoading && <Loader/>}
        </Form>
      </FormContainer>
    </>
  )
}
export default SetupPage