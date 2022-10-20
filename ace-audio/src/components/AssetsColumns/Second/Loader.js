import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const RequestLoader = ({ loadingRequest }) => {
  return (
    <div className="request_loader_wrapper">
      <Backdrop open={loadingRequest}>
        <CircularProgress
          variant="indeterminate"
          disableShrink
          size={40}
          thickness={4}
          style={{
            color: "white",
          }}
        />
      </Backdrop>
    </div>
  );
};

export const AudioPlayerLoader = ({ loadingRequest, progressLabel }) => {
  return (
    <div className="audio-player-loader">
      <CircularProgress
        variant="indeterminate"
        disableShrink
        size={30}
        thickness={4}
        style={{
          color: "white",
        }}
      />
      <Typography
        style={{ fontSize: "1rem", color: "white", marginLeft: ".5rem" }}
      >
        {progressLabel}
      </Typography>
    </div>
  );
};

export default RequestLoader;
