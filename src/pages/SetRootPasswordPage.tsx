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
  FaWrench,
  FaKey,
  FaCheck
} from 'react-icons/fa'
import {toast} from 'react-toastify'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useGetContext} from '../components/ContextProvider'
import ContextProps from '@/types/ContextProps'
const SetRootPasswordPage: FunctionComponent = (): ReactElement => {
  const [
    password,
    setPassword
  ] = useState<string>('')
  const [
    confirmPassword,
    setConfirmPassword
  ] = useState<string>('')
  const [
    loading,
    setLoading
  ] = useState<boolean>(false)
  const {
    setConfigStatus,
    setUser
  }: ContextProps = useGetContext()
  const navigate: NavigateFunction = useNavigate()
  const submitHandler: Function = async (): Promise<void> => {
    setLoading(true)
    const response: Response = await fetch(
      'http://localhost:8080/config/rootPassword', {
        method: 'POST',
        body: JSON.stringify({
          password,
          confirmPassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (response.ok) {
      setConfigStatus({
        rootExists: true
      })
      setUser(await response.json())
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
          {loading ? 'Processing...' : 'Setup'} | Invoices
        </title>
      </Helmet>
      {loading ? (
        <Loader/>
      ) : (
        <FormContainer>
          <h1>
            <FaWrench/> Setup
          </h1>
          <p>
            You are running this application for the first time.
            Please create a password for <strong>root</strong>.
          </p>
          <Form action={submitHandler.bind(null)}>
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
                autoFocus
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
              disabled={loading || !password || !confirmPassword}
            >
              <FaCheck/> Confirm
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}
export default SetRootPasswordPage