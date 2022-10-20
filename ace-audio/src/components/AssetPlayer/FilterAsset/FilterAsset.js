import React from "react";
import classNames from "classnames";
import { LIST_CATEGORY, LIST_KEY_SIGNATURE } from "../../../constants/common";


const FilterAsset = ({ handleFilterAsset, listBpm }) => {
  const [bpmValue, setBpmValue] = React.useState("126.25");
  const [categoryValue, setCategoryValue] = React.useState("BASS");
  const [signatureValue, setSignatureValue] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");

  const onChangeBpmValue = (value) => {
    setBpmValue(value);
    handleFilterAsset(value, categoryValue, signatureValue, searchValue);
  };

  const onChangeCategoryValue = (value) => {
    if (value === categoryValue) {
      setCategoryValue(null);
      handleFilterAsset(bpmValue, null, signatureValue, searchValue);
      return;
    }
    setCategoryValue(value);
    handleFilterAsset(bpmValue, value, signatureValue, searchValue);
  };

  const onChangeSignatureValue = (value) => {
    if (value === signatureValue) {
      setSignatureValue(null);
      handleFilterAsset(bpmValue, categoryValue, null, searchValue);
      return;
    }
    setSignatureValue(value);
    handleFilterAsset(bpmValue, categoryValue, value, searchValue);
  };

  const onKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      handleFilterAsset(bpmValue, categoryValue, signatureValue, searchValue);
    }
  };

  const onSearchChange = (evt) => {
    setSearchValue(evt.target.value);
  };
  return (
    <div>
      <div className="filter-asset-bpm">
        <div>BPM</div>
        <hr />
        <div className="filter-asset-list">
          {listBpm.map((bpm) => (
            <div
              key={Object.keys(bpm)[0]}
              className={classNames("filter-asset-item", {
                active: bpmValue === Object.keys(bpm)[0],
              })}
              onClick={() => onChangeBpmValue(Object.keys(bpm)[0])}
            >
              {Object.keys(bpm)[0]}
              <div className="filter-asset-item-quality">
                {Object.values(bpm)[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-asset-category">
        <div>CATEGORY</div>
        <hr />
        <div className="filter-asset-list">
          {LIST_CATEGORY.map((category) => (
            <div
              key={category}
              className={classNames("filter-asset-item", {
                active: categoryValue === category,
              })}
              onClick={() => onChangeCategoryValue(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className="filter-asset-signatures">
        <div>KEY SIGNATURE</div>
        <hr />
        <div className="filter-asset-list">
          {LIST_KEY_SIGNATURE.map((signature) => (
            <div
              key={signature}
              className={classNames("filter-asset-item", {
                active: signatureValue === signature,
              })}
              onClick={() => onChangeSignatureValue(signature)}
            >
              {signature}
            </div>
          ))}
        </div>
      </div>
      <div className="filter-asset-search">
        <div>SEARCH</div>
        <hr />
        <input
          onChange={onSearchChange}
          type="text"
          className="form-control"
          value={searchValue}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};

export default FilterAsset;
