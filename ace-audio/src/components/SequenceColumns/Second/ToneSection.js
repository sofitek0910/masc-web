import { useEffect, useState } from "react";
import * as Tone from "tone";
import Two from "two.js";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../redux/dashboard/action";
import {
  onPlayButtonClickHandler,
  toneSetUp,
  setUpTriangleRendering, 
  emitter,
  constants,
  onEmittRotationHandler,
  onStopButtonClickHandler,
} from "../../../utilities/hooks/tone";

const ToneSection = () => {
  const Dispatch = useDispatch();
  const { changeToneJS_Action } = Actions;
  const { tuneJs } = useSelector((state) => state.dashboard);

  useEffect(() => {
    toneSetUp();

    /* const PlayBtn = document.querySelector(constants.playButtonQuery);
    const StopBtn = document.querySelector(constants.stopButtonQuery);
 */
    Tone.loaded().then(() => {
      Dispatch(changeToneJS_Action(false));

      const [triangleFrame, triangleGroup] = setUpTriangleRendering();

      emitter.on(constants.rotateTriangleEvent, () =>
        onEmittRotationHandler(triangleFrame, triangleGroup)
      );

      /*       document
        .querySelector(constants.playButtonQuery)
        .addEventListener("click", onPlayButtonClickHandler);
      document
        .querySelector(constants.stopButtonQuery)
        .addEventListener("click", onStopButtonClickHandler); */
    });

    /*     return () => {
      if (PlayBtn) {
        PlayBtn.removeEventListener("click", onPlayButtonClickHandler);
      }

      if (StopBtn) {
        StopBtn.removeEventListener("click", onStopButtonClickHandler);
      }
    }; */
  }, [changeToneJS_Action]);

  return (
    <div className="sequence_tone_card">
      {tuneJs ? (
        <div>Loading...</div>
      ) : (
        <div>
          <button className="play-button" onClick={onPlayButtonClickHandler}>
            Play
          </button>
          <button className="stop-button" onClick={onStopButtonClickHandler}>
            Stop
          </button>
          <div className="triangle-container"></div>
        </div>
      )}
    </div>
  );
};

export default ToneSection;
