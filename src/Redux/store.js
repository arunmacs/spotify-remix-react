import { configureStore } from "@reduxjs/toolkit";
import spotifyHomeReducer from "./Reducers/spotifyHomeReducer";
import playlistReducer from "./Reducers/playlistReducer";
import musicPlayerReducer from "./Reducers/musicPlayerReducer";
import userProfileReducer from "./Reducers/userProfileReducer";
import genreReducer from "./Reducers/genreReducer";

export const store = configureStore({
  reducer: {
    spotifyHome: spotifyHomeReducer,
    playlist: playlistReducer,
    musicPlayer: musicPlayerReducer,
    user: userProfileReducer,
    genre: genreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 60 },
      serializableCheck: { warnAfter: 60 },
    }),
});
