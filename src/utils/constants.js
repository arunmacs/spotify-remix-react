export const slugs = {
  editorPick: "/editor-pick",
  newRelease: "/new-releases/album",
  genreAlbum: "/genre",
  yourMusic: "/your-music",
  yourPlaylists: "/your-playlists",
};

export const apiUrls = {
  editorsPicksApiUrl: "https://api.spotify.com/v1/browse/featured-playlists",
  editorPickPlaylistApiUrl:
    "https://api.spotify.com/v1/users/spotify/playlists",
  newReleasesApiUrl: "https://api.spotify.com/v1/browse/new-releases",
  newReleasePlaylistApiUrl: "https://api.spotify.com/v1/albums",
  genreAlbumPlaylistApiUrl: `https://api.spotify.com/v1/playlists`,
  // suffix with /:id/tracks for the above api in component/service level
  genresAndMoodsApiUrl: "https://api.spotify.com/v1/browse/categories",
  genresCategoryApiUrl: "https://api.spotify.com/v1/browse/categories",
  // suffix with category /:id and ?country= param for the above api in component/service level
  yourMusicPlaylistApiUrl: `https://api.spotify.com/v1/me/tracks`,
  yourPlaylistsApiUrl: `https://api.spotify.com/v1/users/spotify/playlists`,
  userApiUrl: "https://api.spotify.com/v1/me",
};

export const actions = {
  editors: "editorsPick",
  genres: "genresMoods",
  newReleases: "newReleases",
};

export const resetState = {
  index: 0,
  pause: false,
  activeSongClass: 0,
  currTime: "0:00",
  seek: 0,
  volume: 10,
  screenSize: window.innerWidth,
};
