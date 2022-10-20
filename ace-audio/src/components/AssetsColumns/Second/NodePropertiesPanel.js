import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // updatePropertyValuesAction,
  // addChannelAction,
  deleteChannelAction,
  addNodeAction,
  updateNodeAction,
} from "redux/assets/action";
import {
  changeRequestLink_Action as changeRequestLinkAction,
  changeRequestBody_Action as changeRequestBodyAction,
  // clearEditorResponseAction,
} from "redux/dashboard/action";
import _ from "lodash";
import { createRequestLink, createRequestBody } from "./helpers";
import { v4 as uuidv4 } from "uuid";
import { MidiForm, ChannelForm, PluginForm } from "./Forms";

const NodePropertiesPanel = (otherProps) => {
  const dispatch = useDispatch();
  const active_node = useSelector((state) => state.assets.active_node);
  const active_node_type = useSelector(
    (state) => state.assets.active_node_type
  );
  const selectedProperty = useSelector(
    (state) => state.assets.selected_property
  );

  const nodeElements = useSelector((state) => state.assets.nodes);

  const selectedPropertyIndex = selectedProperty[active_node_type];
  const currentPropValues = useSelector(
    (state) =>
      state.assets.node_properties[active_node_type][selectedPropertyIndex]
  );

  const lastChannelIndex = _.findLastIndex(nodeElements, {
    type: "outputNode",
  });
  const lastChannelNumber = nodeElements[lastChannelIndex].data.channel;

  const onChangeInput = React.useCallback(
    (evt) => {
      const keyValues = { [evt.target.name]: evt.target.value };
      const keyExists = Object.keys(nodeElements[active_node].data).findIndex(
        (node) => node === evt.target.name
      );

      if (keyExists !== -1) {
        dispatch(updateNodeAction(active_node, keyValues));
      }
    },
    [dispatch, active_node]
  );

  const onSliderChange = (evt, name, value, idx) => {
    const keyValues = { [name]: value };
    const keyExists = Object.keys(nodeElements[idx].data).findIndex(
      (obj) => obj === name
    );

    if (keyExists !== -1) {
      dispatch(updateNodeAction(idx, keyValues));
    }
  };

  useEffect(() => {
    if (
      Object.keys(selectedProperty).length &&
      active_node_type === "midi" &&
      typeof currentPropValues !== "undefined" &&
      _.isEmpty(currentPropValues.guid)
    ) {
      let midiRequestLink = createRequestLink(currentPropValues.midi_type);
      let midiRequestBody = createRequestBody(currentPropValues);
      createRequestLink(midiRequestLink);
      dispatch(changeRequestLinkAction(midiRequestLink));
      dispatch(changeRequestBodyAction(midiRequestBody));
    }
  }, [currentPropValues, selectedProperty, active_node_type, dispatch]);

  const addRemoveChannel = (evt, action) => {
    evt.preventDefault();
    if (action === "delete") {
      dispatch(deleteChannelAction());
    } else {
      let nodeId = uuidv4();
      const newOutputNode = {
        id: nodeId,
        type: "outputNode",
        data: {
          id: nodeId,
          channel: lastChannelNumber + 1,
          vol: -20,
          pan: 0,
        },
        position: {
          x: nodeElements[0].position.x + _.random(50, 170),
          y: nodeElements[0].position.y + _.random(50, 170),
        },
      };
      // dispatch(addChannelAction(nodeId));
      dispatch(addNodeAction(newOutputNode));
    }
  };

  let renderForm;
  if (nodeElements.length > 0 && active_node_type === "midi") {
    renderForm = (
      <MidiForm
        propValues={nodeElements[active_node].data}
        onChangeInput={onChangeInput}
      />
    );
  } else if (nodeElements.length > 0 && active_node_type === "outputNode") {
    let channelNodes = _.filter(
      nodeElements,
      (node) => node.type === "outputNode"
    );
    renderForm = (
      <ChannelForm
        channelNodes={channelNodes}
        addRemoveChannel={addRemoveChannel}
        onSliderChange={onSliderChange}
        ChannelLength={lastChannelNumber}
      />
    );
  } else if (nodeElements.length > 0 && active_node_type === "plugin") {
    renderForm = (
      <PluginForm
        propValues={nodeElements[active_node].data}
        onChangeInput={onChangeInput}
      />
    );
  }

  return (
    <div className="node_panel" {...otherProps}>
      <form noValidate autoComplete="off" style={{ paddingTop: "1rem" }}>
        {renderForm}
      </form>
    </div>
  );
};

export default NodePropertiesPanel;
