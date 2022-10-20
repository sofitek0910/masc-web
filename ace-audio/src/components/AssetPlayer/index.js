import track from "react-tracking";
import { handleTrackerReducer } from "../../utilities/hooks/auth/trackerService";
import AssetPlayer from "./AssetPlayer";

export default track(
  { app: "asset-player" },
  {
    dispatch: (data) => {
      handleTrackerReducer(data);
      (window.dataLayer = window.dataLayer || []).push(data);
    },
  }
)(AssetPlayer);
