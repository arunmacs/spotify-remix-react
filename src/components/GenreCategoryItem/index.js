import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./index.css";

const noAlbumImg =
  "https://images-platform.99static.com/FCY98Yn5UDRBmQcpm4Sve3b1EP8=/0x0:1875x1875/500x500/top/smart/99designs-contests-attachments/83/83315/attachment_83315236";

const GenreCategoryItem = (props) => {
  const { genreListItem } = props;
  const { images, name, tracks, id } = genreListItem;

  const getCategoryId = () => {
    const { match } = props;
    const { params } = match;
    const { categoryId } = params;
    return categoryId;
  };

  let image;
  // console.log(typeof images === undefined);

  if (images === "undefined") {
    image = noAlbumImg;
  } else {
    // console.log(images[0].url, "imagesss");
    image = images[0].url;
  }

  return (
    <Link to={`/genre/${getCategoryId()}/${id}/playlist`}>
      <li className="genre-album-container">
        <img
          src={image}
          height={60}
          alt="genre-album"
          className="genre-album-image"
        />
        <div className="genre-album-info">
          <p className="genre-album-name">{name}</p>
          <p className="genre-album-tracks">{tracks.total} Tracks</p>
        </div>
      </li>
    </Link>
  );
};

export default withRouter(GenreCategoryItem);
