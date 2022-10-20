import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import NewHeader from "../modules/NewHeader";
import "../styles/homepage.css";
import Loader from "../theme/Components/Loader";
import { isAuthenticated } from "../utilities/hooks/auth/util";

const Homepage = () => {
  const { loading, success } = useSelector((state) => state.dashboard);
  let history = useHistory();

  if (success) {
    if (isAuthenticated()) {
      history.push("/search/audio");
    }
  }

  return loading ? (
    <Loader imgPath="/static/img/loaders/load3.svg" />
  ) : (
    <div>
      <NewHeader />
      <img
        src="/static/logo-rec-500px.png"
        className="logo_img"
        alt="logo"
        title="logo"
      />

      <Link to="/login" className="logo_login_btn">
        <button
          onClick={() => {
            //handleClick();
          }}
          className="logo_login_btn"
        >
          Log In with Discord
        </button>
      </Link>
    </div>
  );
};

export default Homepage;
