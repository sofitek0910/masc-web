import React from "react";

const Index = ({ btnStyleClass, handleBtnClick, BtnInnerValue }) => {
  return (
    <button className={btnStyleClass} onClick={handleBtnClick}>
      {BtnInnerValue}
    </button>
  );
};

export default Index;
