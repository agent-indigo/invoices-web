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
const PrivateRoute: FunctionComponent = (): ReactElement => {
  const {user}: ContextProps = useGetContext()
  return user ? (
    <Outlet/>
  ) : (
    <Navigate
      to='/users/login'
      replace
    />
  )
}
export default PrivateRoute