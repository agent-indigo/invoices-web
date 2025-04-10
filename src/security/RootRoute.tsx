import {
  FunctionComponent,
  ReactElement
} from 'react'
import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useGetContext} from '../components/ContextProvider'
import ContextProps from '@/types/ContextProps'
const RootRoute: FunctionComponent = (): ReactElement => {
  const {user}: ContextProps = useGetContext()
  !(user?.role === 'root') && toast.error('You are not logged in as the root user.')
  return user?.role === 'root' ? (
    <Outlet/>
  ) : (
    <Navigate
      to='/'
      replace
    />
  )
}
export default RootRoute