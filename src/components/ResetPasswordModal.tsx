import {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  ReactElement,
  useState
} from 'react'
import {
  Form,
  Button,
  Modal
} from 'react-bootstrap'
import {
  FaKey,
  FaTimes,
  FaCheck,
  FaEdit
} from 'react-icons/fa'
import {toast} from 'react-toastify'
import FormContainer from './FormContainer'
import Loader from './Loader'
import ResetPasswordMoadlProps from '@/types/ResetPasswordModalProps'
import ContextProps from '@/types/ContextProps'
import {useGetContext} from './ContextProvider'
import User from '@/types/User'
const ResetPasswordModal: FunctionComponent<ResetPasswordMoadlProps> = ({
  id,
  closeModal
}): ReactElement => {
  const {
    user,
    users,
    setUsers
  }: ContextProps = useGetContext()
  const [
    newPassword,
    setNewPassword
  ] = useState<string>('')
  const [
    confirmNewPassword,
    setConfirmNewPassword
  ] = useState<string>('')
  const [
    loading,
    setLoading
  ] = useState<boolean>(false)
  const submitHandler: Function = async (): Promise<void> => {
    setLoading(true)
    const response: Response = await fetch(
      `http://localhost:8080/users/resetPassword/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          newPassword,
          confirmNewPassword
        })
      }
    )
    if (response.ok) {
      const response: Response = await fetch(`http://localhost:8080/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        }
      })
      if (response.ok) {
        setUsers(users.filter((user: User): boolean => user.id !== id))
        setUsers([
          ...users,
          await response.json()
        ])
        closeModal()
        toast.success('Password changed.')
      } else {
        toast.error(await response.text())
      }
    } else {
      toast.error(await response.text())
    }
    setLoading(false)
  }
  return (
    <Modal
      show={true}
      onHide={(): void => closeModal()}
    >
      {loading ? (
        <Loader/>
      ) : (
        <FormContainer>
          <h1>
            <FaKey/> Reset password
          </h1>
          <Form
            className='py-1'
            action={submitHandler.bind(null)}
          >
            <Form.Group
              controlId='newPassword'
              className='py-1'
            >
              <Form.Label>
                <FaEdit/> New password
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter new password'
                value={newPassword}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setNewPassword(event.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              controlId='confirmNewPassword'
              className='py-1'
            >
              <Form.Label>
                <FaCheck/> Confirm new password
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm new password'
                value={confirmNewPassword}
                disabled={!newPassword}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setConfirmNewPassword(event.target.value)}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => event.key === 'Enter' && submitHandler()}
              />
            </Form.Group>
            <Button
              type='submit'
              variant='success'
              className='p-auto text-white'
              disabled={loading || !newPassword || !confirmNewPassword}
            >
              <FaCheck/> Reset
            </Button> <Button
              type='button'
              variant='danger'
              className='p-auto text-white'
              disabled={loading}
              onClick={(): void => closeModal()}
            >
              <FaTimes/> Cancel
            </Button>
          </Form>
        </FormContainer>
      )}
    </Modal>
  )
}
export default ResetPasswordModal