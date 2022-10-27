import React, { Component } from "react";
import { connect } from "react-redux";
import { setUserProfileData } from "../../Redux/Reducers/userProfileReducer";
import { sessionTimedOut, getFetchOptions } from "../../utils/utils";
import { apiUrls } from "../../utils/constants";
import LoaderView from "../LoaderView";
import NavBar from "../NavBar";

import "./index.css";

class Profile extends Component {
  componentDidMount() {
    this.getUserProfileData();
  }

  getUserProfileData = async () => {
    const response = await fetch(apiUrls.userApiUrl, getFetchOptions());
    if (response.ok === true) {
      const data = await response.json();
      // console.log("data > ", data);

      this.props.setUserProfileData({ userData: data, isLoading: false });
    } else {
      sessionTimedOut(this.props);
    }
  };

  renderProfilePage = () => {
    const { userData } = this.props.store;

    return (
      <div className="profile-container">
        <img src="/img/avatar-icon.png" alt="avatar" className="user-icon" />
        <h1 className="user-name">{userData.display_name}</h1>
        <div className="followers-playlists-info-container">
          <div className="followers-playlists-div">
            <p className="followers-playlists-info">10</p>
            <p className="followers-playlists-info-text">FOLLOWERS</p>
          </div>
          <div className="followers-playlists-div">
            <p className="followers-playlists-info">20</p>
            <p className="followers-playlists-info-text">PLAYLISTS</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => sessionTimedOut(this.props)}
          className="logout-button"
        >
          LOGOUT
        </button>
      </div>
    );
  };

  render() {
    const { isLoading } = this.props.store;
    // console.log(this.props, "userss");

    return (
      <>
        <NavBar />
        {isLoading ? <LoaderView /> : this.renderProfilePage()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.userProfileReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserProfileData: (data) => {
      dispatch(setUserProfileData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
