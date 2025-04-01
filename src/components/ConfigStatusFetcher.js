import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {setConfigStatus} from '../slices/configStatusSlice'
import {useLazyGetStatusQuery} from '../slices/configApiSlice'
const ConfigStatusFetcher = () => {
  const dispatch = useDispatch()
  const [getConfigStatusApiCall] = useLazyGetStatusQuery()
  useEffect(() => {(async () => {
    try {
      dispatch(setConfigStatus(...await getConfigStatusApiCall().unwrap()))
    } catch (error) {
      toast.error(error.toString())
    }
  })()}, [
    dispatch,
    getConfigStatusApiCall
  ])
  return null
}
export default ConfigStatusFetcher