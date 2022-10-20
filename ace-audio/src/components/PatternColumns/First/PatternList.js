import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../redux/dashboard/action";

const PatternList = () => {
  const Dispatch = useDispatch();
  const {
    patternList_Action,
    change_current_assets_Action,
    change_current_id_Action,
  } = Actions;
  const { patternList, guidPatternRoute } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    Dispatch(patternList_Action(guidPatternRoute));
    Dispatch(change_current_assets_Action(0, guidPatternRoute));
    Dispatch(change_current_id_Action(0, guidPatternRoute));
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
      <span>NEW CREATED PATTERN</span>
      <ul>
        {patternList &&
          patternList.map((value) => {
            return (
              <li>
                <span>
                  <strong>{value.guid}</strong>
                </span>
                <p>{value.name}</p>
                <span>{value.o_username}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default PatternList;
