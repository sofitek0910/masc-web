import React from "react";

const ModelStatus = ({ modalStatus }) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            height: "38px",
            width: "38px",
            fontSize: "13px",
            padding: "auto auto",
            border: "2px solid #b48484",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "auto",
            background: modalStatus?.send ? "#e1d5e7" : "#d5e8d4",
          }}
        >
          {modalStatus?.send ? "OK" : "Fail"}
        </div>
        <div
          style={{
            height: "38px",
            width: "38px",
            fontSize: "13px",
            padding: "auto auto",
            border: "2px solid #b48484",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "auto",
            background: modalStatus?.recieve ? "#e1d5e7" : "#d5e8d4",
          }}
        >
          {modalStatus?.recieve ? "OK" : "Fail"}
        </div>
        <div
          style={{
            height: "38px",
            width: "38px",
            fontSize: "13px",
            padding: "auto auto",
            border: "2px solid #b48484",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "auto",
            background: modalStatus?.confirm ? "#e1d5e7" : "#d5e8d4",
          }}
        >
          {modalStatus?.confirm ? "OK" : "Fail"}
        </div>
      </div>
    </>
  );
};

export default ModelStatus;
