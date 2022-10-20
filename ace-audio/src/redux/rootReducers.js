import { combineReducers } from "redux";
import dashboardReducer from "./dashboard/reducers";
import assetsReducer from "./assets/reducer";

const rootReducers = combineReducers({
  dashboard: dashboardReducer,
  assets: assetsReducer,
});

export default rootReducers;
