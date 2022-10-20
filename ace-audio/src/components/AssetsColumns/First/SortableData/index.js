import React, { useState } from "react";
import SortableTree from "react-sortable-tree";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../redux/dashboard/action";
import { findMousePositionRelativeToElement } from "../../../../utilities/hooks/common";
import RightMenuPoUp from "../../../../modules/RightMenuPopUp";
import DetectOnclickOutside from "../../../../utilities/hooks/DetectOnclickOutside";

const Tree = ({
  setTreeData,
  handleInputChange,
  handleSendRequest,
  handleRequestChange,
}) => {
  const Dispatch = useDispatch();
  const {
    saveTreeID_Action,
    addTreeElementTitle_Action,
    changeTreeElementTitle_Action,
  } = Actions;

  const { treeData, currentTreeId, currentTreeElementTitle } = useSelector(
    (state) => state.dashboard
  );

  const [contextMenu, setContextMenu] = useState(false);
  const [editTreeNode, setEditTreeNode] = useState(false);

  const handleRightClick = (e) => {
    setContextMenu(true);
    const miniPopup = document.getElementsByClassName("miniPopup")[0];
    const positionOfElement = findMousePositionRelativeToElement(e);
    miniPopup.style.top = `${positionOfElement.yClick-160}px`;
  };
  const handleInitalValue = (value) => {
    if (value.node.title === "MIDI") {
      handleRequestChange("button", value.node.body);
      handleSendRequest(value.node.body, value.node.linkURL);
    }
    if (value.node.title === "AUDIO") {
      handleRequestChange("button", value.node.body);
      handleSendRequest(value.node.body, value.node.linkURL);
    }
    if (value.node.title === "LFO") {
      handleRequestChange("button", value.node.body);
      handleSendRequest(value.node.body, value.node.linkURL);
    }
  };

  const findAncestor = (el, cls) => {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  };

  const handleClickCell = (e) => {
    let rstNode = findAncestor(e.target, "rst__node");
    const tableCellText = document.getElementsByClassName("rst__node");
    [].forEach.call(tableCellText, function (el) {
      if (el.classList.contains("rst__node-active")) {
        el.classList.remove("rst__node-active");
      }
    });
    rstNode.classList.add("rst__node-active");
  };

  const renderButton = () => {
    return (
      <DetectOnclickOutside open={editTreeNode} setOpen={setEditTreeNode}>
        <input
          value={currentTreeElementTitle}
          onChange={(e) => {
            Dispatch(changeTreeElementTitle_Action(e.target.value));
          }}
          className="treeTitleInput"
        />
      </DetectOnclickOutside>
    );
  };

  return (
    <>
      <div className="assetObjects my-3">
        <span className="assets_title">LIST OF ASSET OBJECTS</span>

        <div className="SortableTree">
          <SortableTree
            isVirtualized={false}
            treeData={treeData}
            onChange={(treeData) => setTreeData(treeData)}
            generateNodeProps={(extendedNode) => ({
              title:
                editTreeNode && extendedNode.node.id === currentTreeId
                  ? renderButton(extendedNode)
                  : null,
              onContextMenu: (e) => {
                e.preventDefault();
                handleRightClick(e);
                Dispatch(saveTreeID_Action(extendedNode.node.id));
              },
              onClick: (e) => {
                Dispatch(saveTreeID_Action(extendedNode.node.id));
                handleInputChange({
                  target: { value: extendedNode.node.linkURL },
                });
                handleInitalValue(extendedNode);
                handleClickCell(e);
              },
              onDoubleClick: (e) => {
                setEditTreeNode(true);
                Dispatch(addTreeElementTitle_Action(extendedNode.node.title));
              },
            })}
          ></SortableTree>
          <RightMenuPoUp
            contextMenu={contextMenu}
            setContextMenu={setContextMenu}
          />
        </div>
      </div>
    </>
  );
};

export default Tree;
