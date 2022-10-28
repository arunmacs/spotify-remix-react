import { createSlice } from "@reduxjs/toolkit";
import { getFetchOptions } from "../../utils/utils";
import { apiUrls } from "../../utils/constants";

const initialState = {
  userProfile: {},
};

export const fetchUserProfile = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(apiUrls.userApiUrl, getFetchOptions());
      const userData = await response.json();
      dispatch(setUserProfileData(userData));
    } catch (error) {
      console.error(error);
    }
  };
};

const userProfileReducer = createSlice({
  name: "userProfileReducer",
  initialState,
  reducers: {
    setUserProfileData: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setUserProfileData } = userProfileReducer.actions;
export default userProfileReducer.reducer;
