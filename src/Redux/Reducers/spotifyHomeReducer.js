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
    setEditorsPicks: (state, action) => {
      state.editorsPickData.push(...action.payload);
    },
    setGenreMoods: (state, action) => {
      state.genresAndMoodsData.push(...action.payload);
    },
    setNewReleases: (state, action) => {
      state.newReleasesData.push(...action.payload);
    },
    setEditorPickSectionLoading: (state, action) => {
      state.isEditorPickSectionLoading = action.payload;
    },
    setGenreMoodSectionLoading: (state, action) => {
      state.isGenreMoodSectionLoading = action.payload;
    },
    setNewReleaseSectionLoading: (state, action) => {
      state.isNewReleaseSectionLoading = action.payload;
    },
    // setSpotifyHomeData: (state, action) => {
    //   const {
    //     editorsPickData,
    //     genresAndMoodsData,
    //     newReleasesData,
    //     isEditorPickSectionLoading,
    //     isGenreMoodSectionLoading,
    //     isNewReleaseSectionLoading,
    //   } = action.payload;
    //   state.editorsPickData = editorsPickData;
    //   state.genresAndMoodsData = genresAndMoodsData;
    //   state.newReleasesData = newReleasesData;
    //   state.isEditorPickSectionLoading = isEditorPickSectionLoading;
    //   state.isGenreMoodSectionLoading = isGenreMoodSectionLoading;
    //   state.isNewReleaseSectionLoading = isNewReleaseSectionLoading;
    //   console.log(state, "new ststaawee");
    // },
  },
});

export const {
  setEditorsPicks,
  setGenreMoods,
  setNewReleases,
  setEditorPickSectionLoading,
  setGenreMoodSectionLoading,
  setNewReleaseSectionLoading,
  setSpotifyHomeData,
} = spotifyHomeReducer.actions;
export default spotifyHomeReducer.reducer;
