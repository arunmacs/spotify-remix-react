import React from "react";
import { connect } from "react-redux";
import {
  setIndex,
  setActiveSong,
  setPauseState,
  setCurrTime,
  setSeek,
  setVolume,
  setScreenSize,
  setResetState,
} from "../../Redux/Reducers/musicPlayerReducer";
import { FiPlay, FiPause } from "react-icons/fi";
import { BiVolumeFull } from "react-icons/bi";
import { BsSkipForward, BsSkipBackward } from "react-icons/bs";
import NavBar from "../NavBar";
import BackNavigation from "../BackNavigation";
import AlbumDisplayInfo from "../AlbumDisplayInfo";
import SongItem from "../SongItem";

import "./index.css";

class MusicPlayer extends React.Component {
  componentDidMount() {
    this.playerRef.addEventListener("timeupdate", this.timeUpdate);
    this.playerRef.addEventListener("ended", this.nextSong);
    this.playerRef.addEventListener("volumechange", this.adjustVolume);
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    this.playerRef.removeEventListener("timeupdate", this.timeUpdate);
    this.playerRef.removeEventListener("ended", this.nextSong);
    this.playerRef.removeEventListener("volumechange", this.adjustVolume);
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    this.props.setScreenSize(window.innerWidth);
  };

  getArtistName = (artist) => {
    if (artist !== undefined) {
      return artist[0].name;
    }
    return "Artist";
  };

  getAlbumImageArtist = (currentSong) => {
    const { album, artists } = currentSong;
    let image;
    let artist;

    if (album !== undefined) {
      image = album.images.reduce((prev, curr) =>
        prev.height < curr.height ? prev : curr
      );
      image = image.url;
    } else {
      image = "/img/no-album-image.png";
    }

    if (artists !== undefined) {
      artist = artists[0].name;
    } else {
      artist = "Artist";
    }

    return { album_image: image, album_artist: artist };
  };

  prevSong = () => {
    const { index, activeSongClass, pause } = this.props.store;

    if (index - 1 >= 0 && activeSongClass - 1 >= 0) {
      this.props.setIndex(index - 1);
      this.props.setActiveSong(activeSongClass - 1);
      setTimeout(() => this.updatePlayer(), 200);
    } else {
      this.playerRef.pause();
      this.props.setPauseState(!pause);
    }
  };

  nextSong = () => {
    const { index, activeSongClass, pause, playlist } = this.props.store;

    if (
      index + 1 === playlist.length &&
      activeSongClass + 1 === playlist.length
    ) {
      this.playerRef.pause();
      this.props.setPauseState(!pause);
    } else {
      this.props.setIndex(index + 1);
      this.props.setActiveSong(activeSongClass + 1);
      setTimeout(() => this.updatePlayer(), 200);
    }
  };

  playOrPause = () => {
    const { playlist, index, pause } = this.props.store;
    const currentSong = playlist[index];
    const audio = new Audio(currentSong.audio);
    console.log(audio);

    if (!pause) {
      this.playerRef.play();
    } else {
      this.playerRef.pause();
    }

    this.props.setPauseState(!pause);
  };

  updatePlayer = () => {
    const { playlist, index, pause } = this.props.store;

    const currentSong = playlist[index];
    const audio = new Audio(currentSong.audio);
    console.log(audio);
    this.playerRef.load();

    if (pause) {
      this.playerRef.play();
    } else {
      this.playerRef.pause();
    }
  };

  timeUpdate = () => {
    const { currentTime } = this.playerRef;

    const inMins = Math.floor(currentTime / 60);
    const inSecs = Math.floor(currentTime % 60);
    const progress =
      100 * (this.playerRef.currentTime / this.playerRef.duration);

    if (inSecs < 10) {
      this.props.setCurrTime(`${inMins}:0${inSecs}`);
      this.props.setSeek(progress);
    } else {
      this.props.setCurrTime(`${inMins}:${inSecs}`);
      this.props.setSeek(progress);
    }
  };

  formatTime = (secs) => {
    const inMins = Math.floor(secs / 60);
    const inSecs = Math.floor(secs % 60);

    if (inSecs < 10) {
      return `${inMins}:0${inSecs}`;
    }
    return `${inMins}:${inSecs}`;
  };

  onClickSelectSong = (index) => {
    this.props.setIndex(index);
    this.props.setActiveSong(index);
    this.props.setPauseState(true);

    setTimeout(() => this.updatePlayer(), 200);
  };

  changeCurrTime = () => {
    const { seek } = this.props.store;
    this.playerRef.currentTime = (this.playerRef.duration * seek) / 100;
  };

  adjustVolume = () => {
    const { volume } = this.props.store;
    this.playerRef.volume = volume / 10;
  };

  changeSeekSlider = (event) => {
    this.props.setSeek(Number(event.target.value));
    setTimeout(() => this.changeCurrTime(), 200);
  };

  changeVolumeSlider = (event) => {
    this.props.setVolume(Number(event.target.value));
    setTimeout(() => this.adjustVolume(), 200);
  };

