import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlist: [],
  displayInfo: {},
  isLoading: true,
};

const playlistReducer = createSlice({
  name: "playlistReducer",
  initialState,
  reducers: {
    setPlaylist: (state, action) => {
      const { playlist, displayInfo, isLoading } = action.payload;
      state.playlist = playlist;
      state.displayInfo = displayInfo;
      state.isLoading = isLoading;
    },
  },
});

export const {
  setPlaylist,
  setDisplayInfo,
  setIsLoading,
} = playlistReducer.actions;
export default playlistReducer.reducer;
