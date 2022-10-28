import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editorsPickData: [],
  genresAndMoodsData: [],
  newReleasesData: [],
  isEditorPickSectionLoading: true,
  isGenreMoodSectionLoading: true,
  isNewReleaseSectionLoading: true,
};

const spotifyHomeReducer = createSlice({
  name: "spotifyHomeReducer",
  initialState,
  reducers: {
    setSpotifyHomeData: (state, action) => {
      const {
        editorsPickData,
        genresAndMoodsData,
        newReleasesData,
        isEditorPickSectionLoading,
        isGenreMoodSectionLoading,
        isNewReleaseSectionLoading,
      } = action.payload;

      state.editorsPickData = editorsPickData;
      state.genresAndMoodsData = genresAndMoodsData;
      state.newReleasesData = newReleasesData;
      state.isEditorPickSectionLoading = isEditorPickSectionLoading;
      state.isGenreMoodSectionLoading = isGenreMoodSectionLoading;
      state.isNewReleaseSectionLoading = isNewReleaseSectionLoading;
    },
  },
});

export const { setSpotifyHomeData } = spotifyHomeReducer.actions;
export default spotifyHomeReducer.reducer;
