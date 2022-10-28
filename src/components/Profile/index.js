import React, { Component } from "react";
import { connect } from "react-redux";
import { sessionTimedOut } from "../../utils/utils";
// import LoaderView from "../LoaderView";
import NavBar from "../NavBar";

import "./index.css";

class Profile extends Component {
  render() {
    const { userProfile } = this.props.store;

    return (
      <>
        <NavBar />
        <div className="profile-container">
          <img src="/img/avatar-icon.png" alt="avatar" className="user-icon" />
          <h1 className="user-name">{userProfile.display_name}</h1>
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.user,
  };
};

export default connect(mapStateToProps)(Profile);
