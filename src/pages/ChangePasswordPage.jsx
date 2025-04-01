import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
  Form,
  Button
} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import {
  FaKey,
  FaTimes,
  FaCheck,
  FaEdit
} from 'react-icons/fa'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useChangePasswordMutation} from '../slices/usersApiSlice'
import enterKeyHandler from '../enterKeyHandler'
import {toast} from 'react-toastify'
import Message from '../components/Message'
const ChangePasswordPage = () => {
  const [
    currentPassword,
    setCurrentPassword
  ] = useState('')
  const [
    newPassword,
    setNewPassword
  ] = useState('')
  const [
    confirmNewPassword,
    setConfirmNewPassword
  ] = useState('')
  const navigate = useNavigate()
  const [
    changePassword, {
      isLoading,
      isError,
      error
    }
  ] = useChangePasswordMutation()
  const submitHandler = async event => {
    event.preventDefault()
    try {
      const response = await changePassword({
        currentPassword,
        newPassword,
        confirmNewPassword
      }).unwrap()
      navigate('/home')
      toast.success(response.message)
    } catch (error) {
      toast.error(error.toString())
    }
  }
  return (
    <>
      <Helmet>
        <title>
          {isLoading ? 'Processing...' : isError ? 'Error' : 'Change Password'} | Invoices
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
            <FaKey/> Change password
          </h1>
          <Form onSubmit={submitHandler}>
            <Form.Group
              controlId='currentPassword'
              className='my-3'
            >
              <Form.Label>
                <FaKey/> Current password
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter current password'
                value={currentPassword}
                onChange={event => setCurrentPassword(event.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              controlId='newPassword'
              className='my-3'
            >
              <Form.Label>
                <FaEdit/> New password
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter new password'
                value={newPassword}
                onChange={event => setNewPassword(event.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId='confirmNewPassword'
              className='my-3'
            >
              <Form.Label>
                <FaCheck/> Confirm new password
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm new password'
                value={confirmNewPassword}
                onChange={event => setConfirmNewPassword(event.target.value)}
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
              disabled={isLoading || !newPassword || !confirmNewPassword}
            >
              <FaCheck/> Change
            </Button> <Button
              type='button'
              variant='danger'
              className='p-auto text-white'
              disabled={isLoading}
              onClick={() => navigate('/home')}
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
export default ChangePasswordPage