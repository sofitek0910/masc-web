import AssetPlayer from "components/AssetPlayer";
import React from "react";
import { Col, Row } from "react-bootstrap";
import NewHeader from "../modules/NewHeader";

const Index = () => {
  return (
    <div>
      <NewHeader />
      <Row className="m-5">
        <Col lg={12}>
          <AssetPlayer />
        </Col>
      </Row>
    </div>
  );
};
export default Index;
