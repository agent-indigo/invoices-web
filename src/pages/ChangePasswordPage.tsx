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
import FormContainer from '@/src/components/FormContainer'
import Loader from '@/src/components/Loader'
const ChangePasswordPage: FunctionComponent = (): ReactElement => {
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
      'http://localhost:8080', {
        method: 'PATCH',
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmNewPassword
        })
      }
    )
    if (response.ok) {
      toast.success('Password changed.')
      navigate('/home')
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
              onClick={() => navigate('/home')}
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