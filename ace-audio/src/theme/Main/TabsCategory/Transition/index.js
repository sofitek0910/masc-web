import React from "react";
import FirstColumn from "../../../../components/TransitionColumns/First";
import SecondColumn from "../../../../components/TransitionColumns/Second";
//import "./index.scss";

const Index = () => {
  return (
    <div id="transition" className="editor-container">
      <div className="inner-container">
        <FirstColumn />
        <div style={{ flexGrow: "1" }}>
          <div className="second-column-wrapper">
            <SecondColumn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
