import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ResizePanel from "react-resize-panel";
import * as Actions from "../../redux/dashboard/action";
import Ace from "../AceEditor";

const Editor = (props) => {
  const dispatch = useDispatch();
  const {
    changeNewAddState_Action,
    createPattern_Action,
    newRequestBody_Action,
    setSearchPattern_Action,
  } = Actions;

  const { showRequestBar, getLink, handleRequestChange, linkValue } =
    props;
  const {
    token,
    requestBody,
    requestLink,
    responseBody,
    requestStatus,
    requestSpeed,
    responseLength,
    responseNotFound,
    requestStatusBoolean,
    newAddValue,
    darkMode,
  } = useSelector((state) => state.dashboard);

  return (
    <div style={{ flexGrow: "1", maxHeight: "300px", height: "300px" }}>
      <div className="twox">
        <div className="outter-editors">
          <ResizePanel
            direction="e"
            style={{ width: "100%" }}
            handleClass="customHandle"
            onClick={(e) => {}}
          >
            <div className="second-coloumn">
              <div className="header-left">
                {showRequestBar ? (
                  <>
                    <input
                      className="header-left-input"
                      onChange={(e) => getLink(e)}
                      type="text"
                      placeholder="https://api.myproduct.com/v1/users"
                      value={linkValue ? linkValue : requestLink}
                    />
                    <button
                      onClick={() => {
                        /*                         if (request.type === "") {
                          onClick(requestBody, requestLink);
                        } else {
                          dispatch(
                            requestFactoryAudioAction(requestBody, requestLink)
                          );
                        } */

                        if (newAddValue === "new asset") {
                          dispatch(changeNewAddState_Action(true));
                        }
                        if (newAddValue === "new pattern") {
                          dispatch(
                            createPattern_Action(JSON.parse(requestBody), token)
                          );
                          dispatch(newRequestBody_Action(""));
                          setTimeout(() => {
                            dispatch(setSearchPattern_Action("/owned"));
                          }, 300);
                        }
                      }}
                      className="request-btn"
                    >
                      Send
                    </button>
                  </>
                ) : null}
              </div>
              <div className="inner-editors">
                <div className="aceEditors">
                  <Ace
                    mode={"yaml"}
                    value={requestBody}
                    theme={darkMode ? "merbivore" : "Xcode"}
                    onChange={(value) => handleRequestChange("editor", value)}
                    requestLink={requestLink}
                  />
                </div>
              </div>
            </div>
          </ResizePanel>
          <div className="inner-editors">
            <div className="Panel-above-editors">
              <div className="panel-inner">
                <>
                  <div className="d-flex ">
                    <div className="">
                      {requestStatusBoolean ? (
                        <div className="">
                          <button className="status-btn">
                            {requestStatus === ""
                              ? "Status"
                              : requestStatus === 200
                              ? "200 OK"
                              : requestStatus}
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <div className="">
                      {responseNotFound ? (
                        <div className="">
                          <button className="not-found-btn">
                            {responseNotFound ? "404 Not Found" : ""}
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <div className="">
                      {requestStatusBoolean || responseNotFound ? (
                        <div className="">
                          <button className="speed-btn">
                            {requestSpeed === "" ? "0ms" : requestSpeed}
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <div className="">
                      {requestStatusBoolean || responseNotFound ? (
                        <div className="">
                          <button className="length-btn">
                            {responseLength === "" ? "0 B" : responseLength}
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </>
              </div>
            </div>
            <div>
              <div className="aceEditors">
                <Ace
                  wrapEnabled={true}
                  readOnly={true}
                  value={responseBody}
                  mode={"javascript"}
                  theme={darkMode ? "merbivore" : "Xcode"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
