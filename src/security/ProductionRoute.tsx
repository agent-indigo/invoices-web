import {
  FunctionComponent,
  ReactElement
} from 'react'
import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {useGetContext} from '@/src/components/ContextProvider'
import ContextProps from '@/src/types/ContextProps'
const ProductionRoute: FunctionComponent = (): ReactElement => {
  const {configStatus}: ContextProps = useGetContext()
  const {rootExists} = configStatus
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