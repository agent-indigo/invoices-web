import {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  ReactElement,
  useState
} from 'react'
import {
  NavigateFunction,
  useNavigate
} from 'react-router-dom'
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
import {toast} from 'react-toastify'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import ContextProps from '@/types/ContextProps'
import {useGetContext} from '../components/ContextProvider'
import User from '@/types/User'
const ChangePasswordPage: FunctionComponent = (): ReactElement => {
  const {
    user,
    users,
    setUsers
  }: ContextProps = useGetContext()
  const [
    currentPassword,
    setCurrentPassword
  ] = useState<string>('')
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
  const navigate: NavigateFunction = useNavigate()
  const submitHandler: Function = async (): Promise<void> => {
    setLoading(true)
    const response: Response = await fetch(
      'http://localhost:8080/users/changePassword', {
        method: 'PATCH',
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmNewPassword
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        }
      }
    )
    if (response.ok) {
      const updatedUser: User = await response.json()
      setUsers(users.filter((user: User): boolean => user.id !== updatedUser.id))
      setUsers([
        ...users,
        updatedUser
      ])
      toast.success('Password changed.')
      navigate('/')
    } else {
      toast.error(await response.text())
    }
    setLoading(false)
  }
  return (
    <>
      <Helmet>
        <title>
          Add User | Invoices
        </title>
      </Helmet>
      {loading ? (
        <Loader/>
      ) : (
        <FormContainer>
          <h1>
            <FaKey/> Change password
          </h1>
          <Form action={submitHandler.bind(null)}>
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
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setCurrentPassword(event.target.value)}
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
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setNewPassword(event.target.value)}
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
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setConfirmNewPassword(event.target.value)}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => event.key === 'Enter' && submitHandler()}
              />
            </Form.Group>
            <Button
              type='submit'
              variant='success'
              className='p-auto text-white'
              disabled={loading || !newPassword || !confirmNewPassword}
            >
              <FaCheck/> Change
            </Button> <Button
              type='button'
              variant='danger'
              className='p-auto text-white'
              disabled={loading}
              onClick={() => navigate('/')}
            >
              <FaTimes/> Cancel
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}
export default ChangePasswordPage