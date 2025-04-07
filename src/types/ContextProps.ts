import {
  Dispatch,
  SetStateAction
} from 'react'
import Invoice from '@/src/types/Invoice'
import User from '@/src/types/User'
import ConfigStatus from '@/src/types/ConfigStatus'
export default interface ContextProps {
  user?: User
  setUser: Dispatch<SetStateAction<User | undefined>>
  users: User[]
  setUsers: Dispatch<SetStateAction<User[]>>
  invoices: Invoice[]
  setInvoices: Dispatch<SetStateAction<Invoice[]>>
  configStatus: ConfigStatus
  setConfigStatus: Dispatch<SetStateAction<ConfigStatus>>
}