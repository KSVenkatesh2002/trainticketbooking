import {createSlice} from '@reduxjs/toolkit'

const userSlice=createSlice({
    name:'user',
    initialState:{
        currentUser:null,
        error:'',
        loading:false
    },
    reducers:{
        start(state){
            state.loading=true,
            state.error=''
        },
        failure(state,action){
            state.loading=false,
            state.error=action.payload
        },
        success(state,action){
            state.loading=false,
            state.error='',
            state.currentUser=action.payload
        }
    }
})

export const {start, failure, success} = userSlice.actions;
export default userSlice.reducer;