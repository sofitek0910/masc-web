import React from "react";
import { useDispatch } from "react-redux";
import * as Actions from "../../redux/dashboard/action";
import DetectOnclickOutside from "../../utilities/hooks/DetectOnclickOutside";

const Index = ({ contextMenu, setContextMenu }) => {
  const Dispatch = useDispatch();
  const { deleteTreeElement_Action, duplicateTreeElement_Action } = Actions;

  return (
    <DetectOnclickOutside open={contextMenu} setOpen={setContextMenu}>
      <div
        className="miniPopup"
        style={{ display: contextMenu ? "block" : "none" }}
      >
        <div
          className="item left"
          onClick={() => {
            Dispatch(duplicateTreeElement_Action());
            setContextMenu(false);
          }}
        >
          <p>Duplicate</p>
        </div>
        <div className="item left" onClick={() => setContextMenu(false)}>
          <p>Generate Code</p>
        </div>
        <div className="item left" onClick={() => setContextMenu(false)}>
          <p>Pin</p>
        </div>
        <div className="item left" onClick={() => setContextMenu(false)}>
          <p>Copy as Curl</p>
        </div>
        <div
          className="item left"
          onClick={() => {
            Dispatch(deleteTreeElement_Action());
            setContextMenu(false);
          }}
        >
          <p>Delete</p>
        </div>
        <div className="b-example-divider"></div>
        <div className="item left" onClick={() => setContextMenu(false)}>
          <p>Settings</p>
        </div>
      </div>
    </DetectOnclickOutside>
  );
};
export default Index;
