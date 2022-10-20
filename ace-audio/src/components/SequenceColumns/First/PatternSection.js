import React from "react";
import DnDPanel from "../../../theme/Components/panelPatternDnDComponent/panelDndConponent";


const Index = ({
                 tonDataArraySettings,
                 setTonDataArraySettings,
                 setSequenceListGuid,
                 sequenceListGuid
               }) => {
  return (
    <div className="sequence_card mt-3 mb-1"
         style={{
           overflowY: "scroll",
           scrollbarWidth: "none",
           msOverflowStyle: "none",
         }}>
      <span>SEQUENCE</span>
      <DnDPanel patterns={sequenceListGuid}
                setPattern={setSequenceListGuid}
      />

    </div>
  );
};

export default Index;
