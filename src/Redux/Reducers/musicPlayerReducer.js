import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  index: 0,
  pause: false,
  activeSongClass: 0,
  currTime: "0:00",
  seek: 0,
  volume: 10,
  screenSize: window.innerWidth,
};

const musicPlayerReducer = createSlice({
  name: "musicPlayerReducer",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSongClass = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    setPauseState: (state, action) => {
      state.pause = action.payload;
    },
    setCurrTime: (state, action) => {
      state.currTime = action.payload;
    },
    setSeek: (state, action) => {
      state.seek = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
    },
    setResetState: (state, action) => {
      const {
        index,
        pause,
        activeSongClass,
        currTime,
        seek,
        volume,
        screenSize,
      } = action.payload;
      state.activeSongClass = activeSongClass;
      state.index = index;
      state.pause = pause;
      state.currTime = currTime;
      state.seek = seek;
      state.volume = volume;
      state.screenSize = screenSize;
    },
  },
});

export const {
  setActiveSong,
  setIndex,
  setPauseState,
  setCurrTime,
  setSeek,
  setVolume,
  setScreenSize,
  setResetState,
} = musicPlayerReducer.actions;
export default musicPlayerReducer.reducer;
