import moment from "moment";
import { slugs, apiUrls } from "./constants";

export const getSpecificPlaylistApiUrl = (slug, id) => {
  switch (slug) {
    case slugs.editorPick:
      return `${apiUrls.editorPickPlaylistApiUrl}/${id}`;
    case slugs.newRelease:
      return `${apiUrls.newReleasePlaylistApiUrl}/${id}`;
    case slugs.genreAlbum:
      return `${apiUrls.genreAlbumPlaylistApiUrl}/${id}/tracks`;
    case slugs.yourMusic:
      return apiUrls.yourMusicPlaylistApiUrl;
    case slugs.yourPlaylists:
      return `${apiUrls.yourPlaylistsApiUrl}/${id}`;
    default:
      return "";
  }
};

export const getAccessToken = () => {
  const token = localStorage.getItem("pa_token", "");
  return token;
};

export const getFetchOptions = () => {
  const token = getAccessToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  };
};

export const getTimeStamp = () => {
  const timeStamp = moment(new Date()).format("YYYY-MM-DDTHH:00:00");
  return timeStamp;
};

export const sessionTimedOut = ({ history }) => {
  localStorage.removeItem("pa_token");
  history.replace("/login");
};
