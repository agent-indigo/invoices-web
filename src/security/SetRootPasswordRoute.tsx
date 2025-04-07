import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {useGetContext} from '../components/ContextProvider'
import ContextProps from '@/types/ContextProps'
const SetRootPasswordRoute = () => {
  const {configStatus}: ContextProps = useGetContext()
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
export default SetRootPasswordRoute