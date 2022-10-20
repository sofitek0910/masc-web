import _ from "lodash";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResizePanel from "react-resize-panel";
import { v4 as uuidv4 } from "uuid";
import {
  addNodeAction
} from "../../../redux/assets/action";
import Button from "../../../theme/Components/Button";
import ToggleButton from "../../../theme/Components/ToggleButton";
import { BUTTONS } from "./constants";
import RecentAssets from "./RecentAssets";

// helpers
const createNewSlot = (nodes) => {
  if (nodes.length === 0) return 1;
  let lastSlot = nodes.filter((node) => node.type === "midi").pop();
  let newSlot = !_.isUndefined(lastSlot) ? lastSlot.data.slot + 1 : 1;
  return newSlot;
};

const FirstAssetsColumn = (props) => {
  const leftColRef = React.useRef(null);
  const nodeElements = useSelector((state) => state.assets.nodes);
  const dispatch = useDispatch();

  // Add assets to ReactFlow Screen
  const addNode = useCallback(
    (evt, type) => {
      let id = uuidv4();
      switch (type) {
        case "midi": {
          const newNode = {
            id: id,
            type: type,
            data: {
              label: type,
              midi_type: "",
              guid: "",
              slot: createNewSlot(nodeElements),
              velocity: 60,
              note: "C3",
              rhythm: "1...1...1...1...",
              control_program: 2,
              offset: 0,
              interpolate_last_to_first: false,
              envelope: "1:45 34:56",
              transpose: 0,
              step: 1,
              qwerty_midi: "zz.qqq.sdsasafs.qq.zz",
            },
            position: {
              x: nodeElements[0].position.x + _.random(50, 170),
              y: nodeElements[0].position.y + _.random(50, 170),
            },
          };
          dispatch(addNodeAction(newNode));
          break;
        }
        case "plugin": {
          const newNode = {
            id: id,
            type: type,
            data: {
              label: type,
              guid: "",
              plugin: "",
            },
            position: {
              x: nodeElements[0].position.x + _.random(50, 170),
              y: nodeElements[0].position.y + _.random(50, 170),
            },
          };
          dispatch(addNodeAction(newNode));
          break;
        }
        case "patch": {
          const newNode = {
            id: id,
            type: type,
            data: {
              label: type,
              guid: "",
            },
            position: {
              x: nodeElements[0].position.x + _.random(50, 170),
              y: nodeElements[0].position.y + _.random(50, 170),
            },
          };
          dispatch(addNodeAction(newNode));
          break;
        }

        default:
          return {};
      }
      // dispatch to redux
    },
    [dispatch]
  );

  return (
    <ResizePanel
      direction="e"
      style={{ width: "15%" }}
      handleClass="customHandle"
    >
      <div ref={leftColRef} className="left-column-wrapper">
        <div className="ButtonSectionAssets">
          {BUTTONS.filter(
            (button, id) =>
              button.desc === "asset_ops" && id < BUTTONS.length - 1
          ).map((button, id) => (
            <Button
              key={`key-${id}`}
              btnStyleClass={`asset_btn_ops`}
              handleBtnClick={(evt) => addNode(evt, button.type)}
              BtnInnerValue={<img alt="" src={button.icon} />}
            />
          ))}
          <ToggleButton className="asset_btn_ops" />
        </div>
        <div className="ButtonSectionAssets">
          {BUTTONS.filter((button, id) => button.desc === "asset").map(
            (button, id) => (
              <Button
                key={`key-${id}`}
                btnStyleClass={`asset_btn btn_${button.type.toLowerCase()}`}
                handleBtnClick={(evt) => addNode(evt, button.type)}
                BtnInnerValue={<img alt="" src={button.icon} />}
              />
            )
          )}
        </div>
        {/* <ButtonSection
          handleInputChange={handleInputChange}
          handleSendRequest={handleSendRequest}
          handleRequestChange={handleRequestChange}
        /> */}

        {/* <SortableData
          treeData={treeData}
          setTreeData={setTreeData}
          handleInputChange={handleInputChange}
          handleSendRequest={handleSendRequest}
          handleRequestChange={handleRequestChange}
        /> */}

        <RecentAssets />
      </div>
    </ResizePanel>
  );
};

export default FirstAssetsColumn;
