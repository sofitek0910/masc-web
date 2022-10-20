import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../../redux/dashboard/action";

const McMidiBits = ({
  count,
  bitMode,
  setValueState,
  valueState,
  value,
  readonly,
}) => {
  const Dispatch = useDispatch();
  const { change_selectedbit_Action } = Actions;
  const { selectedBit } = useSelector((state) => state.dashboard);

  const updateValue = async (e) => {
    let str = valueState;
    let n =
      e.target.getAttribute("data-dot") -
      1 +
      (e.target.getAttribute("data-block") - 1) * (bitMode * 2);
    Dispatch(
      change_selectedbit_Action(parseInt(e.target.getAttribute("data-ref")))
    );
    if (str[n] === "0") {
      setValueState(str.substr(0, n) + '1' + str.substr(n + 1));
      e.target.classList.add("set");
      e.target.classList.remove("unset");
    } else {
      setValueState(str.substr(0, n) + '0' + str.substr(n + 1));
      e.target.classList.add("unset");
      e.target.classList.remove("set");
    }
    let btns = document.querySelectorAll(".bit");
    btns.forEach((el) => el.classList.remove("selected"));
    await e.target.classList.add("selected");
  };
  let arr = [];
  for (let i in value) {
    let obj = {};
    obj.id = parseInt(i) + 1;
    obj.val = value[i];
    obj.ref = (count - 1) * (bitMode * 2) + (parseInt(i) + 1);
    if ((count - 1) * (bitMode * 2) + (parseInt(i) + 1) === selectedBit) {
      obj.sel = true;
    } else {
      obj.sel = false;
    }
    arr[i] = obj;
  }
  let bitModeClass = "";
  if (bitMode === 3) {
    bitModeClass = "threeDots";
  }
  return (
    <div className="midibits">
      <div className={`bitContainer ${bitModeClass}`}>
        <div className={readonly ? "disable show" : "disable hide"}></div>
        {arr.map((el) => {
          return el.sel ? (
            <div
              onClick={updateValue}
              data-block={count}
              data-dot={el.id}
              className={
                el.val === "1" ? `set bit selected` : `unset bit selected`
              }
              key={el.id}
              data-ref={el.ref}
            ></div>
          ) : (
            <div
              onClick={updateValue}
              data-block={count}
              className={el.val === "1" ? `set bit` : `unset bit`}
              data-dot={el.id}
              key={el.id}
              data-ref={el.ref}
            ></div>
          );
        })}
      </div>
      <div className="value">{value}</div>
    </div>
  );
};

export default McMidiBits;
