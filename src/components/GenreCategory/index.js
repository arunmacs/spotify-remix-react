import React, { Component } from "react";
import { getFetchOptions } from "../../utils/utils";
import { apiUrls } from "../../utils/constants";
import LoaderView from "../LoaderView";
import BackNavigation from "../BackNavigation";
import NavBar from "../NavBar";
import GenreCategoryItem from "../GenreCategoryItem";
import "./index.css";

class GenreCategory extends Component {
  state = { genreListData: [], isLoading: true, screenSize: window.innerWidth };

  componentDidMount() {
    this.getGenrePlayList();
    window.addEventListener("resize", this.resizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeWindow);
  }

  resizeWindow = () => {
    this.setState({ screenSize: window.innerWidth });
  };

  getGenrePlayList = async () => {
    const { match } = this.props;
    const { params } = match;
    const { categoryId } = params;

    const userDataResponse = await fetch(apiUrls.userApiUrl, getFetchOptions());
    const userData = await userDataResponse.json();
    const { country } = userData;

    const genreListApiUrl = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=${country}`;

    const response = await fetch(genreListApiUrl, getFetchOptions());
    if (response.ok === true) {
      const data = await response.json();
      // console.log("data >>> ", data);

      const updatedData = await data.playlists.items.map((item) => item);
      // console.log("updatedData >>> ", updatedData);

      this.setState({ genreListData: updatedData, isLoading: false });
    }
  };

  renderPage = () => {
    const { genreListData } = this.state;

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
    const { isLoading, screenSize } = this.state;

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

export default GenreCategory;
