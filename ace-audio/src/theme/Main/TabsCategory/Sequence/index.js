import React, {useEffect, useState} from "react";
import FirstColumn from "../../../../components/SequenceColumns/First";
import SecondColumn from "../../../../components/SequenceColumns/Second";
import axios from "axios";
import {useSelector} from "react-redux";

const Index = ({
                 handleRequestChange,
                 handleInputChange,
                 handleSendRequest,
                 handleSendPutRequest,
                 Stop,
               }) => {
  const {token}=useSelector((state) => state.dashboard)
  const [guids, setGuids] = useState([]);
  const [tonDataSettings, setTonDataSettings] = useState([]);
  const [tonDataArraySettings, setTonDataArraySettings] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [sequenceListGuid, setSequenceListGuid] = useState([]);

  const handleResponseChange = (newTonDataSettings) => {
    setTonDataArraySettings([...tonDataArraySettings, newTonDataSettings]);
  };

  const handleSequenceListChange = (newListGuid) => {
    if (newListGuid === "") return;
    const instance = axios.create({
      baseURL: 'https://masc-api.musicascode.com',
      timeout: 1000,
      headers: {Authorization: `Bearer ${token}`}
    })
    instance.get( `/mc/sequence/list/${newListGuid}`).then(res =>{
      setSequenceListGuid([...sequenceListGuid, res.data])}
    )
  }

  const handleValueChange = (newGuid) => {
    setGuids([...guids, newGuid]);
  };

  return (
    <div className="editor-container">
      <div
        style={{
          width: "101vw",
          height: "94vh",
          border: "1px solid black",

          display: "flex",
          flexDirection: "row",
          background: "#2c2c2c",
          marginTop: "-1px",
          marginLeft: "-1px",
          overflow: "hidden",
        }}
      >
        <FirstColumn
          sequenceListGuid={sequenceListGuid}
          setSequenceListGuid={setSequenceListGuid}
          handleRequestChange={handleRequestChange}
          handleInputChange={handleInputChange}
          handleSendRequest={handleSendRequest}
          handleValueChange={handleValueChange}
          errorText={errorText}
          setErrorText={setErrorText}
          tonDataSettings={tonDataSettings}
          setTonDataSettings={setTonDataSettings}
          guids={guids}
          setGuids={setGuids}
          tonDataArraySettings={tonDataArraySettings}
          setTonDataArraySettings={setTonDataArraySettings}
          handleResponseChange={handleResponseChange}
        />
        <div style={{flexGrow: "1"}}>
          <div
            style={{
              width: "100%",
              borderWidth: " 1px 0px",
              borderStyle: "solid",
              borderColor: "#484848",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SecondColumn
              handleSequenceListChange={handleSequenceListChange}
              handleSendPutRequest={handleSendPutRequest}
              handleRequestChange={handleRequestChange}
              handleInputChange={handleInputChange}
              handleSendRequest={handleSendRequest}
              handleValueChange={handleValueChange}
              guids={guids}
              setGuids={setGuids}
              errorText={errorText}
              setErrorText={setErrorText}
              tonDataSettings={tonDataSettings}
              tonDataArraySettings={tonDataArraySettings}
              Stop={Stop}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Index;
