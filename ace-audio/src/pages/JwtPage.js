import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/jwtpage.css";
import { Row, Col, Button } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import NewHeader from "../modules/NewHeader";

const Index = () => {
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedDecodedToken, setDecodedToken] = useState(false);
  const { token, myDecodedToken } = useSelector((state) => state.dashboard);

  return (
    <div>
      <NewHeader />
      <Row className="justify-content-center align-items-center text-center my-3">
        <Col lg={6}>
          <h5>Encoded</h5>
          <Button variant={copiedToken ? "success" : "light"}>
            <CopyToClipboard
              text={token}
              onCopy={() => {
                setDecodedToken(false);
                setCopiedToken(true);
              }}
            >
              <span>Copy Encoded to clipboard</span>
            </CopyToClipboard>
          </Button>
          <textarea id="jwt_textarea" className="jwt_encoded" value={token}></textarea>
        </Col>
        <Col lg={6}>
          <h5>Decoded</h5>
          <Button variant={copiedDecodedToken ? "success" : "light"}>
            <CopyToClipboard
              text={`${JSON.stringify(myDecodedToken, null, "\t")}`}
              onCopy={() => {
                setCopiedToken(false);
                setDecodedToken(true);
              }}
            >
              <span>Copy Decoded to clipboard</span>
            </CopyToClipboard>
          </Button>
          <textarea
            id="jwt_textarea"
            className="jwt_decoded"
            value={`${JSON.stringify(myDecodedToken, null, "\t")}`}
          ></textarea>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
