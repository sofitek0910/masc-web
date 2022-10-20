import React from "react";
import ResizePanel from "react-resize-panel";
import ButtonSection from "./ButtonSection";
import SearchPatternSection from "./SearchPatternSection";
import PatternList from "./PatternList";
import AssetsList from "./AssetsList";

const Index = ({ addTrack }) => {
  return (
    <>
      <ResizePanel
        direction="e"
        style={{ width: "20%" }}
        handleClass="customHandle"
      >
        <div className="left-column-wrapper">
          <ButtonSection addTrack={addTrack} />
          <SearchPatternSection />
          <PatternList />
          <AssetsList />
        </div>
      </ResizePanel>
    </>
  );
};

export default Index;
