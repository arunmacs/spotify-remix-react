// import fetch from "isomorphic-unfetch";
import { getFetchOptions } from "../utils/utils";
import { apiUrls } from "../utils/constants";

export const fetchUserProfile = async () => {
  const userDataResponse = await fetch(apiUrls.userApiUrl, getFetchOptions());
  return await userDataResponse.json();
};
