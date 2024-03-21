import {Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
const ProductionRoute = () => {
    const firstRun = useSelector(state => state.firstRun)
    return firstRun ? <Navigate to='/setup' replace/> : <Outlet/>
}
export default ProductionRoute