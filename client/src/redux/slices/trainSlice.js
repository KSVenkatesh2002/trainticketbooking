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
        selectedClass:'',
        passengerInfo:[],
        contactInfo:{}
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
        },
        setDetails(state,action){
            state.passengerInfo=action.payload.passenger,
            state.contactInfo=action.payload.contact
        }
    }
})

export const {setTrainsList, setBooking, setDetails} = trainSlice.actions;
export default trainSlice.reducer;