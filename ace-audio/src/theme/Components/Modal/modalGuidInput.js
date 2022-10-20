import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import * as axios from "axios";
import * as Tone from "tone";
import {useDispatch} from "react-redux";
import * as Actions from "../../../redux/dashboard/action";


const AddGuidModal = ({
                          onValueChange,
                          showModal,
                          setShowModal,
                          errorText,
                          setErrorText,
                          tonDataSettings,
                          setTonDataSettings,
                          guids,
                          handleResponseChange,
                          tonDataArraySettings
                      }) => {
    const Dispatch = useDispatch();
    const {
        changeRequestBody_Action,
        updateTreeID_Action,
    } = Actions;
    const [error, setError] = useState(false);
    const [acceptColor, setAcceptColour] = useState("white");
    const handleClose = () => {
        setShowModal(false)
        setError(false)
        setAcceptColour("white")
        setErrorText("")
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newValue = e.target[0].value
        if (/^[0-9a-z]{32}$/gi.test(newValue)) {
            axios.get(`https://masc-api.musicascode.com/mc/pattern/${newValue}/assets`).then(res => {
                /*setTonDataSettings(res.data)*/
                onValueChange(newValue)
                handleResponseChange(res.data)
                handleClose();
            }, err => {
                switch (err.response.status) {
                    case 404:
                        setErrorText(`GUID ${err.response.data.message}`);
                        setError(true)
                        setAcceptColour("#fdefef")
                        break;
                    case 401:
                        console.log(err.response.data.message);
                        setError(true)
                        setAcceptColour("#fdefef")
                        break;
                    default:
                        break;
                }
            })
        } else {
            setError(true)
            setAcceptColour("#fdefef")
            setErrorText("Something is wrong, enter the correct GUID")
        }

    };
    useEffect(() => {
        let guidsJson = {
            patterns: []
        }
        tonDataArraySettings?.map((tonDataSettings, i) => {
            return (
                guidsJson.patterns.push(
                    {
                        pattern_guid: tonDataSettings.pattern.guid
                    }
                )
            )
        })
        guidsJson = JSON.stringify(guidsJson, null, 2);
        Dispatch(changeRequestBody_Action(`${guidsJson}`));
        Dispatch(updateTreeID_Action());

    }, [tonDataArraySettings]);

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add GUID</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: acceptColor}}>
                    <Form onSubmit={handleSubmit} id="myForm">
                        <Form.Control name="input" placeholder="GUID"/>
                        {error && <Form.Text className="text-muted">
                            {errorText}
                        </Form.Text>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" form="myForm">
                        Search
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddGuidModal;