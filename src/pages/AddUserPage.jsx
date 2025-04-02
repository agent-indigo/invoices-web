import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
  Form,
  Button
} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import {
  FaUser,
  FaKey,
  FaTimes,
  FaCheck,
  FaUserTag
} from 'react-icons/fa'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useAddUserMutation} from '../slices/usersApiSlice'
import enterKeyHandler from '../enterKeyHandler'
import {toast} from 'react-toastify'
import Message from '../components/Message'
const AddUserPage = () => {
  const [
    password,
    setPassword
  ] = useState('')
  const [
    name,
    setName
  ] = useState('')
  const [
    confirmPassword,
    setConfirmPassword
  ] = useState('')
  const navigate = useNavigate()
  const [
    addUser, {
      isLoading,
      isError,
      error
    }
  ] = useAddUserMutation()
  const submitHandler = async event => {
    event.preventDefault()
    try {
      await addUser({
        name,
        password,
        confirmPassword
      })
      navigate('/users/list')
      toast.success('User added.')
    } catch (error) {
      toast.error(error.toString())
    }
  }
  return (
    <>
      <Helmet>
        <title>
          {isLoading ? 'Processing...' : isError ? 'Error' : 'Add User'} | Invoices
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
            <FaUser/> Add user
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
                onKeyDown={event => enterKeyHandler(
                  event,
                  submitHandler
                )}
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
              />
            </Form.Group>
            <Form.Group
              controlId='confirmPassword'
              className='my-3'
            >
              <Form.Label>
                <FaCheck/> Confirm password
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
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
              disabled={
                isLoading ||
                !name ||
                !password ||
                !confirmPassword
              }
            >
              <FaCheck/> Add
            </Button> <Button
              type='button'
              variant='danger'
              className='p-auto text-white'
              disabled={isLoading}
              onClick={() => navigate('/users/list')}
            >
              <FaTimes/> Cancel
            </Button>
            {isLoading && <Loader/>}
          </Form>
        </FormContainer>
      )}
    </>
  )
}
export default AddUserPage