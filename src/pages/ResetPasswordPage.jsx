import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import {FaKey, FaTimes, FaCheck, FaEdit} from 'react-icons/fa'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useResetPasswordMutation} from '../slices/usersApiSlice'
import {toast} from 'react-toastify'
const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const navigate = useNavigate()
  const [resetPassword, {isLoading}] = useResetPasswordMutation()
  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || '/users/list'
  const submitHandler = async event => {
    event.preventDefault()
    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match.')
      return
    } else {
      try {
        await resetPassword({newPassword, confirmNewPassword}).unwrap()
        navigate(redirect)
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }
  const cancelHandler = () => {
    navigate(redirect)
  }
  return (
    <>
      <Helmet>
        <title>Reset password | Invoices</title>
      </Helmet>
      <FormContainer>
        <h1><FaKey/>Reset password</h1>
        <Form onSubmit={submitHandler}>
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
            ></Form.Control>
          </Form.Group>
          <Button
            type='submit'
            variant='primary'
            className='mt-2 mx-auto'
            disabled={isLoading}
          ><FaCheck/>Reset</Button>
          <Button
            type='submit'
            variant='dark'
            className='mt-2 mx-auto'
            onClick={cancelHandler}
        ><FaTimes/>Cancel</Button>
          {isLoading && <Loader/>}
        </Form>
      </FormContainer>
    </>
  )
}
export default ResetPasswordPage