import {
  FunctionComponent,
  ReactElement
} from 'react'
import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {useGetContext} from '../components/ContextProvider'
import ContextProps from '@/types/ContextProps'
import ConfigStatus from '@/types/ConfigStatus'
const ProductionRoute: FunctionComponent = (): ReactElement => {
  const {configStatus}: ContextProps = useGetContext()
  const {rootExists}: ConfigStatus = configStatus
  return rootExists ? (
    <Outlet/>
  ) : (
    <Navigate
      to='/setRootUserPassword'
      replace
    />
  )
}
export default ProductionRoute