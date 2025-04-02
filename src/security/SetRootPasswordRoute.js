import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {useSelector} from 'react-redux'
const SetRootPasswordRoute = () => {
  const {configStatus} = useSelector(state => state.configStatus)
  const {rootExists} = configStatus
  return configStatus && rootExists ? (
    <Navigate
      to='/home'
      replace
    />
  ) : (
    <Outlet/>
  )
}
export default SetRootPasswordRoute