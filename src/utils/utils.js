const slugs = {
  editorPick: "/editor-pick",
  newRelease: "/new-releases/album",
  genreAlbum: "/genre",
  yourMusic: "/your-music",
  yourPlaylists: "/your-playlists",
};

const apiUrls = {
  editorPickPlaylistApiUrl:
    "https://api.spotify.com/v1/users/spotify/playlists",
  newReleasePlaylistApiUrl: "https://api.spotify.com/v1/albums",
  genreAlbumPlaylistApiUrl: `https://api.spotify.com/v1/playlists`,
  //   suffix with /:id/tracks for the above api in component level filter
  yourMusicPlaylistApiUrl: `https://api.spotify.com/v1/me/tracks`,
  yourPlaylistsApiUrl: `https://api.spotify.com/v1/users/spotify/playlists`,
};

export const getSpecificPlaylistApiUrl = (slug, id) => {
  // console.log(slug, id)
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
