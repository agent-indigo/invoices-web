import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import {FaWrench, FaKey, FaCheck} from 'react-icons/fa'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useCreateRootMutation} from '../slices/setupApiSlice'
import {useLoginMutation} from '../slices/usersApiSlice'
import {setCredentials} from '../slices/authenticationSlice'
import {setConfigStatus} from '../slices/configStatusSlice'
import {toast} from 'react-toastify'
const SetupPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const [createRoot, {isLoading}] = useCreateRootMutation()
  const [login] = useLoginMutation()
  const dispatch = useDispatch()
  const submitHandler = async event => {
    event.preventDefault()
    try {
      await createRoot({password, confirmPassword}).unwrap()
      dispatch(setConfigStatus(false))
      const response = await login({name: 'root', password}).unwrap()
      dispatch(setCredentials({...response}))
      navigate('/home')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  const enterKeyHandler = event => {
    if (event.key === 'Enter') {
        event.preventDefault()
        submitHandler(event)
    }
  }
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Processing... | Invoices</title>
        </Helmet>
        <Loader/>
      </>
    )
  } else {
    return (
      <>
        <Helmet>
          <title>Setup | Invoices</title>
        </Helmet>
        <FormContainer>
          <h1><FaWrench/> Setup</h1>
          <p>
            You are running this application for the first time.
            Please create a password for <strong>root</strong>.
          </p>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='password' className='my-3'>
              <Form.Label><FaKey/> Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={event => setPassword(event.target.value)}
                autoFocus
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='my-3'>
              <Form.Label><FaCheck/> Confirm password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
                onKeyDown={event => enterKeyHandler(event)}
              ></Form.Control>
            </Form.Group>
            <Button
              type='submit'
              variant='success'
              className='p-auto text-white'
              disabled={isLoading}
            ><FaCheck/> Confirm</Button>
            {isLoading && <Loader/>}
          </Form>
        </FormContainer>
      </>
    )
  }
}
export default SetupPage