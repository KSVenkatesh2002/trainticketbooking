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
        },
        signout(state){
            state.currentUser=null,
            state.error='',
            state.loading=false
        }
    }
})

export const {start, failure, success, signout} = userSlice.actions;
export default userSlice.reducer;