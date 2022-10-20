import React, { useState } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { LIBRARIES_EDITOR_TABS } from "../../../constants/common";
import Editor from "../../AceEditor";
import Piano, { PianoKey } from "../Piano";

const MidiPlayerPage = (props) => {
  const [tabKey, setTabKey] = useState("json");
  const [activeEditor, setActiveEditor] = useState(0);
  const [editorValue, setEditorValue] = useState([
    "content 1 ",
    "content 2",
    "content 3",
  ]);

  const onTabChange = (key, evt) => {
    setTabKey(key);
    setActiveEditor(evt.target.id);
  };

  // const onChangeEditorValue = (val) => {};

  return (
    <React.Fragment>
      <Row>
        <Col className="bg-default col-1" style={{ margin: "3% 20% 3% 3%" }}>
          <div
            className="interactive-piano__piano-container"
            onMouseDown={(event) => event.preventDefault()}
          >
            <Piano startNote={"C4"} endNote={"B5"} renderPianoKey={PianoKey} />
          </div>
        </Col>
        <Col className="col-8">Details</Col>
      </Row>
      <Row>
        <Col className="bg-default">
          <Nav defaultActiveKey={tabKey} onSelect={onTabChange}>
            {LIBRARIES_EDITOR_TABS.map((item, key) => (
              <Nav.Item key={`editor-key-${key}`}>
                <Nav.Link id={key} eventKey={item.key}>
                  {item.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Editor
            mode={tabKey}
            value={editorValue[activeEditor]}
            onChange={() => {}}
            readOnly={true}
            requestLink=""
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MidiPlayerPage;
