import * as types from "./types";

export const changeTreeData_Action = (data) => {
  return {
    type: types.CHANGE_TREE_DATA,
    payload: data,
  };
};

export const addTreeData_Action = (data) => {
  return {
    type: types.ADD_TREE_DATA,
    payload: data,
  };
};

export const saveTreeID_Action = (data) => {
  return {
    type: types.SAVE_TREE_ID,
    payload: data,
  };
};

export const updateTreeID_Action = () => {
  return {
    type: types.UPDATE_TREE_ID,
  };
};

export const changeRequestLink_Action = (data) => {
  return {
    type: types.CHANGE_REQUEST_LINK,
    payload: data,
  };
};

export const changeRequestBody_Action = (data) => {
  return {
    type: types.CHANGE_REQUEST_BODY,
    payload: data,
  };
};

export const sendRequest_Action = (data) => {
  return {
    type: types.SEND_REQUEST,
    payload: data,
  };
};

export const sendPutRequest_Action = (data) => {
  return {
    type: types.SEND_PUT_REQUEST,
    payload: data,
  };
};

export const deleteTreeElement_Action = () => {
  return {
    type: types.DELETE_TREE_ELEMENT,
  };
};

export const duplicateTreeElement_Action = () => {
  return {
    type: types.DUPLICATE_TREE_ELEMENT,
  };
};

export const addTreeElementTitle_Action = (data) => {
  return {
    type: types.ADD_TREE_ELEMENT_TITLE,
    payload: data,
  };
};

export const changeTreeElementTitle_Action = (data) => {
  return {
    type: types.CHANGE_TREE_ELEMENT_TITLE,
    payload: data,
  };
};

export const changeRequestBodyStatic_Action = (data) => {
  return {
    type: types.CHANGE_REQUEST_BODY_STATIC,
    payload: data,
  };
};

export const keyCloak_Action = () => {
  return {
    type: types.KEY_CLOAK_REQUEST,
  };
};
export const authToken_Action = (token, isRouteVisible) => {
  return {
    type: types.AUTH_TOKEN,
    payload: token,
    isRouteVisible: isRouteVisible,
  };
};

export const changeTabs_Action = (data) => {
  return {
    type: types.CHANGE_TABS,
    payload: data,
  };
};

export const changePositionValue_Action = (data) => {
  return {
    type: types.CHANGE_POSITION_VALUE,
    payload: data,
  };
};
export const changeToneJS_Action = (data) => {
  return {
    type: types.CHANGE_TONEJS,
    payload: data,
  };
};

export const logout_Action = () => {
  return {
    type: types.LOGOUT,
  };
};

export const assetSearch_Action = (data) => {
  return {
    type: types.ASSET_SEARCH_REQUEST,
    payload: data,
  };
};
export const changeAssetIndex_Action = (data, index) => {
  return {
    type: types.CHANGE_CURRENTASSETS_INDEX,
    payload: data,
    index: index,
  };
};
export const changeCurrentIdIndex_Action = (data, index) => {
  return {
    type: types.CHANGE_CURRENT_ID_INDEX,
    payload: data,
    index: index,
  };
};
export const changeCountIndex_Action = (data, index) => {
  return {
    type: types.CHANGE_COUNT_INDEX,
    payload: data,
    index: index,
  };
};

// ASSET EDITOR
export const clearEditorResponseAction = () => {
  return {
    type: types.CLEAR_EDITOR_RESPONSE_ACTION,
  };
};

export const themechanger_Action = (data) => {
  return {
    type: types.THEME_CHANGER,
    payload: data,
  };
};

export const createPattern_Action = (data, token) => {
  return {
    type: types.CREATE_PATTERN_REQUEST,
    payload: data,
    token: token,
  };
};

export const changeCreatedPatternState_Action = (data) => {
  return {
    type: types.CHANGE_CREATED_PATTERN,
    payload: data,
  };
};

export const changeNewAddState_Action = (data) => {
  return {
    type: types.CHANGE_NEW_ADD_STATE,
    payload: data,
  };
};

export const changeNewAddValue_Action = (data) => {
  return {
    type: types.CHANGE_NEW_ADD_VALUE,
    payload: data,
  };
};

export const newRequestBody_Action = (data) => {
  return {
    type: types.NEW_REQUEST_BODY,
    payload: data,
  };
};

