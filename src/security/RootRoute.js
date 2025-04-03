import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
const RootRoute = () => {
  const {user} = useSelector(state => state.authentication)
  const {roles} = user
  if (!user || !roles.includes('root')) toast.error('You are not logged in as the root user.')
  return user && roles.includes('root') ? (
    <Outlet/>
  ) : (
    <Navigate
      to='/home'
      replace
    />
  )
}
export default RootRoute