import produce, { current } from "immer";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_NODE_ACTION,
  REMOVE_NODE_ACTION,
  ADD_EMPTY_NODE_PROPERTIES_ACTION,
  SELECT_NODE_PROPERTIES_ACTION,
  UPDATE_PROPERTY_VALUES_ACTION,
  SET_ACTIVE_NODE_ACTION,
  SAVE_GUID_ACTION,
  ADD_CHANNEL_ACTION,
  DELETE_CHANNEL_ACTION,
  UPDATE_NODE_ACTION,
  SET_REQUEST_TYPE_ACTION,
  REQUEST_FACTORY_AUDIO_ACTION,
  REQUEST_FACTORY_AUDIO_SUCCESS_ACTION,
  REQUEST_FACTORY_AUDIO_ERROR_ACTION,
} from "./types";
import _ from "lodash";

let nodeOutputId = uuidv4();
const initialState = {
  active_channel: 0,
  active_node: 0,
  active_node_type: "outputNode",
  selected_property: {
    // midi: null,
    // plugin: null,
    // patch: null,
    // outputNode: null
  },
  nodes: [
    {
      id: nodeOutputId,
      type: "outputNode",
      data: {
        text: `output`,
        guid: "",
        slot: null,
        instrument: "",
        channel: 1,
        vol: -20,
        pan: 0,
      },
      position: {
        x: 500,
        y: 200,
      },
    },
  ],
  node_properties: {
    midi: [],
    plugin: [],
    patch: [],
    outputNode: [
      {
        id: nodeOutputId,
        channel: 1,
        vol: -20,
        pan: 0,
      },
    ],
  },
  request: {
    isLoading: false,
    type: "", // audio|other asset
    error: {
      messageScope: null,
      message: null,
    },
  },
  response: {
    body: "",
  },
};

const AssetsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_NODE_ACTION: {
        draft.nodes.push(action.payload);
        break;
      }
      case REMOVE_NODE_ACTION: {
        const { nodeIdx } = action.payload;
        if (nodeIdx !== -1) {
          draft.nodes.splice(nodeIdx, 1);
        }
        break;
      }
      case ADD_EMPTY_NODE_PROPERTIES_ACTION: {
        const { nodeType, template } = action.payload;
        draft.node_properties[nodeType].push(template);
        break;
      }
      case SELECT_NODE_PROPERTIES_ACTION: {
        const { nodeType, nodePropertiesIndex } = action.payload;
        let selectedObject = {
          [nodeType]: nodePropertiesIndex,
        };
        draft.selected_property = selectedObject;
        break;
      }
      case UPDATE_PROPERTY_VALUES_ACTION: {
        const { selectedProperty, keyValues } = action.payload;
        let currentProp = current(draft);
        let activeNode = currentProp.active_node_type;

        draft.node_properties[activeNode][selectedProperty] = {
          ...draft.node_properties[activeNode][selectedProperty],
          ...keyValues,
        };
        break;
      }

      case SET_ACTIVE_NODE_ACTION: {
        const { nodeIndex, nodeType } = action.payload;
        draft.active_node = nodeIndex;
        draft.active_node_type = nodeType;
        break;
      }

      case SAVE_GUID_ACTION: {
        const { index, guid } = action.payload;
        draft.nodes[index].data.guid = guid;
        break;
      }

      case ADD_CHANNEL_ACTION: {
        break;
      }

      case DELETE_CHANNEL_ACTION: {
        let currentProp = current(draft);
        let noOfChannels = _.reduce(
          currentProp.nodes,
          (sum, item) => (item.type === "outputNode" ? sum + 1 : sum),
          0
        );

        let removeChannelIdx = _.findLastIndex(currentProp.nodes, {
          type: "outputNode",
        });
        if (noOfChannels > 1) {
          draft.nodes.splice(removeChannelIdx, 1);
        }
        break;
      }

      case UPDATE_NODE_ACTION: {
        const { nodeIndex, keyValues } = action.payload;

        draft.nodes[nodeIndex].data = {
          ...draft.nodes[nodeIndex].data,
          ...keyValues,
        };
        break;
      }

      case SET_REQUEST_TYPE_ACTION:
        draft.request.type = action.payload;
        break;

      case REQUEST_FACTORY_AUDIO_ACTION:
        draft.request.isLoading = true;
        break;

      case REQUEST_FACTORY_AUDIO_SUCCESS_ACTION:
        draft.request.type = "";
        draft.request.isLoading = false;
        draft.request.error.messageScope = null;
        draft.request.error.message = null;
        break;

      case REQUEST_FACTORY_AUDIO_ERROR_ACTION:
        draft.request.type = "";
        draft.request.isLoading = false;
        draft.request.error.messageScope = action.payload.scope;
        draft.request.error.message = action.payload.message;
        break;

      default:
        return draft;
    }
  });

export default AssetsReducer;
