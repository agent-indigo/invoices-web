import Data from '@/types/Data'
export default interface User extends Data {
  username: string
  role: 'root' | 'user'
  token: string
}