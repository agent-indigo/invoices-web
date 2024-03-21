import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    staffMember:  JSON.parse(localStorage.getItem('staffMember')) || null
}
const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.staffMember = action.payload
            localStorage.setItem('staffMember', JSON.stringify(action.payload))
        },
        logout: state => {
            state.staffMember = null
            localStorage.clear()
        }
    }
})
export const {setCredentials, logout} = authenticationSlice.actions
export default authenticationSlice.reducer