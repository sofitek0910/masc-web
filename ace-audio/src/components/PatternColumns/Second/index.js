import React from "react";
import ResizePanel from "react-resize-panel";
import Editor from "../../Editor/Editor";
import MainTracker from "./TrackerPlayer/mainTracker/mainTracker";
import { Row } from "react-bootstrap";

const Index = ({  
  handleRequestChange,
  handleInputChange,
  handleSendRequest,
}) => {
  return (
    <div className="editors-section">
      <div className="flexbox">
        <div className="one">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            id="aboveditor"
          >
            <ResizePanel
              direction="s"
              handleClass="customHandle"
            >
              <div className="" style={{ width: "100%", height: "100%" }}>
                <MainTracker />
              </div>
            </ResizePanel>
          </div>

          <Editor
            getLink={handleInputChange}
            onClick={handleSendRequest}
            showRequestBar={true}
            handleRequestChange={handleRequestChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
