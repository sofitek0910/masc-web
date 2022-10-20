import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../redux/dashboard/action";
import Asset from "../TabsCategory/Asset";
import Pattern from "../TabsCategory/Pattern";
import Sequence from "../TabsCategory/Sequence";
import Transition from "../TabsCategory/Transition";
import { useHistory } from "react-router-dom";

const Index = ({ Stop }) => {
  const Dispatch = useDispatch();
  const {
    changeRequestLink_Action,
    changeRequestBody_Action,
    updateTreeID_Action,
    sendRequest_Action,
    sendPutRequest_Action,
    changeRequestBodyStatic_Action,
  } = Actions;

  let history = useHistory();
  const { treeData, current_tab, newAddValue, guidSequenceRoute } = useSelector(
    (state) => state.dashboard
  );

  const handleRequestChange = (type, newValue) => {
    if (type === "button") {
      Dispatch(changeRequestBody_Action(newValue));
    }
    if (type === "editor") {
      Dispatch(changeRequestBody_Action(newValue));
      Dispatch(updateTreeID_Action());
    }
  };

  const handleInputChange = ({ target }) => {
    Dispatch(changeRequestLink_Action(target.value));
  };

  const handleSendRequest = (body, link) => {
    Dispatch(sendRequest_Action({ body, link }));
  };

  const handleSendPutRequest = (body, link) => {
    Dispatch(sendPutRequest_Action({ body, link }));
  };
  useEffect(() => {
    /*     if (treeData.length === 0) {
      Dispatch(changeRequestLink_Action(""));
      Dispatch(changeRequestBody_Action(""));
      Dispatch(changeRequestBodyStatic_Action(""));
    } */
  }, [treeData]);

  return (
    <div>
      {current_tab === "asset" ? (
        <Asset
          handleRequestChange={handleRequestChange}
          handleInputChange={handleInputChange}
          handleSendRequest={handleSendRequest}
        />
      ) : null}
      {current_tab === "pattern" ? <Pattern /> : null}
      {current_tab === "transition" ? <Transition /> : null}
      {current_tab === "sequence" ? (
        <Sequence
          handleSendPutRequest={handleSendPutRequest}
          handleRequestChange={handleRequestChange}
          handleInputChange={handleInputChange}
          handleSendRequest={handleSendRequest}
          Stop={Stop}
        />
      ) : null}
    </div>
  );
};

export default Index;
