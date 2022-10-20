import { call, put, select, takeLatest } from "redux-saga/effects";
import { getAccessTokenState } from "../../utilities/hooks/auth/util";
import * as api from "../dashboard/services";
import { SEND_FAILURE, SEND_SUCCESS } from "../dashboard/types";
import {
  REQUEST_ASSET_ITEMS_ACTION, REQUEST_FACTORY_AUDIO_ACTION,
  REQUEST_FACTORY_AUDIO_ERROR_ACTION
} from "./types";



export function* requestFactoryAudio(action) {
  try {
    const token = yield select(getAccessTokenState);
    const response = yield call(api.sendRequest_Service, action.payload, token);
    yield put({
      type: SEND_SUCCESS,
      payload: response,
    });
  } catch (err) {
    yield put({
      type: REQUEST_FACTORY_AUDIO_ERROR_ACTION,
      payload: {
        scope: "audio",
        message: "something error while audio post",
      },
    });

    yield put({
      type: SEND_FAILURE,
      payload: err,
    });
  }
}

export function* requestAssetItems() {
  try {
    const token = yield select(getAccessTokenState);
  } catch (err) {}
}

export function* assetPageSaga() {
  yield takeLatest(REQUEST_FACTORY_AUDIO_ACTION, requestFactoryAudio);
  yield takeLatest(REQUEST_ASSET_ITEMS_ACTION, requestAssetItems);
}
