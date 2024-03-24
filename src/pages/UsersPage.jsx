import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import {Table, Form, Button, Row, Col} from 'react-bootstrap'
import {FaKey, FaPlus, FaTrash, FaSearch, FaUsers} from 'react-icons/fa'
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
    return (
      <>
        <Helmet>
          <title>Users | Invoices</title>
        </Helmet>
        <h1><FaUsers/> Users</h1>
        <p>Note: <strong>root</strong> is not listed here.</p>
        <Row className="mb-3">
          <Col md={4}>
            <FaSearch/>
            <Form.Control
              type="text"
              placeholder="Search Users"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
          </Col>
          <Col md={4}>
            <Button
              type='button'
              variant='primary'
              onClick={() => navigate('/users/add')}
            >
              <FaPlus/> Add User
            </Button>
          </Col>
          <Col md={4}>
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
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
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
                    <Button
                      type='button'
                      variant='secondary'
                      className='m-auto p-auto text-white'
                      onClick={() => navigate(`/users/resetPassword/?pk=${user.pk}`)}
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
                      disabled={deleteLoading}
                    >
                      <FaTrash/> Delete
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