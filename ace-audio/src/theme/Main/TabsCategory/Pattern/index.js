import React from "react";
import FirstColumn from "../../../../components/PatternColumns/First";
import SecondColumn from "../../../../components/PatternColumns/Second";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../redux/dashboard/action";

const Index = ({
  handleRequestChange,
  handleInputChange,
  handleSendRequest,
  value,
  setValue,
}) => {
  const Dispatch = useDispatch();
  const { change_track_num_Action } = Actions;
  const { trackNum } = useSelector((state) => state.dashboard);

  const addTrack = () => {
    Dispatch(
      change_track_num_Action([...trackNum, Math.floor(Math.random() * 10000)])
    );
  };

  return (
    <div className="editor-container">
      <div
        style={{
          width: "101vw",
          border: "1px solid #aaa8a8",

          display: "flex",
          flexDirection: "row",
          background: "#2c2c2c",
          marginTop: "-1px",
          marginLeft: "-1px",
          overflow: "hidden",
        }}
      >
        <FirstColumn
          handleRequestChange={handleRequestChange}
          handleInputChange={handleInputChange}
          handleSendRequest={handleSendRequest}
          addTrack={addTrack}
        />
        <div style={{ flexGrow: "1" }}>
          <div
            style={{
              width: "100%",
              borderWidth: " 1px 0px",
              borderStyle: "solid",
              borderColor: "#aaa8a8",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SecondColumn
              handleRequestChange={handleRequestChange}
              handleInputChange={handleInputChange}
              handleSendRequest={handleSendRequest}
              value={value}
              setValue={setValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
