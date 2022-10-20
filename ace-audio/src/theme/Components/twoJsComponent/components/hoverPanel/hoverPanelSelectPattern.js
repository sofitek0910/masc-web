import React, {useEffect, Fragment} from "react";

import {alpha, withStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";


const Input = withStyles((theme) => ({
    root: {
        "label + &": {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.common.white,
        border: "1px solid #ced4da",
        fontSize: 14,
        width: "100%",
        padding: "5px 6px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        "&:focus": {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);

const formControlStyle = {marginBottom: ".5rem", width: "100%"};

const HoverSelectPatternPanel = (otherProps) => {

    return (
        <div className="select_panel" {...otherProps}>
            <form noValidate autoComplete="off" style={{
                padding: "1rem",
                backgroundColor: "white",
                borderRadius: "5px",

            }}>
                <Fragment>
                    <div style={{
                        color:"black",
                        textAlign:"center"
                    }}>Selected Pattern</div>
                    <FormControl style={formControlStyle}>
                        <InputLabel shrink htmlFor="native-select">
                            tempo
                        </InputLabel>
                        <Input
                            size="small"
                            fullWidth
                            name="tempo"
                            value={5}
                            /*onChange={onChangeInput}*/
                        />
                    </FormControl>
                    <FormControl style={formControlStyle}>
                        <InputLabel shrink htmlFor="native-select">
                            Post Start
                        </InputLabel>
                        <Input
                            size="small"
                            fullWidth
                            name="postStart"
                            value={5}
                            /*onChange={onChangeInput}*/
                        />
                    </FormControl>
                    <FormControl style={formControlStyle}>
                        <InputLabel shrink htmlFor="native-select">
                            Post End
                        </InputLabel>
                        <Input
                            size="small"
                            name="postEnd"
                            value={5}
                            /*onChange={onChangeInput}*/
                        />
                    </FormControl>
                    <FormControl style={formControlStyle}>
                        <InputLabel shrink htmlFor="native-select">
                            Tracks
                        </InputLabel>
                        <Input
                            size="small"
                            name="tracks"
                            value={5}
                            /*onChange={onChangeInput}*/
                        />
                    </FormControl>

                </Fragment>
            </form>
        </div>
    )
}



export default HoverSelectPatternPanel;