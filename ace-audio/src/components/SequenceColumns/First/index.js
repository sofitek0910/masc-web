import React, {useState} from "react";
import ResizePanel from "react-resize-panel";
import ButtonSection from "./ButtonSection";
import PatternSection from "./PatternSection";
import SearchPatternSection from "./SearchPatternSection";
import AddGuidModal from "../../../theme/Components/Modal/modalGuidInput";

const Index = ({
                 handleRequestChange,
                 handleInputChange,
                 handleSendRequest,
                 handleValueChange,
                 errorText,
                 setErrorText,
                 tonDataSettings,
                 setTonDataSettings,
                 guids,
                 setGuids,
                 tonDataArraySettings,
                 setTonDataArraySettings,
                 handleResponseChange,
                 setSequenceListGuid,
                 sequenceListGuid
               }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ResizePanel
        direction="e"
        style={{width: "20%"}}
        handleClass="customHandle"
      >
        <div className="left-column-wrapper">
          <ButtonSection setShowModal={setShowModal}/>
          <AddGuidModal
            showModal={showModal}
            setShowModal={setShowModal}
            onValueChange={handleValueChange}
            errorText={errorText}
            setErrorText={setErrorText}
            tonDataSettings={tonDataSettings}
            setTonDataSettings={setTonDataSettings}
            tonDataArraySettings={tonDataArraySettings}
            guids={guids}
            handleResponseChange={handleResponseChange}
          />
          <PatternSection
            sequenceListGuid={sequenceListGuid}
            setSequenceListGuid={setSequenceListGuid}
          />
          <SearchPatternSection handleResponseChange={handleResponseChange}/>
        </div>
      </ResizePanel>
    </>
  );
};

export default Index;
