import {createSlice} from '@reduxjs/toolkit'

const trainSlice=createSlice({
    name:'train',
    initialState:{
        currentTrainList:null,
        bookingTrain:null,
        sourceName:'',
        destinationName:'',
        travelDate:'',
        finalDate:'',
        selectedClass:''
    },
    reducers:{
        setTrainsList(state,action){
            state.currentTrainList=action.payload.trains,
            state.sourceName=action.payload.source,
            state.destinationName=action.payload.destination,
            state.travelDate=action.payload.date
        },
        setBooking(state,action){
            state.bookingTrain=action.payload.train,
            state.selectedClass=action.payload.class,
            state.finalDate=action.payload.date
        }
    }
})

export const {setTrainsList, setBooking} = trainSlice.actions;
export default trainSlice.reducer;