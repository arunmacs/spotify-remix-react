import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { BsFillPersonFill, BsMusicNoteList } from "react-icons/bs";
import { FiSearch, FiMenu } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { IoMusicalNotesSharp, IoClose } from "react-icons/io5";

import "./index.css";

class NavBar extends Component {
  state = { showMenu: false, slug: "/" };

  componentDidMount() {
    const { match } = this.props;
    const slug = match.path.split("/")[1];
    this.setState({ slug });
  }

  onClickToggleMenu = () => {
    this.setState((prevState) => ({ showMenu: !prevState.showMenu }));
  };

  onClickRedirectHome = () => {
    const { history } = this.props;
    history.replace("/");
  };

  RenderMenuButton = () => {
    const { slug } = this.state;

    return (
      <>
        <nav className="top-navbar-container">
          <button
            type="button"
            onClick={this.onClickRedirectHome}
            className="logo-button"
          >
            <img
              src="/img/music.svg"
              alt="music-spectrum"
              className="music-spectrum-img"
            />
          </button>
          <button
            type="button"
            onClick={this.onClickToggleMenu}
            className="menu-close-button"
          >
            <FiMenu className="menu-icon" />
          </button>
        </nav>
        <nav className="side-navbar-container">
          <button
            type="button"
            onClick={this.onClickRedirectHome}
            className="logo-button"
          >
            <img
              src="/img/music.svg"
              alt="music-spectrum"
              className="music-spectrum-img"
            />
          </button>
          <div className="side-navbar-links">
            <Link
              to="/profile"
              key="profile"
              className={`icon-container ${
                slug === "profile" ? "activeIcon" : ""
              } `}
            >
              <BsFillPersonFill className="menu-option" />
            </Link>

            <Link
              to="/"
              key="avatar"
              className={`icon-container ${slug !== "" ? "" : "activeIcon"} `}
            >
              <IoMdHome className="menu-option" />
            </Link>

            <Link
              to="/search"
              key="search"
              className={`icon-container ${
                slug === "search" ? "activeIcon" : ""
              } `}
            >
              <FiSearch className="menu-option" />
            </Link>

            <Link
              to="/your-music"
              key="yourMusic"
              className={`icon-container ${
                slug === "your-music" ? "activeIcon" : ""
              } `}
            >
              <IoMusicalNotesSharp className="menu-option" />
            </Link>

            <Link
              to="/your-playlists"
              key="yourPlaylist"
              className={`icon-container ${
                slug === "your-playlists" ? "activeIcon" : ""
              } `}
            >
              <BsMusicNoteList className="menu-option" />
            </Link>
          </div>
        </nav>
      </>
    );
  };

  RenderMenuOptions = () => {
    const { slug } = this.state;

    return (
      <nav className="top-navbar-links">
        <Link
          to="/profile"
          className={`icon-container ${
            slug === "profile" ? "activeIcon" : ""
          } `}
        >
          <BsFillPersonFill className="menu-option" />
        </Link>
        <Link
          to="/"
          className={`icon-container ${slug !== "" ? "" : "activeIcon"} `}
        >
          <IoMdHome className="menu-option" />
        </Link>
        <Link
          to="/search"
          className={`icon-container ${slug === "search" ? "activeIcon" : ""} `}
        >
          <FiSearch className="menu-option" />
        </Link>
        <Link
          to="/your-music"
          className={`icon-container ${
            slug === "your-music" ? "activeIcon" : ""
          } `}
        >
          <IoMusicalNotesSharp className="menu-option" />
        </Link>
        <Link
          to="/your-playlists"
          className={`icon-container ${
            slug === "your-playlists" ? "activeIcon" : ""
          } `}
        >
          <BsMusicNoteList className="menu-option" />
        </Link>
        <button
          type="button"
          onClick={this.onClickToggleMenu}
          className="menu-close-button"
        >
          <IoClose className="close-icon" />
        </button>
      </nav>
    );
  };

  render() {
    const { showMenu } = this.state;

    return (
      <header className="navbar-container">
        {showMenu ? this.RenderMenuOptions() : this.RenderMenuButton()}
      </header>
    );
  }
}

export default withRouter(NavBar);
