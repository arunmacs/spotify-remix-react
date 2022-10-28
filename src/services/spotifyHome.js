// import fetch from "isomorphic-unfetch";
import { getFetchOptions, getTimeStamp } from "../utils/utils";
import { apiUrls } from "../utils/constants";

export const fetchEditorsPickData = async ({ country }) => {
  const timeStamp = getTimeStamp();
  const editorsPicksApiUrl = `${apiUrls.editorsPicksApiUrl}?country=${country}&timestamp=${timeStamp}`;
  const response = await fetch(editorsPicksApiUrl, getFetchOptions());
  return await response.json();
};

export const fetchGenresAndMoodsData = async () => {
  const response = await fetch(apiUrls.genresAndMoodsApiUrl, getFetchOptions());
  return await response.json();
};

export const fetchNewReleasesData = async ({ country }) => {
  const newReleasesApiUrl = `${apiUrls.newReleasesApiUrl}?country=${country}`;
  const response = await fetch(newReleasesApiUrl, getFetchOptions());
  return await response.json();
};

export const fetchGenresCategoryData = async (categoryId, country) => {
  const genresCategoryApi = `${apiUrls.genresCategoryApiUrl}/${categoryId}/playlists?country=${country}`;
  const response = await fetch(genresCategoryApi, getFetchOptions());
  return await response.json();
};
