import fetch from "isomorphic-unfetch";
import { getTimeStamp, getFetchOptions } from "../utils/utils";
// import { apiUrls } from "../../utils/constants";

export const userProfile = async (req, res) => {
  console.log("req > ", req, "res > ", res);
  const userApiUrl = "https://api.spotify.com/v1/me";

  const timeStamp = getTimeStamp();
  const userDataResponse = await fetch(userApiUrl, getFetchOptions());
  const userData = await userDataResponse.json();
  const { country } = userData;

  return `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${timeStamp}`;
};
