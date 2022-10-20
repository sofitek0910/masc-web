import React from "react";
import { Switch, Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
// import { Header, Body } from "../components/LibraryRoutes/PageComponents";
import { Header, Body } from "../components/LibraryRoutes/PageComponents";
import MidiPlayerPage from "../components/LibraryRoutes/PlayerPages/midi";
import "../styles/library.css";

/**
 *
 * this page act as router for previewing asset, midi & pattern
 */

const LibraryRouter = () => {
  return (
    <>
      <Header />
      <Body>
        <Switch>
          <Route
            path="/asset"
            render={(routeProps) => <AssetPageRouter {...routeProps} />}
          />
          <Route
            path="/midi"
            render={(routeProps) => <MidiPageRouter {...routeProps} />}
          />
          <Route
            path="/pattern"
            render={(routeProps) => <PatternPageRouter {...routeProps} />}
          />
        </Switch>
      </Body>
    </>
  );
};

const AssetPageRouter = () => {
  return (
    <>
      <Row>
        <Col>
          <h1>Asset Page</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Switch>
            <Route
              exact
              path="/asset/:guid"
              render={(routeProps) => {
                return <h1>asset/{routeProps.match.params.guid}</h1>;
              }}
            />
            <Route
              exact
              path="/asset/:guid/editor"
              render={(routeProps) => <h1>asset/:guid/editor</h1>}
            />
          </Switch>
        </Col>
      </Row>
    </>
  );
};

const MidiPageRouter = () => {
  return (
    <>
      <Row>
        <Col>
          <Switch>
            <Route
              exact
              path="/midi/:guid"
              render={(routeProps) => (
                <MidiPlayerPage name="midi" {...routeProps} />
              )}
            />
            <Route
              exact
              path="/midi/:guid/editor"
              render={(routeProps) => (
                <MidiEditorPage name="midi editor" {...routeProps} />
              )}
            />
          </Switch>
        </Col>
      </Row>
    </>
  );
};

const PatternPageRouter = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <h1>Pattern Page</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Switch>
            <Route
              exact
              path="/pattern/:guid"
              render={(routeProps) => {
                return <h1>pattern/{routeProps.match.params.guid}</h1>;
              }}
            />
            <Route
              exact
              path="/pattern/:guid/editor"
              render={(routeProps) => (
                // please adjust later with your pattern editor page/component
                <h1>pattern/{routeProps.match.params.guid}/editor</h1>
              )}
            />
          </Switch>
        </Col>
      </Row>
    </React.Fragment>
  );
};

// temporary created this midi editor just for demo purpose. replace later with actual midi editor
const MidiEditorPage = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col className="bg-default col-12">
          <h4>{`${props.name} ${props.match.params.guid}`}</h4>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default LibraryRouter;
