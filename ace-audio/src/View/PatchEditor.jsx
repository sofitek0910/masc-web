import React, { useState } from "react";
import { Button, Stack, Typography, Tabs, Tab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {postFactoryPatch} from "../models/PatchModel";
import NewHeader from "../modules/NewHeader";
import ModelStatus from "../components/ModalStatus";
import Editor from "../components/Editor";

const useStyles = makeStyles({
  tabs: {
    "& .MuiTab-root": {
      color: "black",
      border: "2px solid black",
      fontSize: "15px",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "black",
      height: 2,
    },
    "& .MuiTab-root.Mui-selected": {
      color: "black",
      backgroundColor: "#e6d0de",
      border: "2px solid black",
      fontSize: "15px",
    },
  },
});
const Patch = ({ props }) => {
  const [payloadPost, setPayloadPost] = useState("");
  const [modalStatus, setModalStatus] = useState({
    send: false,
    recieve: false,
    confirm: false,
  });
  const [selectedTab, setSelectedTab] = useState("two");
  const [result, setResult] = useState();
  const classes = useStyles();

  const handleSubmit = async () => {
    setModalStatus({ ...modalStatus, send: true });
    const accessToken = localStorage.getItem("token");
    try {
      
      const data = await postFactoryPatch(accessToken, payloadPost);
      if (data.guid) {
        setModalStatus({
          ...modalStatus,
          send: true,
          recieve: true,
          confirm: true,
        });
      }
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack direction="column" spacing={2} style={{ marginTop: "30px" }}>
      <NewHeader />
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        style={{ width: "40%", marginBottom: "2%", margin: "5px 2.5%" }}
      >
        <Typography>Editor: Patch</Typography>
        <div
          style={{
            width: "100%",
          }}
        >
          <Editor onChangeHandler={setPayloadPost} payloadPost={payloadPost} />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={(e, value) => setSelectedTab(value)}
            className={classes.tabs}
            textColor="secondary"
            indicatorColor="none"
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="DESIGN" />
            <Tab value="two" label="SRC" />
            <Tab value="three" label="RESPONSE" />
          </Tabs>
          <ModelStatus modalStatus={modalStatus} />
        </div>
        <Button
          style={{
            background: "#057EFC",
            color: "#fff",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default Patch;
