import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  isLoading: true,
};

const userProfileReducer = createSlice({
  name: "userProfileReducer",
  initialState,
  reducers: {
    setUserProfileData: (state, action) => {
      const { userData, isLoading } = action.payload;
      state.userData = userData;
      state.isLoading = isLoading;
    },
  },
});

export const { setUserProfileData } = userProfileReducer.actions;
export default userProfileReducer.reducer;
