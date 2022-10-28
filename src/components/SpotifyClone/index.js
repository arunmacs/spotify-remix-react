// Libraries/Packages
import React, { Component } from "react";
import { connect } from "react-redux";
// Redux/UtilityFunctions/Constants/Services
import { setSpotifyHomeData } from "../../Redux/Reducers/spotifyHomeReducer";
import { fetchUserProfile } from "../../Redux/Reducers/userProfileReducer";
import {
  fetchEditorsPickData,
  fetchGenresAndMoodsData,
  fetchNewReleasesData,
} from "../../services/spotifyHome";
import { sessionTimedOut } from "../../utils/utils";
// Components
import NavBar from "../NavBar";
import Cards from "../Cards";
import LoaderView from "../LoaderView";
// CSS/Styles
import "./index.css";

class SpotifyClone extends Component {
  async componentDidMount() {
    await this.props.fetchUserProfile();
    const { userProfile } = this.props.store;
    await Promise.all([
      fetchEditorsPickData(userProfile),
      fetchGenresAndMoodsData(),
      fetchNewReleasesData(userProfile),
    ])
      .then((responseArray) => {
        // console.log(responseArray, " [][][] responseArray <><><>");

        const editorsPickData = responseArray[0].playlists.items.map(
          (item) => ({
            id: item.id || "undefined",
            type: item.type || "undefined",
            album_type: item.album_type || "undefined",
            name: item.name || "undefined",
            artists: item.artists || "undefined",
            images: item.images || "undefined",
            release_date: item.release_date || "undefined",
            external_urls: item.external_urls || "undefined",
            total_tracks: item.total_tracks || "undefined",
            uri: item.uri || "undefined",
            slug: "editor-pick",
          })
        );

        const genresAndMoodsData = responseArray[1].categories.items.map(
          (item) => ({
            id: item.id || "undefined",
            type: "category",
            album_type: item.album_type || "undefined",
            name: item.name || "undefined",
            artists: item.artists || "undefined",
            images: item.icons || "undefined",
            release_date: item.release_date || "undefined",
            external_urls: item.external_urls || "undefined",
            total_tracks: item.total_tracks || "undefined",
            uri: item.uri || "undefined",
            slug: "genre",
          })
        );

        const newReleasesData = responseArray[2].albums.items.map((item) => ({
          id: item.id || "undefined",
          type: item.type || "undefined",
          album_type: item.album_type || "undefined",
          name: item.name || "undefined",
          artists: item.artists || "undefined",
          images: item.images || "undefined",
          release_date: item.release_date || "undefined",
          external_urls: item.external_urls || "undefined",
          total_tracks: item.total_tracks || "undefined",
          uri: item.uri || "undefined",
          slug: "new-releases/album",
        }));

        this.props.setSpotifyHomeData({
          editorsPickData,
          genresAndMoodsData,
          newReleasesData,
          isEditorPickSectionLoading: false,
          isGenreMoodSectionLoading: false,
          isNewReleaseSectionLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        sessionTimedOut(this.props);
      });
  }

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

    // console.log(this.props);
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
    store: { ...state.spotifyHome, ...state.user },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSpotifyHomeData: (data) => dispatch(setSpotifyHomeData(data)),
    fetchUserProfile: (data) => dispatch(fetchUserProfile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyClone);
