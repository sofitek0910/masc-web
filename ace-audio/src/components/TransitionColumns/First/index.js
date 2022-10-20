import React from "react";
import ResizePanel from "react-resize-panel";
import SearchPatternSection from "../../SequenceColumns/First/SearchPatternSection";
import Button from "../../../theme/Components/Button";

const ButtonSection = () => {
  return (
    <div className="ButtonSection m-3">
      <Button
        btnStyleClass="transition_btn"
        handleBtnClick={() => {}}
        BtnInnerValue={<img alt="" src="/static/plus.svg" />}
      />
      <Button
        btnStyleClass="transition_btn"
        handleBtnClick={() => {}}
        BtnInnerValue={<img alt="" src="/static/copy.svg" />}
      />
      <Button
        btnStyleClass="transition_btn"
        handleBtnClick={() => {}}
        BtnInnerValue={<img alt="" src="/static/copy.svg" />}
      />
      <Button
        btnStyleClass="transition_btn"
        handleBtnClick={() => {}}
        BtnInnerValue={<img alt="" src="/static/copy.svg" />}
      />
    </div>
  );
};

const Index = () => {
  return (
    <>
      <ResizePanel
        direction="e"
        style={{ width: "20%" }}
        handleClass="customHandle"
      >
        <div className="left-column-wrapper">
          <ButtonSection />
          <SearchPatternSection />
        </div>
      </ResizePanel>
    </>
  );
};

export default Index;
