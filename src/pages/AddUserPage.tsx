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
  FaUser,
  FaKey,
  FaTimes,
  FaCheck,
  FaUserTag
} from 'react-icons/fa'
import {toast} from 'react-toastify'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import ContextProps from '@/types/ContextProps'
import {useGetContext} from '../components/ContextProvider'
const AddUserPage: FunctionComponent = (): ReactElement => {
  const {
    user,
    users,
    setUsers
  }: ContextProps = useGetContext()
  const [
    password,
    setPassword
  ] = useState<string>('')
  const [
    username,
    setUsername
  ] = useState<string>('')
  const [
    confirmPassword,
    setConfirmPassword
  ] = useState<string>('')
  const [
    loading,
    setLoading
  ] = useState<boolean>(false)
  const navigate: NavigateFunction = useNavigate()
  const submitHandler: Function = async (): Promise<void> => {
    setLoading(true)
    const response: Response = await fetch(
      'http://localhost:8080/users', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          confirmPassword
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        }
      }
    )
    if (response.ok) {
      setUsers([
        ...users,
        await response.json()
      ])
      navigate('/users/list')
      toast.success('User added.')
    } else {
      toast.error(await response.text())
    }
    setLoading(false)
  }
  return (
    <>
      <Helmet>
        <title>
          {loading ? 'Processing...' : 'Add User'} | Invoices
        </title>
      </Helmet>
      {loading ? (
        <Loader/>
      ) : (
        <FormContainer>
          <h1>
            <FaUser/> Add user
          </h1>
          <Form action={submitHandler.bind(null)}>
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
                value={username}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setUsername(event.target.value)}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => event.key === 'Enter' && submitHandler()}
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
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value)}
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
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setConfirmPassword(event.target.value)}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => event.key === 'Enter' && submitHandler()}
              />
            </Form.Group>
            <Button
              type='submit'
              variant='success'
              className='p-auto text-white'
              disabled={
                loading ||
                !username ||
                !password ||
                !confirmPassword
              }
            >
              <FaCheck/> Add
            </Button> <Button
              type='button'
              variant='danger'
              className='p-auto text-white'
              disabled={loading}
              onClick={() => navigate('/users/list')}
            >
              <FaTimes/> Cancel
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}
export default AddUserPage