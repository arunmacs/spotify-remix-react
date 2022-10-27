import { configureStore } from "@reduxjs/toolkit";
import spotifyHomeReducer from "./Reducers/spotifyHomeReducer";
import playlistReducer from "./Reducers/playlistReducer";
import musicPlayerReducer from "./Reducers/musicPlayerReducer";
import userProfileReducer from "./Reducers/userProfileReducer";

export const store = configureStore({
  reducer: {
    spotifyHomeReducer,
    playlistReducer,
    musicPlayerReducer,
    userProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 60 },
      serializableCheck: { warnAfter: 60 },
    }),
});
