import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    firstRun: JSON.parse(localStorage.getItem('firstRun')) || false
}
const configStatusSlice = createSlice({
    name: 'firstRun',
    initialState,
    reducers: {
        setConfigStatus: (state, action) => {
            state.firstRun = action.payload
            localStorage.setItem('firstRun', JSON.stringify(action.payload))
        }
    }
})
export const setConfigStatus = configStatusSlice.actions
export default configStatusSlice.reducer