import {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import {Table, Form, Button, Row, Col} from 'react-bootstrap'
import {FaKey, FaTrash, FaSearch, FaUsers} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useListUsersQuery, useDeleteUserMutation} from '../slices/usersApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
const UsersPage = () => {
  const {data: users, isLoading, isError, error, refetch} = useListUsersQuery()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [deleteUser, {isLoading: deleteLoading}] = useDeleteUserMutation()
  const navigate = useNavigate()
  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const handleResetPassword = pk => {
    const redirect = searchParams.get('redirect') || `/users/?pk=${pk}/resetPassword`
    navigate(redirect)
  }
  const handleDeleteUser = async pk => {
    try {
      await deleteUser(pk).unwrap()
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedUsers.map(pk => deleteUser(pk).unwrap()))
      refetch()
      setSelectedUsers([])
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
          <title>Loading... | Invoices</title>
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
    return (
      <>
        <Helmet>
          <title>Users | Invoices</title>
        </Helmet>
        <h1><FaUsers/>Users</h1>
        <Row className="mb-3">
          <Col md={6}>
            <FaSearch/>
            <Form.Control
              type="text"
              placeholder="Search Users"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
          </Col>
          <Col md={6}>
            <Button
              variant="danger"
              disabled={selectedUsers.length === 0}
              onClick={handleBulkDelete}
            >
              <FaTrash/>Delete Selected
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(user => user.role !== 'root' && user.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
              .map(user => (
                <tr key={user.pk}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedUsers.includes(user.pk)}
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
                  <td>
                    <Button onClick={() => handleResetPassword(user.pk)}>
                      <FaKey/>Reset Password
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDeleteUser(user.pk)}
                      disabled={deleteLoading}
                    >
                      <FaTrash/>Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </>
    )
  }
}
export default UsersPage