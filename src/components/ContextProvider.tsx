import {
  Context,
  createContext,
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
  useState
} from 'react'
import {toast} from 'react-toastify'
import ContextProps from '@/src/types/ContextProps'
import User from '@/src/types/User'
import Invoice from '@/src/types/Invoice'
import ConfigStatus from '@/src/types/ConfigStatus'
const AppContext: Context<ContextProps> = createContext<ContextProps>({
  users: [],
  setUsers: (): void => {},
  invoices: [],
  setInvoices: (): void => {},
  setUser: (): void => {},
  configStatus: {
    rootExists: false
  },
  setConfigStatus: (): void => {}
})
const ContextProvider: FunctionComponent<PropsWithChildren> = ({children}): ReactElement => {
  const [
    user,
    setUser
  ] = useState<User | undefined>(undefined)
  const [
    users,
    setUsers
  ] = useState<User[]>([])
  const [
    invoices,
    setInvoices
  ] = useState<Invoice[]>([])
  const [
    configStatus,
    setConfigStatus
  ] = useState<ConfigStatus>({
    rootExists: false
  })
  useEffect((): void => {(async (): Promise<void> => {
    const response: Response = await fetch('http://localhost:8080/config/status')
    response.ok ? setConfigStatus(await response.json()) : toast.error(await response.text())
  })()}, [])
  return (
    <AppContext.Provider value={{
      user,
      setUser,
      users,
      setUsers,
      invoices,
      setInvoices,
      configStatus,
      setConfigStatus
    }}>
      {children}
    </AppContext.Provider>
  )
}
export const useGetContext: Function = (): ContextProps => useContext<ContextProps>(AppContext)
export default ContextProvider