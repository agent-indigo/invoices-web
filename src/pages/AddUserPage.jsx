import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import {FaUser, FaPlus, FaKey, FaTimes, FaCheck, FaUserTag} from 'react-icons/fa'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useAddUserMutation} from '../slices/usersApiSlice'
import {toast} from 'react-toastify'
const AddUserPage = () => {
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const [addUser, {isLoading}] = useAddUserMutation()
  const submitHandler = async event => {
    event.preventDefault()
    try {
      const response = await addUser({password, confirmPassword}).unwrap()
      navigate('/users/list')
      toast.success(response.message)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
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
          <title>Add user | Invoices</title>
        </Helmet>
        <FormContainer>
          <h1><FaPlus/><FaUser/>Add user</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-3'>
              <Form.Label><FaUserTag/>User name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={event => setName(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    submitHandler(event);
                  }
                }}
                autoFocus
              ></Form.Control>
            </Form.Group>
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
            ><FaCheck/>Add</Button>
            {' '}
            <Button
              type='button'
              variant='danger'
              className='m-auto p-auto text-white'
              disabled={isLoading}
              onClick={() => navigate('/users/list')}
          ><FaTimes/>Cancel</Button>
            {isLoading && <Loader/>}
          </Form>
        </FormContainer>
      </>
    )
  }
}
export default AddUserPage