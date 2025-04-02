import {createSlice} from '@reduxjs/toolkit'
const configStatusSlice = createSlice({
  name: 'configStatus',
  initialState: {
    configStatus: JSON.parse(localStorage.getItem('configStatus')) ?? null
  },
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