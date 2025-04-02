import {createSlice} from '@reduxjs/toolkit'
const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) ?? null
  },
  reducers: {
    setCredentials: (
      state,
      action
    ) => {
      state.user = action.payload
      localStorage.setItem(
        'user',
        JSON.stringify(action.payload)
      )
    },
    logout: state => {
      state.user = null
      localStorage.clear()
    }
  }
})
export const {
  setCredentials,
  logout
} = authenticationSlice.actions
export default authenticationSlice.reducer