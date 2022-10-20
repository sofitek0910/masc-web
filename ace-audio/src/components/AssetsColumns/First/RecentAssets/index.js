import React from "react";
import ResizePanel from "react-resize-panel";
const Index = () => {
  return (
    <div className="inner_wrapper" id="aboveditor">
      <ResizePanel direction="s" handleClass="customHandle">
        <div className="recent_assets">
          <span className="assets_title">RECENT ASSETS</span>
        </div>
      </ResizePanel>
    </div>
  );
};

export default Index;
