import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    moviesFav: [],
    isFav: true
  },
  reducers: {
    addFav: (state, action) => {
      const existsInArray = state.moviesFav.find(
        fav => fav.id === action.payload.id
      );
      if (existsInArray) {
        //check item da dc add
        return state;
      }
      state.moviesFav = [...state.moviesFav, action.payload];
      // return{
      //     ...state, //  ...state, //copy state cu tra ve state moi
      //     moviesFav: [...state.moviesFav,action.payload]
      // }
    },
    removeFav: (state, action) => {
      const removeMovieId = action.payload.id;
      if (removeMovieId) {
        return {
          ...state,
          moviesFav: state.moviesFav.filter(fav => fav.id !== removeMovieId)
        };
      }
    }
  }
});

export const { addFav, removeFav } = movieSlice.actions;
export default movieSlice.reducer;
