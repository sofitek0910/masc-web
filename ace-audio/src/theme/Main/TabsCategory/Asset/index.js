import React from "react";
import FirstColumn from "../../../../components/AssetsColumns/First";
import SecondColumn from "../../../../components/AssetsColumns/Second";
import PropTypes from "prop-types";

/**
 * Assets tab/screen
 */

const Assets = ({
  handleRequestChange,
  handleInputChange,
  handleSendRequest,
}) => {
  return (
    <div className="editor-container">
      <div className="editor-container-inner-wrapper">
        <FirstColumn
          handleRequestChange={handleRequestChange}
          handleInputChange={handleInputChange}
          handleSendRequest={handleSendRequest}
        />
        <div style={{ flexGrow: "1" }}>
          <div className="asset-second-column-inner-wrapper">
            <SecondColumn
              handleRequestChange={handleRequestChange}
              handleInputChange={handleInputChange}
              handleSendRequest={handleSendRequest}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Asset Component
Assets.propTypes = {
  handleRequestChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSendRequest: PropTypes.func.isRequired,
};

export default Assets;
