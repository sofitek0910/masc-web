import { fork, all } from "redux-saga/effects";
import { dashboardWatcher } from "./dashboard/sagas";
import { assetPageSaga } from "./assets/saga";

export default function* rootSaga() {
  yield all([fork(dashboardWatcher), fork(assetPageSaga)]);
}
