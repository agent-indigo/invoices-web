import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useGetContext} from '../components/ContextProvider'
import ContextProps from '@/types/ContextProps'
const RootRoute = () => {
  const {user}: ContextProps = useGetContext()
  if (!user?.roles?.includes('root') || !user?.authorities?.includes('root')) toast.error('You are not logged in as the root user.')
  return user?.roles?.includes('root') || user?.authorities?.includes('root') ? (
    <Outlet/>
  ) : (
    <Navigate
      to='/home'
      replace
    />
  )
}
export default RootRoute