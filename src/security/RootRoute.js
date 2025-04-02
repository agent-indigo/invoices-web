import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
const RootRoute = () => {
  const {user} = useSelector(state => state.authentication)
  const {role} = user
  if (!user || role !== 'root') toast.error('You are not logged in as the root user.')
  return user && role === 'root' ? (
    <Outlet/>
  ) : (
    <Navigate
      to='/home'
      replace
    />
  )
}
export default RootRoute