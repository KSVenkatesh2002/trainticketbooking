import { createSlice } from "@reduxjs/toolkit";

const trainSlice = createSlice({
  name: "train",
  initialState: {
    currentTrainList: null,
    sourceName: "",
    destinationName: "",
    travelDate: "",

    bookingTrain: null,
    finalDate: "",
    selectedClass: "",
    price: "",

    passengerList: [],
    contactDetails: {},

    displayForm: true,
    displayContactForm: true,

    currentBookingPnr: [],
  },
  reducers: {
    setTrainsList(state, action) {
      (state.currentTrainList = action.payload.trains),
        (state.sourceName = action.payload.source),
        (state.destinationName = action.payload.destination),
        (state.travelDate = action.payload.date);
    },
    setBooking(state, action) {
      (state.bookingTrain = action.payload.train),
        (state.selectedClass = action.payload.class),
        (state.finalDate = action.payload.date);
      state.price = action.payload.price;
    },
    setPassengerList(state, action) {
      state.passengerList = action.payload;
    },
    setContactDetails(state, action) {
      state.contactDetails = action.payload;
    },
    setDisplayForm(state) {
      state.displayForm = !state.displayForm;
    },
    setDisplayContactForm(state) {
      state.displayContactForm = !state.displayContactForm;
    },
    setPnr(state, action) {
      state.currentBookingPnr = action.payload;
    },
    paymentSuccess(state) {
      Object.assign(state, {
        currentTrainList: null,
        sourceName: "",
        destinationName: "",
        travelDate: "",
        bookingTrain: null,
        finalDate: "",
        selectedClass: "",
        price: "",
        passengerList: [],
        contactDetails: {},
        displayForm: true,
        displayContactForm: true,
        currentBookingPnr: [],
      });
    },
  },
});

export const {
  setTrainsList,
  setBooking,
  setPassengerList,
  setContactDetails,
  setDisplayForm,
  setDisplayContactForm,
  setPnr,
  paymentSuccess,
} = trainSlice.actions;

export default trainSlice.reducer;
