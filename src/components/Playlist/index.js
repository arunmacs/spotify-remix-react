import React, { Component } from "react";
import MusicPlayer from "../MusicPlayer";
import LoaderView from "../LoaderView";
import { getSpecificPlaylistApiUrl } from "../../utils/utils";

import "./index.css";

class Playlist extends Component {
  state = {
    playList: [],
    displayInfo: {},
    isLoading: true,
  };

  componentDidMount() {
    this.getSpecificPlaylist();
  }

  getAccessToken = () => {
    const token = localStorage.getItem("pa_token", "");
    return token;
  };

  sessionTimedOut = () => {
    const { history } = this.props;
    localStorage.removeItem("pa_token");

    history.replace("/login");
  };

  getSpecificPlaylist = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const slug = match.path.split("/:")[0];

    const token = this.getAccessToken();
    const apiUrl = getSpecificPlaylistApiUrl(slug, id);
    console.log("apiUrl > ", slug, " > ", apiUrl);

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    };

    const response = await fetch(apiUrl, options);

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

      let playList;

      if (slug === "/genre" || slug === "/your-music") {
        // console.log('slug > ', slug)
        playList = await data.items.map((item) => item.track);
      }
      if (slug === "/new-releases/album") {
        // console.log('slug ', slug)
        playList = await data.tracks.items.map((item) => item);
      }
      if (slug === "/editor-pick" || slug === "/your-playlists") {
        // console.log("slug ", slug);
        playList = await data.tracks.items.map((item) => item.track);
      }

      // console.log("playList > ", playList);

      this.setState({
        playList,
        displayInfo,
        isLoading: false,
      });
    } else {
      this.sessionTimedOut();
    }
  };

  render() {
    const { isLoading, displayInfo, playList } = this.state;

    return (
      <div>
        {isLoading ? (
          <LoaderView />
        ) : (
          <MusicPlayer
            playList={playList}
            displayInfo={displayInfo}
            section="Editor's pick's"
          />
        )}
      </div>
    );
  }
}

export default Playlist;
