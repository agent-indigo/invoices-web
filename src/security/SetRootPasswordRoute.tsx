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
const SetRootPasswordRoute: FunctionComponent = (): ReactElement => {
  const {configStatus}: ContextProps = useGetContext()
  const {rootExists}: ConfigStatus = configStatus
  return rootExists ? (
    <Navigate
      to='/'
      replace
    />
  ) : (
    <Outlet/>
  )
}
export default SetRootPasswordRoute