export const createAsset_Action = (data, token) => {
  return {
    type: types.CREATE_ASSET_REQUEST,
    payload: data,
    token: token,
  };
};

export const changeNewPatternState_Action = (data) => {
  return {
    type: types.CHANGE_NEW_PATTERN_STATE,
    payload: data,
  };
};
export const changeSequenceGuid_Action = (data) => {
  return {
    type: types.CHANGE_SEQUENCE_GUID_ROUTE,
    payload: data,
  };
};

export const patternAssetLoad = (value) => {
  return {
    type: types.PATTERN_ASSET_LOAD_REQUEST,
    payload: value,
  };
};

/* *****************************    Pattern Player     ******************************* */

export const changeVolume_Action = (value) => {
  return {
    type: types.CHANGE_VOLUME,
    payload: value,
  };
};

export const changeMute_Action = (value, pos) => {
  return {
    type: types.CHANGE_MUTE,
    payload: value,
    pos,
  };
};

export const changeLocked_Action = (value) => {
  return {
    type: types.CHANGE_LOCKED,
    payload: value,
  };
};

export const changePosition_Action = (value) => {
  return {
    type: types.CHANGE_POSITION,
    payload: value,
  };
};

export const changeBack_Action = (value) => {
  return {
    type: types.CHANGE_BACK,
    payload: value,
  };
};

export const change_players_Action = (data) => {
  return {
    type: types.CHANGE_PLAYERS,
    payload: data,
  };
};

export const change_selectedbit_Action = (data) => {
  return {
    type: types.CHANGE_SLECTEDBIT,
    payload: data,
  };
};

export const change_tracks_Action = (pos, obj) => {
  return {
    type: types.CHANGE_TRACKS,
    pos,
    obj,
  };
};

export const change_current_assets_Action = (pos, obj) => {
  return {
    type: types.CHANGE_CURRENTASSETS,
    pos,
    obj,
  };
};

export const change_current_assetsEmpty_Action = (data) => {
  return {
    type: types.CHANGE_CURRENTASSETS_EMPTY,
    payload: data,
  };
};

export const change_current_id_Action = (pos, obj) => {
  return {
    type: types.CHANGE_CURRENT_ID,
    pos,
    obj,
  };
};

export const change_count_Action = (pos, obj) => {
  return {
    type: types.CHANGE_COUNT,
    pos,
    obj,
  };
};

export const track_volume_Action = (pos, obj) => {
  return {
    type: types.CHANGE_TRACK_VOLUME,
    pos,
    obj,
  };
};

export const removeTrack_Action = (pos) => {
  return {
    type: types.REMOVE_TRACK,
    pos,
  };
};

export const change_track_num_Action = (data) => {
  return {
    type: types.CHANGE_TRACK_NUM,
    payload: data,
  };
};

export const changeAssetDataSize_Action = (value) => {
  return {
    type: types.CHANGE_ASSET_DATA_SIZE,
    payload: value,
  };
};

export const changeAssetData_Action = (value) => {
  return {
    type: types.CHANGE_ASSET_DATA,
    payload: value,
  };
};

export const changeAssetValue_Action = (data) => {
  return {
    type: types.CHANGE_ASSET_VALUE,
    payload: data,
  };
};
export const setPlaying_Action = (data) => {
  return {
    type: types.SET_PLAYING,
    payload: data,
  };
};

export const setStarting_Action = (data) => {
  return {
    type: types.SET_STARTING,
    payload: data,
  };
};
export const setTimeSig_Action = (data) => {
  return {
    type: types.SET_TIME_SIG,
    payload: data,
  };
};

export const setBpm_Action = (data) => {
  return {
    type: types.SET_BPM,
    payload: data,
  };
};

export const setBars_Action = (data) => {
  return {
    type: types.SET_BARS,
    payload: data,
  };
};

export const patternList_Action = (data) => {
  return {
    type: types.PATTERN_LIST_REQUEST,
    payload: data,
  };
};

export const assetList_Action = (data) => {
  return {
    type: types.ASSET_LIST_REQUEST,
    payload: data,
  };
};

export const setSearchPattern_Action = (data) => {
  return {
    type: types.SET_SEARCH_PATTERN_REQUEST,
    payload: data,
  };
};

export const changeSearchPattern_Action = (data) => {
  return {
    type: types.CHANGE_SEARCH_PATTERN,
    payload: data,
  };
};
