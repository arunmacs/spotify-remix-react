import React from "react";
import { useDispatch } from "react-redux";
import { setResetState } from "../../Redux/Reducers/musicPlayerReducer";
import { resetState } from "../../utils/constants";
import { withRouter } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

import "./index.css";

const BackNavigation = ({ history }) => {
  const dispatch = useDispatch();

  const onClickGoBack = () => {
    dispatch(setResetState(resetState));
    history.goBack();
  };

  return (
    <div className="back-arrow-container">
      <button type="button" onClick={onClickGoBack} className="back-button">
        <IoIosArrowBack className="back-arrow" />
      </button>
    </div>
  );
};

export default withRouter(BackNavigation);
