import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {useSelector} from 'react-redux'
const SetupRoute = () => {
  const {configStatus} = useSelector(state => state.configStatus)
  const {rootExists} = configStatus
  return rootExists ? (
    <Navigate
      to='/home'
      replace
    />
  ) : (
    <Outlet/>
  )
}
export default SetupRoute