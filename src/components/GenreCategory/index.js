import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setGenresData,
  setScreenSize,
} from "../../Redux/Reducers/genreReducer";
import { fetchGenresCategoryData } from "../../services/spotifyHome";
import LoaderView from "../LoaderView";
import BackNavigation from "../BackNavigation";
import NavBar from "../NavBar";
import GenreCategoryItem from "../GenreCategoryItem";
import "./index.css";
import { sessionTimedOut } from "../../utils/utils";

class GenreCategory extends Component {
  componentDidMount() {
    this.getGenrePlayList();
    window.addEventListener("resize", this.resizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeWindow);
  }

  resizeWindow = () => {
    this.props.setScreenSize(window.innerWidth);
  };

  getGenrePlayList = async () => {
    const { match, store } = this.props;
    const { categoryId } = match.params;
    const { country } = store.userProfile;

    try {
      const response = await fetchGenresCategoryData(categoryId, country);
      const data = response.playlists.items.map((item) => item);
      // console.log(data, "genre Cat data");
      this.props.setGenresData({
        genreListData: data,
        isLoading: false,
        screenSize: window.innerWidth,
      });
    } catch (error) {
      console.error(error);
      sessionTimedOut(this.props);
    }
  };

  renderPage = () => {
    const { genreListData } = this.props.store;

    return (
      <>
        <h1 className="category-heading">Podcast</h1>
        <ul className="genre-list-container">
          {genreListData.map((item, index) => (
            <GenreCategoryItem genreListItem={item} key={index} />
          ))}
        </ul>
      </>
    );
  };

  render() {
    const { isLoading, screenSize } = this.props.store;
    // console.log(this.props);

    return (
      <>
        <div className="genre-category-container">
          {screenSize >= 768 && <NavBar />}
          <BackNavigation />
          {isLoading ? <LoaderView /> : this.renderPage()}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: { ...state.genre, ...state.user },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGenresData: (data) => dispatch(setGenresData(data)),
    setScreenSize: (data) => dispatch(setScreenSize(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenreCategory);
