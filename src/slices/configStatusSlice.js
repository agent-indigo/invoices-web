import {createSlice} from '@reduxjs/toolkit'
const initialState = {
  configStatus: JSON.parse(localStorage.getItem('configStatus')) || null
}
const configStatusSlice = createSlice({
  name: 'configStatus',
  initialState,
  reducers: {
    setConfigStatus: (
      state,
      action
    ) => {
      state.configStatus = action.payload
      localStorage.setItem(
        'configStatus',
        JSON.stringify(action.payload)
      )
    }
  }
})
export const {setConfigStatus} = configStatusSlice.actions
export default configStatusSlice.reducer