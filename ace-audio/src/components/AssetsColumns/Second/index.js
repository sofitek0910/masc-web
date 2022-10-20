import _ from "lodash";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import ResizePanel from "react-resize-panel";
import {
  addNodeAction,
  removeNodeAction,
  setActiveNodeAction,
  setRequestTypeAction
} from "redux/assets/action";
// request body
import {
  changeRequestBody_Action as changeRequestBodyAction,
  changeRequestLink_Action as changeRequestLinkAction,
  clearEditorResponseAction
} from "redux/dashboard/action";
import { v4 as uuidv4 } from "uuid";
import { isAudioRequestValid } from "../../../utilities/helper/helper";
import Editor from "../../Editor/Editor";
// import WaveForm from "../../../modules/WaveForm";
import AudioPlayer from "./AudioPlayer";
import {
  createRequestBody, createRequestFactoryAudioBody, createRequestLink
} from "./helpers";
import { MidiNode, OutputNode, PatchNode, PluginNode } from "./Node";
import NodePropertiesPanel from "./NodePropertiesPanel";




/*
import dagre from "dagre";
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const direction = "BT"; // vertical top to bottom
const nodeWidth = 250,
  nodeHeight = 120;
let targetPosition = "top";
let sourcePosition = "bottom";

const getLayoutedElements = (elements) => {
  dagreGraph.setGraph({ rankdir: direction, nodesep: 100 });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el) && el.type !== "outputNode") {
      if (el.type === "plugin") {
        targetPosition = "bottom";
        sourcePosition = "bottom";
      }

      const nodeWithPosition = dagreGraph.node(el.id);
      el = {
        ...el,
        // targetPosition: targetPosition,
        // sourcePosition: sourcePosition,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
    }

    return el;
  });
};
*/

// custom Node Components
const nodeTypes = {
  midi: MidiNode,
  patch: PatchNode,
  plugin: PluginNode,
  outputNode: OutputNode,
};

const customEdgeAttributes = {
  type: "smoothstep",
  arrowHeadType: "arrowclosed",
  style: { strokeWidth: 1 },
};

