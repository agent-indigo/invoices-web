import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {useSelector} from 'react-redux'
const SetupRoute = () => {
  const {firstRun} = useSelector(state => state.firstRun)
  return firstRun ? (
    <Outlet/>
  ) : (
    <Navigate
      to='/home'
      replace
    />
  )
}
export default SetupRoute