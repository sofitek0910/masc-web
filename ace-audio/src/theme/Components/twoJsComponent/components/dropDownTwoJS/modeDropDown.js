import React, {useState} from "react";
import {DropdownButton, Dropdown, ButtonGroup} from "react-bootstrap";


const ModeDropDownButton = ({
                                setValueButtonDropDown
                            }) => {
     const [title, setTitle]=useState("Immediate Switch");
    let modeOptions = [
        {
            key: "Immediate Switch",
            text: "Immediate Switch",
            value: "Immediate",
        },
        {
            key: "PatternEnd Switch",
            text: "SelectedEnd Switch",
            value: "queue",
        }
    ]
    let handlerChangeDropDownValue = (data) => {
        setValueButtonDropDown(data.value)
    }

    let handlerChangeDropDownText = (data) => {
        setTitle(data.text)
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant={'light'}
                             id={'dropValueMode'}
                             size={'sm'}
                             title={"mode"}
            >
                {title}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {modeOptions.map((data, i) => {

                    return (
                        <Dropdown.Item eventKey={i} key={i} onClick={() => {
                            handlerChangeDropDownValue(data)
                            handlerChangeDropDownText(data)
                        }}>
                            {data.text}
                            {}
                            <Dropdown.Divider/>
                        </Dropdown.Item>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ModeDropDownButton;