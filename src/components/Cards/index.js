import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

const Cards = (props) => {
  const { data } = props;
  const { name, id, images, slug } = data;

  let image;

  if (images !== undefined) {
    image = images.reduce((prev, curr) =>
      prev.height > curr.height ? prev : curr
    );
    image = image.url;
  } else {
    image = null;
  }

  return (
    <Link to={`/${slug}/${id}`}>
      <div className="card-item">
        <img src={image} alt="" className="card-item-image" />
        <p className="card-item-name">{name}</p>
      </div>
    </Link>
  );
};

export default Cards;
