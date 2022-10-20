import React, {useState} from "react";
import DnDPanel from "../../../theme/Components/panelPatternDnDComponent/panelDndConponent";
import SearchButton from "./SearchButton";
const Index = ({handleResponseChange}) => {
    const [searchPattern, setSearchPattern]=useState([])
    return (
        <div className="sequence_card mb-3"
             style={{
                 overflowY :"scroll",
                 scrollbarWidth: "none",
                 msOverflowStyle: "none",
             }}>
            <span>SEARCH PATTERN</span>
            <SearchButton setSearchPattern={setSearchPattern}/>
            <DnDPanel patterns={searchPattern}
                      setPattern={setSearchPattern}
                      handleResponseChange={handleResponseChange}
            />

        </div>
    );
};

export default Index;
