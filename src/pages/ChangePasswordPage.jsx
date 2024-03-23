import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import {FaKey, FaTimes, FaCheck, FaEdit} from 'react-icons/fa'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useChangePasswordMutation} from '../slices/usersApiSlice'
import {toast} from 'react-toastify'
const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const navigate = useNavigate()
  const [changePassword, {isLoading}] = useChangePasswordMutation()
  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || '/home'
  const submitHandler = async event => {
    event.preventDefault()
    try {
      await changePassword({currentPassword, newPassword, confirmNewPassword}).unwrap()
      navigate(redirect)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  const cancelHandler = () => {
    navigate(redirect)
  }
  return (
    <>
      <Helmet>
        <title>Change password | Invoices</title>
      </Helmet>
      <FormContainer>
        <h1><FaKey/>Change password</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='currentPassword' className='my-3'>
            <Form.Label><FaEdit/><FaKey/>Current password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter current password'
              value={currentPassword}
              onChange={event => setCurrentPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='newPassword' className='my-3'>
            <Form.Label><FaEdit/>New password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter new password'
              value={newPassword}
              onChange={event => setNewPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmNewPassword' className='my-3'>
            <Form.Label><FaCheck/>Confirm new password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm new password'
              value={confirmNewPassword}
              onChange={event => setConfirmNewPassword(event.target.value)}
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
            className='mt-2 mx-auto text-white'
            disabled={isLoading}
          ><FaCheck/>Change</Button>
          <Button
            type='submit'
            variant='danger'
            className='mt-2 mx-auto text-white'
            onClick={cancelHandler}
        ><FaTimes/>Cancel</Button>
          {isLoading && <Loader/>}
        </Form>
      </FormContainer>
    </>
  )
}
export default ChangePasswordPage