import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../redux/dashboard/action";
import DnDPanel from "../../../theme/Components/panelPatternDnDComponent/panelDndConponent";
import SearchButton from "./SearchButton";

const Index = ({ handleResponseChange }) => {
  const Dispatch = useDispatch();
  const { changeSearchPattern_Action } = Actions;

  const { searchPattern } = useSelector((state) => state.dashboard);

  //const [searchPattern, setSearchPattern] = useState([]);
  return (
    <div
      className="sequence_card mb-3"
      style={{
        overflowY: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <span>SEARCH PATTERN</span>
      <SearchButton />
      <DnDPanel
        patterns={searchPattern}
        setPattern={(value) => {
          Dispatch(changeSearchPattern_Action(value));
        }}
        handleResponseChange={handleResponseChange}
      />
    </div>
  );
};

export default Index;
