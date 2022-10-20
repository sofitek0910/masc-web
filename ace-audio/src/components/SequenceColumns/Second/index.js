import React, {useEffect, useState} from "react";
import ResizePanel from "react-resize-panel";
import ToneSection from "./ToneSection";
import Editor from "../../Editor/Editor";
import Pattern from "../../../theme/Components/twoJsComponent/Pattern";
import {useDispatch, useSelector} from "react-redux";
import Api from "../../../../src/settings"
import {changeRequestLink_Action, clearEditorResponseAction} from "../../../redux/dashboard/action";
import * as Actions from "../../../redux/dashboard/action";
import {useHistory} from "react-router-dom";


const Index = ({
                 handleRequestChange,
                 handleInputChange,
                 handleSendRequest,
                 handleSendPutRequest,
                 setErrorText,
                 errorText,
                 tonDataArraySettings,
                 Stop,
                 handleSequenceListChange,
               }) => {
  const Dispatch = useDispatch();
  const {
    changeSequenceGuid_Action
  } = Actions;
  const history = useHistory()
  const {responseBody, guidSequenceRoute, requestBody} = useSelector((state) => state.dashboard);
  const [sequenceResBody, setSequenceResBody] = useState("");

  const p = responseBody === "" ? "" : JSON.parse(responseBody).sequence.guid

  useEffect(() => {


    if (sequenceResBody === "") {
      Dispatch(changeSequenceGuid_Action("NEW"))
      history.push(`/sequence/NEW/editor`)
    } else {
      Dispatch(changeSequenceGuid_Action(sequenceResBody))
      history.push(`/sequence/${guidSequenceRoute}/editor`)
      handleSequenceListChange(p)
    }
  }, [p, Dispatch, guidSequenceRoute, sequenceResBody])

  useEffect(() => {

    setSequenceResBody(p)
  }, [responseBody, p])

  useEffect(() => {
    /* if (requestBody !==""){
       Dispatch(changeSequenceGuid_Action("NEW"))
       setSequenceResBody("")
       history.push(`/sequence/NEW/editor`)
     }else{*/
    Dispatch(changeSequenceGuid_Action("NEW"))
    Dispatch(clearEditorResponseAction(""))
    history.push(`/sequence/NEW/editor`)
    /* }*/
  }, [requestBody])

  const changeLink = (p) => {
    if (p === "") {
      return (`${Api.baseApiUrl}${Api.apiPrefix}sequence/`)
    } else {
      return (`${Api.baseApiUrl}${Api.apiPrefix}sequence/${p}`)
    }
  }

  const changeRequest = (body, link) => {
    if (p === "") {
      handleSendPutRequest(body, link)
    } else {
      handleSendRequest(body, link)
    }
  }

  return (
    <div className="editors-section">
      <div className="flexbox">
        <div className="one">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            id="aboveditor"
          >
            <ResizePanel
              direction="s"
              handleClass="customHandle"
              style={{height: "300px"}}
            >
              <div className="" style={{width: "100%", height: "100%"}}>
                <Pattern
                  tonDataArraySettings={tonDataArraySettings}
                  setErrorText={setErrorText}
                  errorText={errorText}
                  Stop={Stop}
                />
              </div>
            </ResizePanel>
          </div>
          <Editor
            linkValue={changeLink(p)}//
            getLink={handleInputChange}
            onClick={changeRequest}//
            showRequestBar={true}
            handleRequestChange={handleRequestChange}
          />
          add
        </div>
      </div>
    </div>
  );
};

export default Index;
