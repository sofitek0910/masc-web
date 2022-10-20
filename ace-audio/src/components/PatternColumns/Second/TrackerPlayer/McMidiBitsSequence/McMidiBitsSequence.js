import McMidiBits from "../McMidiBits/McMidiBits";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../../redux/dashboard/action";

const McMidiBitsSequence = ({ bitMode, num }) => {
  const Dispatch = useDispatch();
  const { changeAssetValue_Action } = Actions;
  const { value } = useSelector((state) => state.dashboard);

  const [search, setSearch] = useState(false);
  if (bitMode == undefined) {
    bitMode = 4;
  }
  const [mode, setMode] = useState(bitMode);
  let i = 0;
  let j = 0;
  const [objects, setObjects] = useState([]);
  useEffect(() => {
    let str = value;
    // if (focus === false) {
    //   document.querySelectorAll(".text-input")[num].value = format(str);
    // }
    if (str.length % (mode * 2) > 0 || str.length === 0) {
      do {
        str += "0";
      } while (str.length % (mode * 2) > 0);
    }
    Dispatch(changeAssetValue_Action(str));
    let nbrOfBits = 0;
    if (mode === 4) {
      nbrOfBits = 8;
    } else {
      nbrOfBits = 6;
    }
    let arr = [];
    do {
      arr[i] = value.slice(j, j + nbrOfBits);
      j += nbrOfBits;
      i++;
    } while (j < value.length);
    setObjects(arr);
  }, [value, mode]);
  const add = () => {
    if (objects.length < 8) {
      if (mode === 4) {
        Dispatch(changeAssetValue_Action(value + "00000000"));
      } else {
        Dispatch(changeAssetValue_Action(value + "000000"));
      }
    }
  };
  const remove = () => {
    if (objects.length > 1) {
      if (bitMode === 4) {
        Dispatch(changeAssetValue_Action(value.slice(0, value.length - 8)));
      } else {
        Dispatch(changeAssetValue_Action(value.slice(0, value.length - 6)));
      }
    }
  };
  let count = 0;
  const format = (str) => {
    if (mode === 4) {
      let res = [...str]
        .map((d, i) => {
          if (i % 8 == 0) {
            return "   " + d;
          } else if (i % 4 == 0) {
            return "  " + d;
          } else {
            return " " + d;
          }
        })
        .join("")
        .trim();
      return res;
    } else {
      let res = [...str]
        .map((d, i) => {
          if (i % 6 == 0) {
            return "   " + d;
          } else if (i % 3 == 0) {
            return "  " + d;
          } else {
            return " " + d;
          }
        })
        .join("")
        .trim();
      return res;
    }
  };
  const changeValue = (e) => {
    let pos = e.target.selectionStart;
    let val = e.target.value;
    let str = val;
    str = str.replace(/\s/g, "");
    Dispatch(changeAssetValue_Action(str));
    e.target.value = format(str);
    if (pos !== val.length) {
      e.target.selectionEnd = pos;
    }
  };
  const mode4 = (e) => {
    if (mode === 3) {
      setMode(4);
      let str = value;
      for (let i = 0; i < objects.length; i++) {
        str += "00";
      }
      Dispatch(changeAssetValue_Action(str));
    }
  };
  const mode3 = (e) => {
    if (mode === 4) {
      setMode(3);
      Dispatch(
        changeAssetValue_Action(
          value.slice(1, value.length - objects.length * 2)
        )
      );
    }
  };;
  return (
    <div className="sequence">
      <div className="bits-controls">
        BEAT SEARCH <br />
        <div onClick={() => setSearch(!search)} className="beat-search-btn">
          <div className={`search-toggle ${search ? "on" : ""}`}>
            {search ? "ON" : "OFF"}
          </div>
        </div>
        <br />
        BEAT TYPE <br />
        <div className="beat-type">
          <button
            className={`bit-change ${mode === 4 ? "selected" : ""}`}
            onClick={mode4}
          >
            8-beat
          </button>
          <button
            className={`bit-change ${mode === 3 ? "selected" : ""}`}
            onClick={mode3}
          >
            6-beat
          </button>
        </div>
        <button className="find-btn">FIND</button>
      </div>
      <div className="objects">
        {objects.map((el, index) => {
          count++;
          return (
            <McMidiBits
              count={count}
              key={index}
              valueState={value}
              bitMode={mode}
              setValueState={(newValue) => {
                Dispatch(changeAssetValue_Action(newValue));
              }}
              value={el}
              readonly={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default McMidiBitsSequence;
