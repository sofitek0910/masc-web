import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../redux/dashboard/action";

const PatternList = () => {
  const Dispatch = useDispatch();
  const { assetList_Action } = Actions;
  const { ASSETList, guidPatternRoute } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    Dispatch(assetList_Action(guidPatternRoute));
  }, [guidPatternRoute]);

  return (
    <div
      className="mb-3"
      style={{
        overflowY: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <span>NEW ASSETS LIST</span>
      <ul>
        {ASSETList &&
          ASSETList.map((value) => {
            return (
              <li>
                <span>
                  <strong>{value.pattern.guid}</strong>
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default PatternList;
