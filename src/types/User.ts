import Data from '@/src/types/Data'
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