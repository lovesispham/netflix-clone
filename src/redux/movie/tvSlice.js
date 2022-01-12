import {createSlice} from '@reduxjs/toolkit'


const tv = createSlice({
    name:'tvs',
    initialState:{
        tvsFav:[],
        isFav:true
    },
    reducers:{
        addFav:(state, action) => {
            const existsInArray = state.tvsFav.find(fav => fav.id === action.payload.id)
                 if (existsInArray) { 
                     return state;
                 }
                 state.tvsFav = [...state.tvsFav,action.payload]
               
                   
                           
        },
        removeFav:(state,action) => {
           
            const removeMovieId = action.payload.id
            if(removeMovieId){
                return {
                    ... state,
                    tvsFav: state.tvsFav.filter(fav => fav.id !== removeMovieId)
                }
            }
           
        }
    }
})

const {reducer, actions} = tv
export const {addFav,removeFav} = actions
export default reducer