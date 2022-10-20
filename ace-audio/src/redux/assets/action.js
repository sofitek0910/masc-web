import {
  ADD_NODE_ACTION,
  REMOVE_NODE_ACTION,
  ADD_EMPTY_NODE_PROPERTIES_ACTION,
  SELECT_NODE_PROPERTIES_ACTION,
  UPDATE_PROPERTY_VALUES_ACTION,
  SAVE_GUID_ACTION,
  SET_ACTIVE_NODE_ACTION,
  ADD_CHANNEL_ACTION,
  DELETE_CHANNEL_ACTION,
  UPDATE_NODE_ACTION,
  SET_REQUEST_TYPE_ACTION,
  REQUEST_FACTORY_AUDIO_ACTION,
} from "./types";

export const addNodeAction = (assetName) => ({
  type: ADD_NODE_ACTION,
  payload: assetName,
});

export const removeNodeAction = (nodeIdx) => ({
  type: REMOVE_NODE_ACTION,
  payload: {
    nodeIdx,
  },
});

export const addEmptyNodePropertiesAction = (nodeType, template) => ({
  type: ADD_EMPTY_NODE_PROPERTIES_ACTION,
  payload: {
    nodeType,
    template,
  },
});

export const selectNodePropertiesAction = (nodeType, nodePropertiesIndex) => ({
  type: SELECT_NODE_PROPERTIES_ACTION,
  payload: {
    nodeType,
    nodePropertiesIndex,
  },
});

export const updatePropertyValuesAction = (selectedProperty, keyValues) => ({
  type: UPDATE_PROPERTY_VALUES_ACTION,
  payload: {
    selectedProperty,
    keyValues,
  },
});

export const updateNodeAction = (nodeIndex, keyValues) => ({
  type: UPDATE_NODE_ACTION,
  payload: {
    nodeIndex,
    keyValues,
  },
});

export const saveGuidAction = (data) => ({
  type: SAVE_GUID_ACTION,
  payload: data,
});

export const setActiveNodeAction = (nodeIndex, nodeType) => ({
  type: SET_ACTIVE_NODE_ACTION,
  payload: {
    nodeIndex,
    nodeType,
  },
});

export const addChannelAction = (nodeId) => ({
  type: ADD_CHANNEL_ACTION,
  payload: {
    nodeId,
  },
});

export const deleteChannelAction = () => ({
  type: DELETE_CHANNEL_ACTION,
});

export const setRequestTypeAction = (payload) => ({
  type: SET_REQUEST_TYPE_ACTION,
  payload,
});

export const requestFactoryAudioAction = (payload) => ({
  type: REQUEST_FACTORY_AUDIO_ACTION,
  payload,
});
