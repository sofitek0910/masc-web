import React, { useState, useEffect } from "react";
import YAML from "json-to-pretty-yaml";
import axios from "axios";
import { Button, Stack, Typography, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { updateFactoryPatch } from "../models/PatchModel";
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
const UpdatePatch = ({ props }) => {
  const { guid } = useParams();
  const [patch, setPatch] = useState({});
  const [payloadPost, setPayloadPost] = useState();
  const [modalStatus, setModalStatus] = useState({
    send: false,
    recieve: false,
    confirm: false,
  });
  const [selectedTab, setSelectedTab] = useState("two");
  const [result, setResult] = useState();
  const classes = useStyles();
  const accessToken = localStorage.getItem("token");

  
  useEffect(() => {
    try {
      const headerObj = { Authorization: `Bearer ${accessToken}` };
      const url = `${process.env.REACT_APP_URL}/patch/${guid}`;
      //const second_url ="https://masc-api.musicascode.com/mc/patch/5028367478CC49C88C9EF2293E36CA30/details";
      axios.get(url, { headers: headerObj }).then((res) => {
        setPatch(res.data.factoryyaml);
      });
    } catch (error) {
      console.log(error);
    }
  }, [guid, accessToken]);

  useEffect(() => {
    if (patch) {
      const data = YAML.stringify(patch);
      setPayloadPost(data);
    }
  }, [patch]);
  const handleSubmit = async () => {
    setModalStatus({ ...modalStatus, send: true });
    try {
      const data = await updateFactoryPatch(accessToken, payloadPost);
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
          Update
        </Button>
      </Stack>
    </Stack>
  );
};

export default UpdatePatch;
