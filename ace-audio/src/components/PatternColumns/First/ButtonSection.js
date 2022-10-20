import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../redux/dashboard/action";
import Button from "../../../theme/Components/Button";
import CreateAssetPopUp from "./CreateAssetPopUp";

const Index = ({ addTrack }) => {
  const Dispatch = useDispatch();
  const {
    newRequestBody_Action,
    changeNewAddValue_Action,
    changeNewAddState_Action,
  } = Actions;
  const {
    newAddState,
    newPattern,
  } = useSelector((state) => state.dashboard);

  let samplePttern = newPattern;

  const isEmptyObject = (obj) => {
    var name;
    for (name in obj) {
      if (obj.hasOwnProperty(name)) {
        return false;
      }
    }
    return true;
  };
  const handleRequestData = () => {
    let sample = samplePttern.tracks[samplePttern.tracks.length - 1];
    let last_element = null;
    if (isEmptyObject(sample)) {
      last_element = {
        a_guid: "52CA59A79DAD42549710599E45B77E2A",
        volume: -15,
        mute: false,
        pan: 64,
        s_category: "BASS",
        order: `1`,
      };
    }
    if (!isEmptyObject(sample)) {
      last_element = {
        ...sample,
        order: `${samplePttern.tracks.length + 1}`,
      };
    }
    samplePttern.tracks.push(last_element);
    Dispatch(newRequestBody_Action(JSON.stringify(samplePttern, null, 4)));
  };

  return (
    <div className="ButtonSection mt-3">
      <Button
        className={`addGuidModal`}
        btnStyleClass={`sequence_btn`}
        handleBtnClick={() => {
          Dispatch(changeNewAddValue_Action("new pattern"));
          Dispatch(newRequestBody_Action(JSON.stringify(newPattern, null, 4)));
        }}
        BtnInnerValue={<img src="/static/plus.svg" alt="btninner" />}
      />
      <Button
        btnStyleClass={`sequence_btn`}
        handleBtnClick={() => {}}
        BtnInnerValue={<img src="/static/copy.svg" alt="btninner" />}
      />
      <Button
        btnStyleClass={`sequence_btn`}
        handleBtnClick={() => {
          addTrack();
          Dispatch(changeNewAddValue_Action("new pattern"));
          handleRequestData();
        }}
        BtnInnerValue={<AddCircleOutlineRoundedIcon style={{ fontSize: 46 }} />}
      />
      <Button
        btnStyleClass={`sequence_btn`}
        handleBtnClick={() => {
          /*  Dispatch(changeNewAddValue_Action("new asset"));
          Dispatch(newRequestBody_Action(JSON.stringify(newAsset, null, 4))); */
        }}
        BtnInnerValue={""}
      />

      {/*       <CreatePatternPopUp
        show={newPatternState}
        handleClose={() => {
          Dispatch(changeNewPatternState_Action(false));
        }}
      /> */}
      <CreateAssetPopUp
        show={newAddState}
        handleClose={() => {
          Dispatch(changeNewAddState_Action(false));
        }}
      />
    </div>
  );
};

export default Index;
