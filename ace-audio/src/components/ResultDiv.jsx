import React from "react";
import { Typography, Stack } from "@mui/material";
import { JSONViewer } from "react-json-editor-viewer";

const ResultDiv = ({ text }) => {
  const styles = {
    jsonViewer: {
      borderLeft: "1px dashed white",
      lineHeight: 1.25,
      width: "50%",
      borderLeft: "1px solid lightgrey",
      margin: 10,
    },
    jsonEditor: {
      width: "50%",
      fontSize: 12,
      fontFamily: "Lucida Console, monospace",
      lineHeight: 1.25,
    },
    root: {
      fontSize: 12,
      fontFamily: "Lucida Console, monospace",
      lineHeight: 1.25,
      /*color: "#3E3D32"*/
    },
    label: {
      color: "DeepPink",
      marginTop: 3,
    },
    value: {
      marginLeft: 10,
    },
    row: {
      display: "flex",
    },
    withChildrenLabel: {
      color: "DeepPink",
    },
    builtin: {
      color: "green",
      fontSize: 12,
    },
    text: {
      color: "black",
      fontSize: 12,
    },
    number: {
      color: "purple",
      fontSize: 12,
    },
    property: {
      color: "DeepPink",
      fontSize: 12,
    },
    collapseIcon: {
      cursor: "pointer",
      fontSize: 10,
      color: "teal",
    },
  };
  return (
    <>
      <Typography
        style={{
          width: "100%",
          marginTop: "30px",
          fontSize: "25px",
        }}
      >
        The output
      </Typography>
      <Stack
        style={{
          width: "100%",
          marginTop: "30px",
          marginBottom: "50px",
        }}
      >
        <JSONViewer data={text} collapsible styles={styles} />
      </Stack>
    </>
  );
};

export default ResultDiv;
