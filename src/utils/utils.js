const slugs = {
  editorPick: '/editor-pick',
  newRelease: '/new-releases/album',
  genreAlbum: '/genre',
}

const apiUrls = {
  editorPickPlaylistApiUrl:
    'https://api.spotify.com/v1/users/spotify/playlists',
  newReleasePlaylistApiUrl: 'https://api.spotify.com/v1/albums',
  genreAlbumPlaylistApiUrl: `https://api.spotify.com/v1/playlists`,
  //   suffix with /:id/tracks for the above api in component level filter
}

export const getSpecificPlaylistApiUrl = (slug, id) => {
  // console.log(slug, id)
  switch (slug) {
    case slugs.editorPick:
      return `${apiUrls.editorPickPlaylistApiUrl}/${id}`
    case slugs.newRelease:
      return `${apiUrls.newReleasePlaylistApiUrl}/${id}`
    case slugs.genreAlbum:
      return `${apiUrls.genreAlbumPlaylistApiUrl}/${id}/tracks`
    default:
      return ''
  }
}
