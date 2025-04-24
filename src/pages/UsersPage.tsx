import {
  useState,
  useEffect,
  FunctionComponent,
  ReactElement,
  ChangeEventHandler,
  ChangeEvent
} from 'react'
import {
  Link,
  NavigateFunction,
  useNavigate
} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import {
  Table,
  Form,
  Button,
  Row,
  Col,
  Alert
} from 'react-bootstrap'
import {
  FaKey,
  FaPlus,
  FaTrash,
  FaSearch,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaCheckDouble
} from 'react-icons/fa'
import {toast} from 'react-toastify'
import ResetPasswordModal from '../components/ResetPasswordModal'
import Loader from '../components/Loader'
import {useGetContext} from '../components/ContextProvider'
import ContextProps from '@/types/ContextProps'
import SortCriteria from '@/types/SortCriteria'
import User from '@/types/User'
import Data from '@/types/Data'
const UsersPage: FunctionComponent = (): ReactElement => {
  const {
    user,
    users,
    setUsers
  }: ContextProps = useGetContext()
  const [
    searchTerm,
    setSearchTerm
  ] = useState<string>('')
  const [
    showResetPasswordModal,
    setShowResetPasswordModal
  ] = useState<boolean>(false)
  const [
    selectedUserId,
    setSelectedUserId
  ] = useState<string>('')
  const [
    selectedUsers,
    setSelectedUsers
  ] = useState<string[]>([])
  const [
    sortCriteria,
    setSortCriteria
  ] = useState<SortCriteria>({
    field: 'updatedAt',
    order: 'asc'
  })
  const [
    loading,
    setLoading
  ] = useState<boolean>(false)
  const [
    deleting,
    setDeleting
  ] = useState<boolean>(false)
  const [
    errorOccured,
    setErrorOccured
  ] = useState<boolean>(false)
  const [
    error,
    setError
  ] = useState<string>('')
  const navigate: NavigateFunction = useNavigate()
  const sortHandler: Function = (
    field: keyof Data,
    order: 'asc' | 'desc'
  ): void => setSortCriteria({
    field,
    order
  })
  const openResetPasswordModal: Function = (id: string): void => {
    setSelectedUserId(id)
    setShowResetPasswordModal(true)
  }
  const closeResetPasswordModal: Function = (): void => {
    setSelectedUserId('')
    setShowResetPasswordModal(false)
  }
  const deleteHandler: Function = async (id: string): Promise<void> => {
    setDeleting(true)
    const response: Response = await fetch(
      `http://localhost:8080/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      }
    )
    if (response.ok) {
      toast.success('User deleted.')
      setUsers(users.filter((user: User): boolean => user.id !== id))
    } else {
      toast.error(await response.text())
    }
    setDeleting(false)
  }
  const bulkDeleteHandler: Function = async (): Promise<void> => {
    await Promise.all(selectedUsers.map(async (user): Promise<void> => await deleteHandler(user)))
    setSelectedUsers([])
    toast.success('Users deleted.')
  }
  const sortedUsers: User[] = [...users].sort((
    a: User,
    b: User
  ): number => {
    const {
      field,
      order
    }: SortCriteria = sortCriteria
    const orderFactor: number = order === 'asc' ? 1 : -1
    return (
      a[field] < b[field]
      ? -orderFactor
      : a[field] > b[field]
      ? orderFactor
      : 0
    )
  })
  const filteredUsers: User[] = sortedUsers.filter((user: User): boolean => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
  const userIsRoot: Function = (id: string): boolean => {
    const user: User | undefined = users.find((user: User): boolean => user.id === id)
    return user?.role === 'root'
  }
  const checkAllHandler: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>): void => (
    event.target.checked
    ? setSelectedUsers(users.filter(user => !userIsRoot(user.id)).map(user => user.id))
    : setSelectedUsers([])
  )
  useEffect((): void => {(async (): Promise<void> => {
    setLoading(true)
    const response: Response = await fetch('http://localhost:8080/users')
    if (response.ok) {
      setUsers(await response.json())
    } else {
      setErrorOccured(true)
      setError(await response.text())
    }
    setLoading(false)
  })()}, [
    setUsers
  ])
  return (
    <>
      <Helmet>
        <title>
          {loading ? 'Loading...' : errorOccured ? 'Error' : 'Users'} | Invoices
        </title>
      </Helmet>
      {loading ? (
        <Loader/>
      ) : errorOccured ? (
        <Alert variant='danger'>
          {error}
        </Alert>
      ) : (
        <>
          <h1>
            <FaUsers/> Users
          </h1>
          <Row className="mb-3">
            <Col
              sm={8}
              className='d-flex align-items-center'
            >
              <FaSearch className='mx-1'/>
              <Form.Control
                type="text"
                placeholder="Search users"
                value={searchTerm}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setSearchTerm(event.target.value)}
              />
            </Col>
            <Col sm={2}>
              <Button
                type='button'
                variant='primary'
                onClick={(): void => navigate('/users/add')}
              >
                <FaPlus/> Add user
              </Button>
            </Col>
            <Col sm={2}>
              <Button
                type='button'
                variant="danger"
                disabled={selectedUsers.length === 0}
                onClick={async (): Promise<void> => await bulkDeleteHandler()}
              >
                <FaTrash/> Delete selected
              </Button>
            </Col>
          </Row>
          <Table
            striped
            hover
            responsive
          >
            <thead>
              <tr>
                <th>
                  <FaCheckDouble/>
                  <Form.Check
                    type="checkbox"
                    checked={
                      filteredUsers.length > 0 &&
                      selectedUsers.length === filteredUsers.filter((user: User): boolean => !userIsRoot(user.id)).length
                    }
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => checkAllHandler(event)}
                  />
                </th>
                <th>
                  Name
                  <div className="d-flex">
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'name',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'name',
                        'desc'
                      )}
                    >
                      <FaArrowDown/>
                    </Link>
                  </div>
                </th>
                <th>
                  Created
                  <div className="d-flex">
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'createdAt',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'createdAt',
                        'desc'
                      )}
                    >
                      <FaArrowDown/>
                    </Link>
                  </div>
                </th>
                <th>
                  Password last changed
                  <div className="d-flex">
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'updatedAt',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={(): void => sortHandler(
                        'updatedAt',
                        'desc'
                      )}
                    >
                      <FaArrowDown/>
                    </Link>
                  </div>
                </th>
                <th>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user: User): ReactElement => (
                <tr key={user.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      disabled={user.role === 'root'}
                      onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                        const id: string = user.id
                        event.target.checked ? setSelectedUsers([
                          ...selectedUsers,
                          id
                        ]) : setSelectedUsers(selectedUsers.filter((pk: string): boolean => pk !== id))
                      }}
                    />
                  </td>
                  <td>
                    {user.username}
                  </td>
                  <td>
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                  <td>
                    {user.createdAt === user.updatedAt ? null : new Date(user.updatedAt).toLocaleString()}
                  </td>
                  <td>
                    <Button
                      type='button'
                      variant='primary'
                      className='p-auto text-white'
                      disabled={user.role === 'root'}
                      onClick={(): void => openResetPasswordModal(user.id)}
                    >
                      <FaKey/> Reset password
                    </Button>
                  </td>
                  <td>
                    <Button
                      type='button'
                      variant='danger'
                      className='p-auto text-white'
                      onClick={async (): Promise<void> => await deleteHandler(user.id)}
                      disabled={deleting || user.role === 'root'}
                    >
                      <FaTrash/> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {showResetPasswordModal && (
            <ResetPasswordModal
              id={selectedUserId}
              closeModal={closeResetPasswordModal}
            />
          )}
        </>
      )}
    </>
  )
}
export default UsersPage