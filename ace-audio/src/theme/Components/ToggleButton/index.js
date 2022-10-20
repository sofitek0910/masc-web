import React, { useState } from "react";
import IconLike from "../../../assets/img/like_asset.svg";
import IconDislike from "../../../assets/img/dislike_asset.svg";

const ToggleButton = (props) => {
  const [like, toggleLike] = useState(null);
  return (
    <button
      onClick={() => {
        toggleLike(!like);
      }}
      {...props}
    >
      {like ? <img alt="" src={IconLike} /> : <img alt="" src={IconDislike} />}
    </button>
  );
};

export default ToggleButton;
