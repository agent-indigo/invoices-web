import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
const RootRoute = () => {
  const {user} = useSelector(state => state.authentication)
  if (!user || user.role !== 'root') toast.error('You are not logged in as the root user.')
  return user && user.role === 'root' ? (
    <Outlet/>
  ) : (
    <Navigate
      to='/home'
      replace
    />
  )
}
export default RootRoute