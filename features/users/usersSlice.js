import { createSlice } from "@reduxjs/toolkit"
const usersSlice = createSlice({
    name: 'users', 
    initialState: {
        soDienThoai: ""
    },
    reducers : {
        userLogin(state, action) {
            state.soDienThoai = action.payload.soDienThoai; 
        },
        userLogout(state, action) {
            state.soDienThoai = "";
        }
    }
})

export default usersSlice.reducer; 
export const {userLogin, userLogout} = usersSlice.actions;