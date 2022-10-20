import { put, call, takeLatest, select } from "redux-saga/effects";
import * as types from "./types";
import { SAVE_GUID_ACTION } from "../assets/types";
import * as api from "./services";
import {
  setAccessToken,
  // getAccessToken,
  getAccessTokenState,
  getResponseBody,
  getActiveNode,
} from "../../utilities/hooks/auth/util";

function* sendRequest_Saga(action) {
  try {
    const token = yield select(getAccessTokenState);
    const result = yield call(api.sendRequest_Service, action.payload, token);

    yield put({
      type: types.SEND_SUCCESS,
      payload: result,
    });
    yield put({
      type: types.SEND_RESET,
    });

    const responseBody = yield select(getResponseBody);
    const parsedResponse = JSON.parse(responseBody);
    const activeNode = yield select(getActiveNode);

    yield put({
      type: SAVE_GUID_ACTION,
      payload: {
        index: activeNode, // current active|selected node index
        guid: parsedResponse.guid,
      },
    });
  } catch (error) {
    yield put({
      type: types.SEND_FAILURE,
      payload: error,
    });
  }
}

function* sendPutRequest_Saga(action) {
  try {
    const token = yield select(getAccessTokenState);
    const result = yield call(
      api.sendPutRequest_Service,
      action.payload,
      token
    );

    yield put({
      type: types.SEND_SUCCESS,
      payload: result,
    });
    yield put({
      type: types.SEND_RESET,
    });

    const responseBody = yield select(getResponseBody);
    const parsedResponse = JSON.parse(responseBody);
    const activeNode = yield select(getActiveNode);

    yield put({
      type: SAVE_GUID_ACTION,
      payload: {
        index: activeNode, // current active|selected node index
        guid: parsedResponse.guid,
      },
    });
  } catch (error) {
    yield put({
      type: types.SEND_FAILURE,
      payload: error,
    });
  }
}

function* keyCloakRequest_Saga() {
  try {
    const result = yield call(api.keyCloak_Service);

    yield put({
      type: types.KEY_CLOAK_SUCCESS,
      payload: result.data,
    });
    setAccessToken(result.data.access_token);
    yield put({
      type: types.KEY_CLOAK_RESET,
    });
  } catch (error) {
    yield put({
      type: types.KEY_CLOAK_FAILURE,
      payload: error,
    });
  }
}

function* assetSearch_Saga(action) {
  try {
    const result = yield call(api.assetSearch_Service, action.payload);

    yield put({
      type: types.ASSET_SEARCH_SUCCESS,
      payload: result.data.data,
    });
    yield put({
      type: types.ASSET_SEARCH_RESET,
    });
  } catch (error) {
    yield put({
      type: types.ASSET_SEARCH_FAILURE,
      payload: error,
    });
  }
}

function* createPattern_Saga(action) {
  try {
    const result = yield call(
      api.createPattern_Service,
      action.payload,
      action.token
    );

    yield put({
      type: types.CREATE_PATTERN_SUCCESS,
      payload: result.data.data,
    });
    yield put({
      type: types.CREATE_PATTERN_RESET,
    });
  } catch (error) {
    yield put({
      type: types.CREATE_PATTERN_FAILURE,
      payload: error,
    });
  }
}

function* createAsset_Saga(action) {
  try {
    const result = yield call(
      api.createAsset_Service,
      action.payload,
      action.token
    );

    yield put({
      type: types.CREATE_ASSET_SUCCESS,
      payload: result,
    });
    yield put({
      type: types.CREATE_ASSET_RESET,
    });
  } catch (error) {
    yield put({
      type: types.CREATE_ASSET_FAILURE,
      payload: error,
    });
  }
}

function* patternAssetLoad_Saga(action) {
  try {
    const result = yield call(api.patternAssetLoad_Service, action.payload);

    yield put({
      type: types.PATTERN_ASSET_LOAD_SUCCESS,
      payload: result.data.data,
    });
    yield put({
      type: types.PATTERN_ASSET_LOAD_RESET,
    });
  } catch (error) {
    yield put({
      type: types.PATTERN_ASSET_LOAD_FAILURE,
      payload: error,
    });
  }
}

function* patternList_Saga(action) {
  try {
    const token = yield select(getAccessTokenState);
    const result = yield call(api.patternList_Service, action.payload, token);

    yield put({
      type: types.PATTERN_LIST_SUCCESS,
      payload: result.data.data,
    });
    yield put({
      type: types.PATTERN_LIST_RESET,
    });
  } catch (error) {
    yield put({
      type: types.PATTERN_LIST_FAILURE,
      payload: error,
    });
  }
}

function* assetList_Saga(action) {
  try {
    const token = yield select(getAccessTokenState);
    const result = yield call(api.assetList_Service, action.payload, token);

    yield put({
      type: types.ASSET_LIST_SUCCESS,
      payload: result.data.data,
    });
    yield put({
      type: types.ASSET_LIST_RESET,
    });
  } catch (error) {
    yield put({
      type: types.ASSET_LIST_FAILURE,
      payload: error,
    });
  }
}

function* setSearchPattern_Saga(action) {
  try {
    const token = yield select(getAccessTokenState);
    const result = yield call(
      api.setSearchPattern_Service,
      action.payload,
      token
    );
    yield put({
      type: types.SET_SEARCH_PATTERN_SUCCESS,
      payload: result.data.data,
    });
    yield put({
      type: types.SET_SEARCH_PATTERN_RESET,
    });
  } catch (error) {
    yield put({
      type: types.SET_SEARCH_PATTERN_FAILURE,
      payload: error,
    });
  }
}

export function* dashboardWatcher() {
  yield takeLatest(types.SEND_REQUEST, sendRequest_Saga);
  yield takeLatest(types.SEND_PUT_REQUEST, sendPutRequest_Saga);
  yield takeLatest(types.KEY_CLOAK_REQUEST, keyCloakRequest_Saga);
  yield takeLatest(types.ASSET_SEARCH_REQUEST, assetSearch_Saga);
  yield takeLatest(types.CREATE_PATTERN_REQUEST, createPattern_Saga);
  yield takeLatest(types.CREATE_ASSET_REQUEST, createAsset_Saga);
  yield takeLatest(types.PATTERN_ASSET_LOAD_REQUEST, patternAssetLoad_Saga);
  yield takeLatest(types.PATTERN_LIST_REQUEST, patternList_Saga);
  yield takeLatest(types.ASSET_LIST_REQUEST, assetList_Saga);
  yield takeLatest(types.SET_SEARCH_PATTERN_REQUEST, setSearchPattern_Saga);
}
