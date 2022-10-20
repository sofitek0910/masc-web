import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { audio, lfo, midi } from "../../../../constants/ApiBodyData";
import * as Actions from "../../../../redux/dashboard/action";

const Index = () => {
  const Dispatch = useDispatch();
  const { addTreeData_Action } = Actions;

  const addNewData = (value) => {
    const documentLink = `https://jgen.dj.tools/factory/${value.toLowerCase()}`;
    const ID = uuidv4();
    if (value === "MIDI") {
      const newData = [
        {
          id: `${ID}`,
          title: `${value}`,
          linkURL: documentLink,
          body: midi[0],
          isDirectory: true,
          expanded: true,
          children: [],
        },
      ];
      Dispatch(addTreeData_Action(newData[0]));
    }
    if (value === "AUDIO") {
      const newData = [
        {
          id: `${ID}`,
          title: `${value}`,
          linkURL: documentLink,
          body: audio[0],
          isDirectory: true,
          expanded: true,
          children: [],
        },
      ];
      Dispatch(addTreeData_Action(newData[0]));
    }
    if (value === "LFO") {
      const newData = [
        {
          id: `${ID}`,
          title: `${value}`,
          linkURL: documentLink,
          body: lfo[0],
          isDirectory: true,
          expanded: true,
          children: [],
        },
      ];
      Dispatch(addTreeData_Action(newData[0]));
    }
  };

  return (
    <div className="inner-request-menu">
      {/* <div className="d-flex justify-content-center">
          <button
            className="devTool"
            onClick={() => {
              handleDeveloperTool();
            }}
          >
            Developer Tools
          </button>
        </div> */}
      <div className="menu-header">
        <button className="audio_btn" onClick={(e) => addNewData("AUDIO")}>
          AUDIO
        </button>

        <button className="midi_btn" onClick={(e) => addNewData("MIDI")}>
          MIDI
        </button>

        <button className="lfo_btn" onClick={(e) => addNewData("LFO")}>
          LFO
        </button>
        <button className="patch_btn" onClick={(e) => {}}>
          PATCH
        </button>
      </div>
    </div>
  );
};

export default Index;
