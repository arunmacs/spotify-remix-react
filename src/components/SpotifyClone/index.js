// Libraries/Packages
import React, { Component } from "react";
import { connect } from "react-redux";
// Redux/UtilityFunctions/Constants/Services
import {
  setEditorsPicks,
  setGenreMoods,
  setNewReleases,
  setEditorPickSectionLoading,
  setGenreMoodSectionLoading,
  setNewReleaseSectionLoading,
} from "../../Redux/Reducers/spotifyHomeReducer";
// import { userProfile } from '../../services'
import {
  getTimeStamp,
  sessionTimedOut,
  getFetchOptions,
} from "../../utils/utils";
import { actions, apiUrls } from "../../utils/constants";
// Components
import NavBar from "../NavBar";
import Cards from "../Cards";
import LoaderView from "../LoaderView";
// CSS/Styles
import "./index.css";

class SpotifyClone extends Component {
  componentDidMount() {
    this.getEditorsPickData();
    this.getGenreAndMoodsData();
    this.getNewReleasesData();
  }

  getEditorsPickData = async () => {
    const timeStamp = getTimeStamp();
    const userDataResponse = await fetch(apiUrls.userApiUrl, getFetchOptions());
    const userData = await userDataResponse.json();
    const { country } = userData;
    const editorsPickApiUrl = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${timeStamp}`;
    const response = await fetch(editorsPickApiUrl, getFetchOptions());

    if (response.ok === true) {
      const data = await response.json();
      // console.log('getEditorsPickData', data)

      const updatedData = data.playlists.items.map((item) => ({
        id: item.id || "undefined",
        type: item.type || "undefined",
        albumType: item.album_type || "undefined",
        name: item.name || "undefined",
        artists: item.artists || "undefined",
        images: item.images || "undefined",
        releaseDate: item.release_date || "undefined",
        externalUrls: item.external_urls || "undefined",
        totalTracks: item.total_tracks || "undefined",
        uri: item.uri || "undefined",
        slug: "editor-pick",
      }));

      this.props.setData(updatedData, { type: actions.editors });
      this.props.setLoading(false, { type: actions.editors });
    } else {
      sessionTimedOut(this.props);
    }
  };

  getGenreAndMoodsData = async () => {
    const categoryApiUrl = "https://api.spotify.com/v1/browse/categories";

    const response = await fetch(categoryApiUrl, getFetchOptions());

    if (response.ok === true) {
      const data = await response.json();
      // console.log('getGenreAndMoodsData', data)

      const updatedData = data.categories.items.map((item) => ({
        id: item.id || "undefined",
        type: "category",
        albumType: item.album_type || "undefined",
        name: item.name || "undefined",
        artists: item.artists || "undefined",
        images: item.icons || "undefined",
        releaseDate: item.release_date || "undefined",
        externalUrls: item.external_urls || "undefined",
        totalTracks: item.total_tracks || "undefined",
        uri: item.uri || "undefined",
        slug: "genre",
      }));

      this.props.setData(updatedData, { type: actions.genres });
      this.props.setLoading(false, { type: actions.genres });
    } else {
      sessionTimedOut(this.props);
    }
  };

  getNewReleasesData = async () => {
    const userApiUrl = "https://api.spotify.com/v1/me";

    const userDataResponse = await fetch(userApiUrl, getFetchOptions());
    const userData = await userDataResponse.json();
    const { country } = userData;

    const newReleasesApiUrl = `https://api.spotify.com/v1/browse/new-releases?country=${country}`;

    const response = await fetch(newReleasesApiUrl, getFetchOptions());
    if (response.ok === true) {
      const data = await response.json();
      // console.log('getNewReleasesData', data)

      const updatedData = data.albums.items.map((item) => ({
        id: item.id || "undefined",
        type: item.type || "undefined",
        albumType: item.album_type || "undefined",
        name: item.name || "undefined",
        artists: item.artists || "undefined",
        images: item.images || "undefined",
        releaseDate: item.release_date || "undefined",
        externalUrls: item.external_urls || "undefined",
        totalTracks: item.total_tracks || "undefined",
        uri: item.uri || "undefined",
        slug: "new-releases/album",
      }));

      this.props.setData(updatedData, { type: actions.newReleases });
      this.props.setLoading(false, { type: actions.newReleases });
    } else {
      sessionTimedOut(this.props);
    }
  };

  renderCardsItems = (title, data) => (
    <div className="content-container">
      <h1 className="content-heading">{title}</h1>
      <div className="content">
        {data.map((item, index) => (
          <Cards data={item} key={index} />
        ))}
      </div>
    </div>
  );

  renderHomeView = () => {
    const {
      isEditorPickSectionLoading,
      isGenreMoodSectionLoading,
      isNewReleaseSectionLoading,
      editorsPickData,
      genresAndMoodsData,
      newReleasesData,
    } = this.props.store;

    return (
      <>
        {isEditorPickSectionLoading ? (
          <LoaderView />
        ) : (
          this.renderCardsItems("Editor's picks", editorsPickData)
        )}
        {isGenreMoodSectionLoading ? (
          <LoaderView />
        ) : (
          this.renderCardsItems("Genres & Moods", genresAndMoodsData)
        )}
        {isNewReleaseSectionLoading ? (
          <LoaderView />
        ) : (
          this.renderCardsItems("New Releases", newReleasesData)
        )}
      </>
    );
  };

  render() {
    return (
      <div className="app-container">
        <NavBar />
        <div className="app-body">{this.renderHomeView()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.spotifyHomeReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setData: (data, { type }) => {
      switch (type) {
        case actions.editors:
          return dispatch(setEditorsPicks(data));
        case actions.genres:
          return dispatch(setGenreMoods(data));
        case actions.newReleases:
          return dispatch(setNewReleases(data));
        default:
          return;
      }
    },
    setLoading: (data, { type }) => {
      switch (type) {
        case actions.editors:
          return dispatch(setEditorPickSectionLoading(data));
        case actions.genres:
          return dispatch(setGenreMoodSectionLoading(data));
        case actions.newReleases:
          return dispatch(setNewReleaseSectionLoading(data));
        default:
          return;
      }
    },
    // setData: (data) => dispatch(setSpotifyHomeData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyClone);
