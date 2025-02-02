import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import trainReducer from "./slices/trainSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";


const rootReducer = combineReducers({user: userReducer, train: trainReducer});
const persistConfig = {
    key : 'root',
    version : 1,
    storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer);   



export const store = configureStore({
    reducer:persistedReducer,
})

export const persistor = persistStore(store);