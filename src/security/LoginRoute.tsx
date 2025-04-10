import {
  FunctionComponent,
  ReactElement
} from 'react'
import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {useGetContext} from '../components/ContextProvider'
import ContextProps from '@/types/ContextProps'
const LoginRoute: FunctionComponent = (): ReactElement => {
  const {user}: ContextProps = useGetContext()
  return user ? (
    <Navigate
      to='/'
      replace
    />
  ) : (
    <Outlet/>
  )
}
export default LoginRoute