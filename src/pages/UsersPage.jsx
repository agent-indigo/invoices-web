import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import {Table, Form, Button, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {FaKey, FaPlus, FaTrash, FaSearch, FaUsers, FaArrowUp, FaArrowDown, FaCheckDouble} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useListUsersQuery, useDeleteUserMutation} from '../slices/usersApiSlice'
import ResetPasswordModal from '../components/ResetPasswordModal'
import Loader from '../components/Loader'
import Message from '../components/Message'
const UsersPage = () => {
  const {data: users, isLoading, isError, error, refetch} = useListUsersQuery()
  const [searchTerm, setSearchTerm] = useState('')
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  const [selectedUserPk, setSelectedUserPk] = useState(null)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [sortCriteria, setSortCriteria] = useState({field: 'name', order: 'asc'})
  const [deleteUser, {isLoading: deleteLoading}] = useDeleteUserMutation()
  const navigate = useNavigate()
  const sortHandler = (field, order) => {
    setSortCriteria({field, order})
  }
  const openResetPAsswordModal = pk => {
    setSelectedUserPk(pk)
    setShowResetPasswordModal(true)
  }
  const closeResetPasswordModal = () => {
    setSelectedUserPk(null)
    setShowResetPasswordModal(false)
  }
  const deleteHandler = async pk => {
    try {
      const response = await deleteUser(pk).unwrap()
      refetch()
      toast.success(response.message)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  const bulkDeleteHandler = async () => {
    try {
      await Promise.all(selectedUsers.map(pk => deleteUser(pk).unwrap()))
      refetch()
      setSelectedUsers([])
      toast.success('Users deleted.')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  useEffect(() => {
    setAllUsers(users || [])
  }, [users])
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Processing... | Invoices</title>
        </Helmet>
        <Loader/>
      </>
    )
  } else if (isError) {
    return (
      <>
        <Helmet>
          <title>Error | Invoices</title>
        </Helmet>
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      </>
    )
  } else {
    const sortedUsers = [...users].sort((a, b) => {
      const orderFactor = sortCriteria.order === 'asc' ? 1 : -1;
      if (a[sortCriteria.field] < b[sortCriteria.field]) return -1 * orderFactor;
      if (a[sortCriteria.field] > b[sortCriteria.field]) return 1 * orderFactor;
      return 0;
    })
    const filteredUsers = sortedUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.pk.toString().includes(searchTerm)
    )
    const userIsRoot = pk => {
      const user = allUsers.find(user => user.pk === pk);
      return user && user.role === 'root';
    }
    const checkAllHandler = event => {
      if (event.target.checked) {
        setSelectedUsers(
          allUsers
            .filter(user => !userIsRoot(user.pk))
            .map(user => user.pk)
        )
      } else {
        setSelectedUsers([])
      }
    }
    return (
      <>
        <Helmet>
          <title>Users | Invoices</title>
        </Helmet>
        <h1><FaUsers/> Users</h1>
        <Row className="mb-3">
          <Col xs={8} className='d-flex align-items-center'>
            <FaSearch className='mx-1'/>
            <Form.Control
              type="text"
              placeholder="Search users"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
          </Col>
          <Col xs={2}>
            <Button
              type='button'
              variant='primary'
              onClick={() => navigate('/users/add')}
            >
              <FaPlus/> Add User
            </Button>
          </Col>
          <Col xs={2}>
            <Button
              type='button'
              variant="danger"
              disabled={selectedUsers.length === 0}
              onClick={bulkDeleteHandler}
            >
              <FaTrash/> Delete Selected
            </Button>
          </Col>
        </Row>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>
                <div className="d-flex">
                  <Form.Check
                    type="checkbox"
                    checked={
                      filteredUsers.length > 0 && selectedUsers.length === filteredUsers.filter(
                        user => !userIsRoot(user.pk)).length}
                    onChange={event => checkAllHandler(event)}
                  /><div className="px-1"/><FaCheckDouble/>
                </div>
              </th>
              <th>
                Name
                <div className="d-flex">
                  <Link to={'#'} onClick={() => sortHandler('name', 'asc')}>
                    <FaArrowUp/>
                  </Link>
                  <Link to={'#'} onClick={() => sortHandler('name', 'desc')}>
                    <FaArrowDown/>
                  </Link>
                </div>
              </th>
              <th>
                Created
                <div className="d-flex">
                  <Link to={'#'} onClick={() => sortHandler('createdAt', 'asc')}>
                    <FaArrowUp/>
                  </Link>
                  <Link to={'#'} onClick={() => sortHandler('createdAt', 'desc')}>
                    <FaArrowDown/>
                  </Link>
                </div>
              </th>
              <th>
                Last password change
                <div className="d-flex">
                  <Link to={'#'} onClick={() => sortHandler('updatedAt', 'asc')}>
                    <FaArrowUp/>
                  </Link>
                  <Link to={'#'} onClick={() => sortHandler('updatedAt', 'desc')}>
                    <FaArrowDown/>
                  </Link>
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.pk}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedUsers.includes(user.pk)}
                    disabled={user.role === 'root'}
                    onChange={event => {
                      const pk = user.pk
                      if (event.target.checked) {
                        setSelectedUsers([...selectedUsers, pk])
                      } else {
                        setSelectedUsers(selectedUsers.filter(
                          id => id !== pk
                        ))
                      }
                    }}
                  />
                </td>
                <td>{user.name}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>{new Date(user.updatedAt).toLocaleString()}</td>
                <td>
                  <Button
                    type='button'
                    variant='secondary'
                    className='m-auto p-auto text-white'
                    disabled={user.role === 'root'}
                    onClick={() => openResetPAsswordModal(user.pk)}
                  >
                    <FaKey/> Reset password
                  </Button>
                </td>
                <td>
                  <Button
                    type='button'
                    variant='secondary'
                    className='m-auto p-auto text-white'
                    onClick={() => deleteHandler(user.pk)}
                    disabled={deleteLoading || user.role === 'root'}
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
            pk={selectedUserPk}
            closeModal={closeResetPasswordModal}
          />
        )}
      </>
    )
  }
}
export default UsersPage