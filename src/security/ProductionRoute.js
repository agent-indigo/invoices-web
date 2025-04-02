import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {useSelector} from 'react-redux'
const ProductionRoute = () => {
  const {configStatus} = useSelector(state => state.configStatus)
  const {rootExists} = configStatus
  return configStatus && rootExists ? (
    <Outlet/>
  ) : (
    <Navigate
      to='/setRootUserPassword'
      replace
    />
  )
}
export default ProductionRoute