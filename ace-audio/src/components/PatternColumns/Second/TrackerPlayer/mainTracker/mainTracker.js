import React, { useEffect, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import McTrackAudio from "../McTrackAudio/McTrackAudio";
import * as Tone from "tone";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../../redux/dashboard/action";

import { Col, Row } from "react-bootstrap";

const MainTracker = ({}) => {
  const Dispatch = useDispatch();
  const { change_players_Action } = Actions;
  const { players, tracks, trackNum } = useSelector((state) => state.dashboard);

  //react-spring animations
  const listTransition = useTransition(trackNum, {
    from: { opacity: 0, height: 0 },
    enter: {
      opacity: 1,
      height: 130,
      marginBottom: 100,
      maxWidth: "fit-content",
    },
    leave: { opacity: 0, height: 0 },
    keys: trackNum.map((item) => item),
  });

  useEffect(() => {}, [tracks]);
  useEffect(() => {
    let pl = new Tone.Players().toDestination();
    Dispatch(change_players_Action(pl));
  }, []);
  return (
    <Row>
      <Row>
        <Col lg={12}>
          {/*           <div className="samples">
            <div className="container-tracker">
              <div className="tracks"> */}
          {listTransition((styles, item, t, i) => {
            return (
              <animated.div style={styles}>
                <McTrackAudio num={item} pos={i} />
              </animated.div>
            );
          })}
          {/* </div>
            </div>
          </div> */}
        </Col>
      </Row>
    </Row>
  );
};

export default MainTracker;
