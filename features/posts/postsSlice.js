import { createSlice } from "@reduxjs/toolkit";


const postsSlice = createSlice({
    name: 'post', 
    initialState: {
        temp: false,
    }, 
    reducers : {
        refreshPosts : (state) => {
            state.temp = !state.temp
        }
    }
})
export default postsSlice.reducer; 
export const { refreshPosts } = postsSlice.actions; 