import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import Logo from "../../../assets/img/logo-rec-500px.png";
import { LIBRARIES_PAGE_NAVBAR_ITEMS } from "../../../constants/common";
import "../../../styles/library.css";

const Header = () => {
  const [activeKey, setActiveKey] = useState("/asset");
  const history = useHistory();
  const onChangeNav = (evt, key) => {
    evt.preventDefault();
    setActiveKey(key);
    history.push(key);
  };
  return (
    <Container fluid style={{ paddingLeft: "0", paddingRight: "0" }}>
      <Navbar bg="white" className="clearfix" style={{ padding: "1rem" }}>
        <Navbar.Brand style={{ flexGrow: "1" }}>
          <img alt="" src={Logo} width="100" height="38" />
        </Navbar.Brand>
        <Nav justify={true} activeKey={activeKey}>
          {LIBRARIES_PAGE_NAVBAR_ITEMS.map((nav, key) => (
            <Nav.Item
              key={`navbar-${key}`}
              className="d-flex flex-1 flex-row align-items-center"
            >
              <nav.icon size={16} />
              <Nav.Link
                href={nav.key}
                onClick={(evt) => onChangeNav(evt, nav.key)}
              >
                {nav.val}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Navbar>
    </Container>
  );
};

const Body = (props) => {
  return (
    <Container fluid className="library_body_container">
      <div className="library_body_card border">{props.children}</div>
    </Container>
  );
};

export { Header, Body };
