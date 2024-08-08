import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {setConfigStatus} from '../slices/configStatusSlice'
import {useLazyGetStatusQuery} from '../slices/setupApiSlice'
const ConfigStatusFetcher = () => {
  const dispatch = useDispatch()
  const [getConfigStatusApiCall] = useLazyGetStatusQuery()
  useEffect(() => async () => {
      try {
        const response = await getConfigStatusApiCall().unwrap()
        dispatch(setConfigStatus(response))
      } catch (error) {
        toast.error(error?.data?.message || error.error)
        console.error(error)
      }
    }, [dispatch, getConfigStatusApiCall])
  return null
}
export default ConfigStatusFetcher