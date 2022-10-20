import { useEffect, useState } from "react";
import * as Tone from "tone";
import * as axios from "axios";
import Two from "two.js";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../redux/dashboard/action";
import {
  toneSetUpNew,
  Emitter,
  loopNew,
  onPlayButtonClickHandlerNew,
  onStopButtonClickHandlerNew,
  onEmittRotationHandlerNew,
  setUpTriangleRenderingNew,
  rotateCW90deg,
} from "../../../utilities/hooks/tone";

const ToneSection = () => {
  const Dispatch = useDispatch();
  const { changeToneJS_Action } = Actions;
  const { tuneJs } = useSelector((state) => state.dashboard);
  const [guid, setGuid] = useState("");
  const [blockRadius, setBlockRadius] = useState(5);
  const [assetBlockSize, setAssetBlockSize] = useState(25);
  const [lineSize, setLineSize] = useState(2);
  const [colorPosition, setColorPosition] = useState([
    [1, 1],
    [0.5, 1],
    [0, 0.5],
    [0, 0],
  ]);

  const handleStart = () => {
    Tone.Transport.start();
    Tone.start();
  };
  const handleStop = () => {
    Tone.Transport.stop();
  };
  const getPatternFromGUID = () => {
    axios
      .get(`https://masc-api.musicascode.com/mc/pattern/${value}/assets`)
      .then((res) => {
        Tone.Transport.bpm.value = res.data.pattern.tempo;
        Tone.Transport.loop = true;
        Tone.Transport.loopStart = res.data.pattern.posStart;
        Tone.Transport.loopEnd = res.data.pattern.posEnd;
      });
  };

  useEffect(() => {
    Tone.loaded().then(() => {});
  }, []);

  useEffect(() => {
    toneSetUpNew();
    Tone.loaded().then(() => {
      Dispatch(changeToneJS_Action(false));
      const [triangle, two] = setUpTriangleRenderingNew();

      Emitter.on("trigerEightNote", () =>
        onEmittRotationHandlerNew(triangle, two)
      );
    });
  }, [changeToneJS_Action]);

  return (
    <div className="sequence_tone_card">
      {tuneJs ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <button className="start" onClick={handleStart}>
              play
            </button>
            <button className="stop" onClick={handleStop}>
              stop
            </button>
            <button className="load" onClick={getPatternFromGUID}>
              LOAD
            </button>
            <input
              type="text"
              value={guid}
              onChange={(e) => setGuid(e.target.value)}
            />
          </div>
          <div id="work-space">
            <div id="triangle"></div>
            <div id="pattern-block"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToneSection;
