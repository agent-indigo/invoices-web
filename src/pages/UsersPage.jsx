import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import {Table, Form, Button, Row, Col} from 'react-bootstrap'
import {FaKey, FaPlus, FaTrash, FaSearch, FaUsers, FaArrowUp, FaArrowDown} from 'react-icons/fa'
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
  const [sortCriteria, setSortCriteria] = useState({field: 'name', order: 'asc'})
  const [deleteUser, {isLoading: deleteLoading}] = useDeleteUserMutation()
  const navigate = useNavigate()
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
    setSelectedUsers([])
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
                <Form.Check
                  type="checkbox"
                  checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                  onChange={event => {
                    if (event.target.checked) {
                      setSelectedUsers(
                        filteredUsers.map(user => user.role).filter(
                          role => role !== 'root'
                        )
                      )
                    } else {
                      setSelectedUsers([])
                    }
                  }}
                />
              </th>
              <th>ID <FaArrowUp onClick={() => setSortCriteria({field: 'pk', order: 'asc'})}/>
              <FaArrowDown onClick={() => setSortCriteria({field: 'pk', order: 'desc'})}/></th>
              <th>Name <FaArrowUp onClick={() => setSortCriteria({field: 'name', order: 'asc'})}/>
              <FaArrowDown onClick={() => setSortCriteria({field: 'name', order: 'desc'})}/></th>
              <th>Created <FaArrowUp onClick={() => setSortCriteria({field: 'createdAt', order: 'asc'})}/>
              <FaArrowDown onClick={() => setSortCriteria({field: 'createdAt', order: 'desc'})}/></th>
              <th>Last password change <FaArrowUp onClick={() => setSortCriteria({field: 'updatedAt', order: 'asc'})}/>
              <FaArrowDown onClick={() => setSortCriteria({field: 'updatedAt', order: 'desc'})}/></th>
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
                <td>{user.pk}</td>
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