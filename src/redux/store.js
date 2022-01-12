import {configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 

import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import movieReducer from './movie/movieSlice'
import tvReducer from './movie/tvSlice'

const reducers = combineReducers({
    
        movies:movieReducer,
        tvs:tvReducer
         
   });
   
const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);   

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
     
})

