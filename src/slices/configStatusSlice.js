import {createSlice} from '@reduxjs/toolkit'
const initialState = {
  firstRun: JSON.parse(localStorage.getItem('firstRun')) || null
}
const configStatusSlice = createSlice({
  name: 'firstRun',
  initialState,
  reducers: {
    setConfigStatus: (
      state,
      action
    ) => {
      state.firstRun = !action.payload.rootExists
      localStorage.setItem(
        'firstRun',
        JSON.stringify(!action.payload.rootExists)
      )
    }
  }
})
export const {setConfigStatus} = configStatusSlice.actions
export default configStatusSlice.reducer