import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function index({ imgPath }) {
  return (
    <Container>
      <Row className="row-container justify-content-md-center justify-content-lg-center justify-content-sm-center align-items-center">
        <Col>
          <div className="loader-image">
            <img src={imgPath} alt="Mountains" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
