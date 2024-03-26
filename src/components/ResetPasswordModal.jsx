import {useState} from 'react'
import {Form, Button, Modal} from 'react-bootstrap'
import {FaKey, FaTimes, FaCheck, FaEdit} from 'react-icons/fa'
import FormContainer from './FormContainer'
import Loader from './Loader'
import {useResetPasswordMutation} from '../slices/usersApiSlice'
import {toast} from 'react-toastify'
const ResetPasswordModal = ({pk, closeModal}) => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [resetPassword, {isLoading}] = useResetPasswordMutation()
    const submitHandler = async event => {
      event.preventDefault()
      try {
        const response = await resetPassword({
          pk, newPassword, confirmNewPassword}).unwrap()
        closeModal()
        toast.success(response.message)
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
  return (
    <Modal show={true} onHide={closeModal}>
        <FormContainer>
            <h1><FaKey/> Reset password</h1>
            <Form onSubmit={submitHandler} className='py-1'>
                <Form.Group controlId='newPassword' className='py-1'>
                <Form.Label><FaEdit/> New password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter new password'
                    value={newPassword}
                    onChange={event => setNewPassword(event.target.value)}
                    autoFocus
                />
                </Form.Group>
                <Form.Group controlId='confirmNewPassword' className='py-1'>
                <Form.Label><FaCheck/> Confirm new password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Confirm new password'
                    value={confirmNewPassword}
                    disabled={!newPassword}
                    onChange={event => setConfirmNewPassword(event.target.value)}
                    onKeyDown={event => enterKeyHandler(event)}
                />
                </Form.Group>
                <Button
                    type='submit'
                    variant='success'
                    className='p-auto text-white'
                    disabled={isLoading || !newPassword || !confirmNewPassword}
                ><FaCheck/> Reset</Button>
                {' '}
                <Button
                    type='button'
                    variant='danger'
                    className='p-auto text-white'
                    disabled={isLoading}
                    onClick={() => closeModal()}
                ><FaTimes/> Cancel</Button>
                {isLoading && <Loader/>}
            </Form>
        </FormContainer>
    </Modal>
  )
}
export default ResetPasswordModal