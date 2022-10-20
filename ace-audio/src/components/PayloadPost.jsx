import React from "react";
import { Button } from "@mui/material";
import Editor from "./Editor";

const PayloadPost = (props) => {
  return (
    <div
      style={{
        marginBottom: "30px",
      }}
    >
      <Editor
        onChangeHandler={props.onChange}
        payloadPost={props.payloadPost}
      />
      <div>
        <Button
          style={{
            background: "#057EFC",
            color: "#fff",
            marginTop: "30px",
          }}
          onClick={props.onSubmitHandler}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default PayloadPost;
