import React, {useState} from "react";
import * as Tone from "tone";
import ModeDropDown from "../dropDownTwoJS/modeDropDown";
import {ButtonToolbar, Form, InputGroup} from "react-bootstrap";
import {Button, ButtonGroup, FormControl} from "@material-ui/core";

function ButtonComponent({
                             Stop,
                         }) {
    let eventStart = (e) => {
        /* e.preventDefault();*/
        Tone.Transport.start();
        Tone.start();
    };
    let eventStop = (e) => {
        /*e.preventDefault();*/
        Tone.Transport.stop();
    };

    return (
        <div>
            <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                <ButtonGroup className="me-2" aria-label="First group" variant="light">
                    {/*<Button
                        className="start"
                        variant="light"
                        onClick={() => {
                            // Stop();
                            eventStart();
                        }}
                    >
                        start
                    </Button>{" "}
                    <Button className="stop" variant="light" onClick={eventStop}>
                        stop
                    </Button>{" "}*/}
                </ButtonGroup>
                <div>
                    <Form className="form-check form-switch"
                          style={{
                              color: "white",
                              display: "inline-block",
                              margin:"5px"
                          }}>
                        <Form.Check
                            type="checkbox"
                            id="immediate-selected-end"
                            label="Immediate/SelectedEnd"
                            variant="secondary"
                        />
                    </Form>
                </div>
            </ButtonToolbar>
        </div>
    );
}

export default ButtonComponent;
