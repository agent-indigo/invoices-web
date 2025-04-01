import {
  useState,
  useEffect
} from 'react'
import {
  Link,
  useNavigate
} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import {
  Table,
  Form,
  Button,
  Row,
  Col
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
import {
  useListUsersQuery,
  useDeleteUserMutation
} from '../slices/usersApiSlice'
import ResetPasswordModal from '../components/ResetPasswordModal'
import Loader from '../components/Loader'
import Message from '../components/Message'
const UsersPage = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch
  } = useListUsersQuery()
  const [
    searchTerm,
    setSearchTerm
  ] = useState('')
  const [
    showResetPasswordModal,
    setShowResetPasswordModal
  ] = useState(false)
  const [
    selectedUserPk,
    setSelectedUserPk
  ] = useState(null)
  const [
    selectedUsers,
    setSelectedUsers
  ] = useState([])
  const [
    allUsers,
    setAllUsers
  ] = useState([])
  const [
    sortCriteria,
    setSortCriteria
  ] = useState({
    field: 'name',
    order: 'asc'
  })
  const [
    deleteUser, {
      isLoading: deleting
    }
  ] = useDeleteUserMutation()
  const navigate = useNavigate()
  const sortHandler = (
    field,
    order
  ) => setSortCriteria({
    field,
    order
  })
  const openResetPasswordModal = id => {
    setSelectedUserPk(id)
    setShowResetPasswordModal(true)
  }
  const closeResetPasswordModal = () => {
    setSelectedUserPk(null)
    setShowResetPasswordModal(false)
  }
  const deleteHandler = async id => {
    try {
      const response = await deleteUser(id).unwrap()
      refetch()
      toast.success(response.message)
    } catch (error) {
      toast.error(error.toString())
    }
  }
  const bulkDeleteHandler = async () => {
    try {
      await Promise.all(selectedUsers.map(id => deleteUser(id).unwrap()))
      refetch()
      setSelectedUsers([])
      toast.success('Users deleted.')
    } catch (error) {
      toast.error(error.toString())
    }
  }
  const sortedUsers = [...users].sort((
    a,
    b
  ) => {
    const orderFactor = sortCriteria.order === 'asc' ? 1 : -1
    return a[sortCriteria.field] < b[sortCriteria.field]
    ? -orderFactor
    : a[sortCriteria.field] > b[sortCriteria.field]
    ? orderFactor
    : 0
  })
  const filteredUsers = sortedUsers.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const userIsRoot = id => {
    const user = allUsers.find(user => user.id === id)
    return user && user.role === 'root'
  }
  const checkAllHandler = event => event.target.checked
  ? setSelectedUsers(allUsers.filter(user => !userIsRoot(user.id)).map(user => user.id))
  : setSelectedUsers([])
  useEffect(() => {
    setAllUsers(users ?? [])
  }, [
    users
  ])
  return (
    <>
      <Helmet>
        <title>
          {isLoading ? 'Loading...' : isError ? 'Error' : 'Users'} | Invoices
        </title>
      </Helmet>
      {isLoading ? (
        <Loader/>
      ) : isError ? (
        <Message variant='danger'>
          {error.toString()}
        </Message>
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
                onChange={event => setSearchTerm(event.target.value)}
              />
            </Col>
            <Col sm={2}>
              <Button
                type='button'
                variant='primary'
                onClick={() => navigate('/users/add')}
              >
                <FaPlus/> Add user
              </Button>
            </Col>
            <Col sm={2}>
              <Button
                type='button'
                variant="danger"
                disabled={selectedUsers.length === 0}
                onClick={bulkDeleteHandler}
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
                      selectedUsers.length === filteredUsers.filter(user => !userIsRoot(user.id)).length
                    }
                    onChange={event => checkAllHandler(event)}
                  />
                </th>
                <th>
                  Name
                  <div className="d-flex">
                    <Link
                      to={'#'}
                      onClick={() => sortHandler(
                        'name',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={() => sortHandler(
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
                      onClick={() => sortHandler(
                        'createdAt',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={() => sortHandler(
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
                      onClick={() => sortHandler(
                        'updatedAt',
                        'asc'
                      )}
                    >
                      <FaArrowUp/>
                    </Link>
                    <Link
                      to={'#'}
                      onClick={() => sortHandler(
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
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      disabled={user.role === 'root'}
                      onChange={event => {
                        const id = user.id
                        event.target.checked ? setSelectedUsers([
                          ...selectedUsers,
                          id
                        ]) : setSelectedUsers(selectedUsers.filter(pk => pk !== id))
                      }}
                    />
                  </td>
                  <td>
                    {user.name}
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
                      onClick={() => openResetPasswordModal(user.id)}
                    >
                      <FaKey/> Reset password
                    </Button>
                  </td>
                  <td>
                    <Button
                      type='button'
                      variant='danger'
                      className='p-auto text-white'
                      onClick={() => deleteHandler(user.id)}
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
              id={selectedUserPk}
              closeModal={closeResetPasswordModal}
            />
          )}
        </>
      )}
    </>
  )
}
export default UsersPage