  renderMusicControlsMobileView = () => {
    const { playlist, index, pause } = this.props.store;
    const currentSong = playlist[index];
    const { album_image, album_artist } = this.getAlbumImageArtist(currentSong);

    return (
      <>
        <audio
          ref={(ref) => {
            this.playerRef = ref;
          }}
        >
          <source src={currentSong.preview_url} type="audio/mp3" />
          <track kind="captions" srcLang="en" />
        </audio>
        <img src={album_image} alt="album" className="album-img" />
        <div className="album-info">
          <p className="album-name">{currentSong.name}</p>
          <div className="artist-div">
            <span className="artist-name">{album_artist}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={this.prevSong}
          className="next-prev-button"
        >
          <BsSkipBackward className="next-prev-icon" />
        </button>
        <button
          type="button"
          onClick={this.playOrPause}
          className="play-pause-button"
        >
          {!pause ? (
            <FiPlay className="play-pause-icon" />
          ) : (
            <FiPause className="play-pause-icon" />
          )}
        </button>
        <button
          type="button"
          onClick={this.nextSong}
          className="next-prev-button"
        >
          <BsSkipForward className="next-prev-icon" />
        </button>
      </>
    );
  };

  renderMusicControlsDesktopView = () => {
    const { playlist, index, pause, currTime, seek, volume } = this.props.store;

    const currentSong = playlist[index];
    const { duration_ms } = currentSong;

    const { album_image, album_artist } = this.getAlbumImageArtist(currentSong);

    return (
      <>
        <audio
          ref={(ref) => {
            this.playerRef = ref;
          }}
        >
          <source src={currentSong.preview_url} type="audio/mp3" />
          <track kind="captions" srcLang="en" />
        </audio>
        <img src={album_image} alt="album" className="album-img" />
        <div className="album-info">
          <p className="album-name">{currentSong.name}</p>
          <div className="artist-div">
            <span className="artist-name">{album_artist}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={this.prevSong}
          className="next-prev-button"
        >
          <BsSkipBackward className="next-prev-icon" />
        </button>
        <button
          type="button"
          onClick={this.playOrPause}
          className="play-pause-button"
        >
          {!pause ? (
            <FiPlay className="play-pause-icon" />
          ) : (
            <FiPause className="play-pause-icon" />
          )}
        </button>
        <button
          type="button"
          onClick={this.nextSong}
          className="next-prev-button"
        >
          <BsSkipForward className="next-prev-icon" />
        </button>
        <span className="time-update">
          {this.formatTime(duration_ms / 1000)}
        </span>
        <input
          type="range"
          className="seek-slider"
          value={seek || 0}
          onChange={this.changeSeekSlider}
          onClick={this.changeSeekSlider}
          max="100"
        />
        <span className="time-update">{currTime}</span>
        <BiVolumeFull className="volume-icon" />
        <input
          type="range"
          max="10"
          value={volume}
          className="volume-slider"
          onChange={this.changeVolumeSlider}
          onClick={this.changeVolumeSlider}
        />
      </>
    );
  };

  renderSongsList = () => {
    const { playlist, activeSongClass, displayInfo } = this.props.store;
    // console.log("MusicPlayer > playlist > ", playlist);
    return (
      <>
        {playlist.map((item, key = 0) => (
          <SongItem
            songData={item}
            displayInfo={displayInfo}
            selectSong={this.onClickSelectSong}
            isActive={activeSongClass === key}
            index={key}
            key={key}
          />
        ))}
      </>
    );
  };

  render() {
    const { displayInfo, section, screenSize } = this.props.store;
    // console.log(this.props, "musicccc player props");

    return (
      <div className="player-container">
        {screenSize >= 768 && <NavBar />}
        <BackNavigation />
        <div className="playlist-container">
          <AlbumDisplayInfo displayInfo={displayInfo} section={section} />
          {screenSize >= 768 && (
            <div id="columns-row" style={{ width: "95%" }}>
              <span id="column-name">Track</span>
              <span id="column-name">Album</span>
              <span id="column-name">Time</span>
              <span id="column-name">Artist</span>
              <span id="column-name">Added</span>
            </div>
          )}
          <ul className="playlist">{this.renderSongsList()}</ul>
        </div>
        <div className="music-controls">
          {screenSize >= 768
            ? this.renderMusicControlsDesktopView()
            : this.renderMusicControlsMobileView()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: { ...state.musicPlayerReducer, ...state.playlistReducer },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIndex: (data) => dispatch(setIndex(data)),
    setActiveSong: (data) => dispatch(setActiveSong(data)),
    setCurrTime: (data) => dispatch(setCurrTime(data)),
    setPauseState: (data) => dispatch(setPauseState(data)),
    setScreenSize: (data) => dispatch(setScreenSize(data)),
    setSeek: (data) => dispatch(setSeek(data)),
    setVolume: (data) => dispatch(setVolume(data)),
    setResetState: (data) => dispatch(setResetState(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
