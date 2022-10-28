import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genreListData: [],
  isLoading: true,
  screenSize: window.innerWidth,
};

const genreReducer = createSlice({
  name: "genreReducer",
  initialState,
  reducers: {
    setGenresData: (state, action) => {
      //   console.log(action, "genrea AActions");
      const { genreListData, isLoading, screenSize } = action.payload;

      state.genreListData = genreListData;
      state.isLoading = isLoading;
      state.screenSize = screenSize;
    },
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
    },
  },
});

export const { setGenresData, setScreenSize } = genreReducer.actions;
export default genreReducer.reducer;
