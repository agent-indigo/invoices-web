import Data from '@/types/Data'
export default interface User extends Data {
  username: string
  roles?: [
    'root',
    'user'
  ]
  authorities?: [
    'root',
    'user'
  ]
  token: string
}