const SecondAssetsColumn = ({
  handleRequestChange,
  handleInputChange,
  handleSendRequest,
}) => {
  const [rfInstance, setRfInstance] = useState();
  const [currentProperty, setCurrentProperty] = useState({});

  const dispatch = useDispatch();
  const active_node = useSelector((state) => state.assets.active_node);
  const nodeElements = useSelector((state) => state.assets.nodes);
  const loadingRequest = useSelector((state) => state.assets.request.isLoading);

  const onNodeClick = React.useCallback(
    (evt, elem) => {
      if (Object.keys(nodeTypes).includes(elem.type)) {
        let nodeId = elem.id,
          type = elem.type;

        // refactor use just nodes
        let nodeIndex = nodeElements.findIndex((item) => item.id === nodeId);
        setCurrentProperty(elem.data);
        dispatch(setActiveNodeAction(nodeIndex, type));
      }
    },
    [nodeElements]
  );

  // if user select node set request link, body based on node midi type (rhythm, lfo, qwerty)
  useEffect(() => {
    if (_.has(nodeElements[active_node].data, "midi_type")) {
      dispatch(setRequestTypeAction(""));
      let midiRequestLink = createRequestLink(
        nodeElements[active_node].data.midi_type
      );
      let midiRequestBody = createRequestBody(nodeElements[active_node].data);
      dispatch(changeRequestLinkAction(midiRequestLink));
      dispatch(changeRequestBodyAction(midiRequestBody));
    }

    // when node has been saved dont't display requestLink, requestBody
    if (!_.isEmpty(nodeElements[active_node].data.guid)) {
      dispatch(changeRequestLinkAction(""));
      dispatch(changeRequestBodyAction(""));
      dispatch(clearEditorResponseAction());
    }

    if (nodeElements[active_node].type !== "midi") {
      dispatch(changeRequestLinkAction(""));
      dispatch(changeRequestBodyAction(""));
      dispatch(clearEditorResponseAction());
    }
  }, [active_node, dispatch, nodeElements]);

  const onElementsRemove = (elementsToRemove) => {
    if (Object.keys(nodeTypes).includes(elementsToRemove[0].type)) {
      dispatch(removeNodeAction(active_node));
    }
  };

  const onConnect = (params) => {
    dispatch(
      addNodeAction({
        ...params,
        ...customEdgeAttributes,
        id: uuidv4(),
      })
    );
  };

  const onLoad = (reactFlowInstance) => {
    setRfInstance(reactFlowInstance);
  };

  // drag or select all nodes to create request body for factory.audio
  const onSelectionChange = React.useCallback((elems) => {
    if (elems) {
      // preparing data for factory.audio request body
      // **********************************************
      let plugins = _.filter(nodeElements, { type: "plugin" }).map(
        (item) => item.data.plugin
      );

      let channels = _.filter(nodeElements, { type: "outputNode" });
      let midis = _.filter(nodeElements, { type: "midi" }).flatMap((item) =>
        item.data.guid !== "" ? item.data.guid : []
      );
      let chan = [];

      plugins.map((item) => {
        let channelObject = {};
        let plugin = item;
        channels.map((item) => {
          channelObject["plugin"] = plugin;
          channelObject["channel"] = item.data.channel;
          channelObject["volume"] = item.data.vol;
          channelObject["pan"] = item.data.pan;
          channelObject["midi"] = midis;
          chan.push(channelObject);
        });
      });

      // ********************************************** */

      // factory.audio specs
      /*
      channel:
      - plugin: surge.vst3
        channel: 1
        volume: -24
        pan: -50
        patch: AA082127233A4579A4A988E27056028A
        midi:
          - 5CF11FC7C8504B6FBC26B4D164026C30
          - 5CF11FC7C8504B6FBC26B4D164026C30
      - plugin: surgeBank.vst3
        channel: 1
        volume: -24
        pan: -50
        patch: AA082127233A4579A4A988E27056028A
        midi:
          - 5CF11FC7C8504B6FBC26B4D164026C30
          - 5CF11FC7C8504B6FBC26B4D164026C30

    */
      if (elems.length === nodeElements.length && nodeElements.length > 1) {
        if (isAudioRequestValid(elems)) {
          let requestLink = createRequestLink("audioFactory");
          dispatch(changeRequestLinkAction(requestLink));
          dispatch(
            changeRequestBodyAction(createRequestFactoryAudioBody(chan))
          );
          dispatch(setRequestTypeAction("audio"));
        }
      } else {
        dispatch(setRequestTypeAction(""));
        dispatch(changeRequestLinkAction(""));
        dispatch(changeRequestBodyAction(""));
        dispatch(clearEditorResponseAction());
      }
    }
  });

  // const onConnectStart = (event, { nodeId, handleType }) =>
  //   console.log("on connect start", { nodeId, handleType });

  useEffect(() => {
    if (rfInstance && nodeElements.length > 0) {
      rfInstance.zoomOut(5000);
    }
  }, [rfInstance, nodeElements.length]);

  return (
    <div className="editors-section">
      <div className="flexbox">
        <div className="one">
          <div className="second_column_wrapper" id="aboveditor">
            <ResizePanel direction="s" handleClass="customHandle">
              <Fragment>
                <ReactFlowComponents
                  nodeElements={nodeElements}
                  nodeTypes={nodeTypes}
                  onLoad={onLoad}
                  nodesConnectable
                  snapToGrid={false}
                  onConnect={onConnect}
                  onElementsRemove={onElementsRemove}
                  minZoom={0.2}
                  elementsSelectable={true}
                  deleteKeyCode="Delete"
                  onElementClick={onNodeClick}
                  onSelectionChange={onSelectionChange}
                  // onConnectStart={onConnectStart}
                >
                  <Background color="#aaa" gap={16} />
                  <NodePropertiesPanel />
                  <Controls />
                </ReactFlowComponents>
                <AudioPlayer isLoading={loadingRequest} />
              </Fragment>
            </ResizePanel>
            <ResizePanel direction="s" handleClass="customHandle">
              <Editor
                getLink={handleInputChange}
                onClick={handleSendRequest}
                showRequestBar={true}
                handleRequestChange={handleRequestChange}
              />
            </ResizePanel>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReactFlowComponents = ({
  nodeElements,
  nodeTypes,
  children,
  onLoad,
  ...otherProps
}) => {
  return (
    <ReactFlow
      elements={nodeElements}
      onLoad={onLoad}
      nodeTypes={nodeTypes}
      {...otherProps}
    >
      {children}
    </ReactFlow>
  );
};

ReactFlowComponents.propTypes = {
  nodeElements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.oneOf(["midi", "plugin", "patch", "outputNode"]),
      data: PropTypes.exact({
        id: PropTypes.string,
        text: PropTypes.string,
        guid: PropTypes.string,
        slot: PropTypes.number,
        instrument: PropTypes.string,
      }),
      position: PropTypes.exact({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
      source: PropTypes.string,
      target: PropTypes.string,
      animated: PropTypes.bool,
    })
  ),
};

export default SecondAssetsColumn;
