import React, {useState} from "react";
import ButtonComponent from "./components/button/buttonComponent";
import CreateTriangle from "./components/triangle/triangleComponent";
import CreatePattern from "./components/pattern/patternComponent";
import HoverSelectPatternPanel from "./components/hoverPanel/hoverPanelSelectPattern";

function Pattern({setErrorText, errorText, tonDataArraySettings, Stop}) {
    let isSelected = true;
    return (
        <div className="App">
            <div id="work-space">
                <ButtonComponent

                    Stop={Stop}
                />
                <CreateTriangle/>
                {tonDataArraySettings?.map((tonDataSettings, i) => {
                    if (i === 0) {
                        isSelected = true
                    } else {
                        isSelected = false
                    }
                    return (
                        <CreatePattern
                            selection={isSelected}
                            key={`${tonDataSettings.guid}${i}`}
                            tonDataArraySettings={tonDataArraySettings}
                            setErrorText={setErrorText}
                            errorText={errorText}
                            tonDataSettings={tonDataSettings}
                        />
                    );
                })}
                <HoverSelectPatternPanel style={{
                    width: "180px",
                    height: "300px",
                    float: "right",

                }}/>
            </div>
        </div>
    );
}

export default Pattern;
