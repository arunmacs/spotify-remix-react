import React, { Component } from "react";
import { connect } from "react-redux";
import { setPlaylist } from "../../Redux/Reducers/playlistReducer";
import {
  sessionTimedOut,
  getFetchOptions,
  getSpecificPlaylistApiUrl,
} from "../../utils/utils";
import MusicPlayer from "../MusicPlayer";
import LoaderView from "../LoaderView";

import "./index.css";

class Playlist extends Component {
  componentDidMount() {
    this.getSpecificPlaylist();
  }

  getSpecificPlaylist = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const slug = match.path.split("/:")[0];

    const apiUrl = getSpecificPlaylistApiUrl(slug, id);
    // console.log("apiUrl > ", slug, " > ", apiUrl);

    const response = await fetch(apiUrl, getFetchOptions());

    if (response.ok === true) {
      const data = await response.json();

      // console.log("data >>> ", data);

      const displayInfo = {
        id: data.id || "undefined",
        type: data.type || "undefined",
        name: data.name || "undefined",
        description: data.description || "undefined",
        externalUrls: data.external_urls || "undefined",
        images: data.images || "undefined",
        primaryColor: data.primary_color || "undefined",
        tracks: data.tracks || "undefined",
        uri: data.uri || "undefined",
      };

      let playlist;

      if (slug === "/genre" || slug === "/your-music") {
        // console.log('slug > ', slug)
        playlist = await data.items.map((item) => item.track);
      }
      if (slug === "/new-releases/album") {
        // console.log('slug ', slug)
        playlist = await data.tracks.items.map((item) => item);
      }
      if (slug === "/editor-pick" || slug === "/your-playlists") {
        // console.log("slug ", slug);
        playlist = await data.tracks.items.map((item) => item.track);
      }

      // console.log("playlist > ", playlist);
      this.props.setPlaylist({
        playlist,
        displayInfo,
        isLoading: false,
      });
    } else {
      sessionTimedOut(this.props);
    }
  };

  render() {
    const { isLoading, displayInfo, playlist } = this.props.store;
    // console.log(this.props);

    return (
      <div>
        {isLoading ? (
          <LoaderView />
        ) : (
          <MusicPlayer
            playlist={playlist}
            displayInfo={displayInfo}
            section="Editor's pick's"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.playlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPlaylist: (data) => {
      dispatch(setPlaylist(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
