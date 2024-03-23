import {Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
const PrivateRoute = () => {
    const {user} = useSelector(state => state.authentication)
    return user ? <Outlet/> : <Navigate to='/users/login' replace/>
}
export default PrivateRoute