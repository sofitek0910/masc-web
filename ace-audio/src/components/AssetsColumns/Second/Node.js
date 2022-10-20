import React, { memo } from "react";
import IconMidi from "../../../assets/img/midi.svg";
import IconPatch from "../../../assets/img/patch.svg";
import IconPlugin from "../../../assets/img/plugin.svg";
import IconChannelSpeaker from "../../../assets/img/channel_speaker.svg";
import _ from "lodash";
import { Handle } from "react-flow-renderer";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import { canConnectNodes } from "../../../utilities/helper/helper";

const LoadingSlot = ({ isLoading, size }) =>
  isLoading && (
    <CircularProgress
      disableShrink
      size={`${size === "large" ? "2rem" : ".6rem"} `}
      style={{
        marginRight: ".2rem",
        color: "white",
      }}
    />
  );

export const MidiNode = memo(({ data, isConnectable }) => {
  const isLoading = useSelector((state) => state.dashboard.loading);
  const active_node = useSelector((state) => state.assets.active_node);
  const currentElem = useSelector((state) => state.assets.nodes[active_node]);
  const nodeElements = useSelector((state) => state.assets.nodes);

  return (
    <div className="node_midi_wrapper">
      {isLoading && currentElem.id === data.id && (
        <div className="node_loader_overlay">
          <LoadingSlot isLoading={true} size="large" />
          <span style={{ color: "white" }}>Saving asset...</span>
        </div>
      )}
      <div className="node_header">
        <img alt="" src={IconMidi} className="node_icon" />
        <div className="node_guid">
          {isLoading && _.isEmpty(data.guid) ? (
            <>
              <LoadingSlot isLoading={isLoading} />
              <span>saving asset ...</span>
            </>
          ) : _.isEmpty(data.guid) ? (
            "unsaved"
          ) : (
            data.guid
          )}
        </div>
      </div>
      <div className="node_body">{`${data.label}`}</div>
      <div className="node_footer">
        <div className="node_guid">{`Slot #${data.slot}`}</div>
      </div>
      <Handle
        type="source"
        position="bottom"
        id="midi"
        isConnectable={isConnectable}
        className="handle_midi_source"
        isValidConnection={(params) => canConnectNodes(params, nodeElements)}
      />
    </div>
  );
});

export const PluginNode = ({ data, isConnectable }) => {
  const { label } = data;
  const nodeElements = useSelector((state) => state.assets.nodes);
  return (
    <div className="node_plugin_wrapper">
      <div className="node_header">
        <img alt="" src={IconPlugin} className="node_icon" />
        <div className="node_guid">
          {_.isEmpty(data.guid) ? "unsaved" : data.guid}
        </div>
      </div>
      <div className="node_body">{label}</div>
      <div className="node_footer">
        <div className="node_guid mr-3">Instrument</div>
        <div className="node_guid">
          {data.plugin !== "" ? data.plugin : "EMPTY"}
        </div>
      </div>
      <Handle
        type="target"
        position="top"
        id="plugin_target_top"
        className="handle_plugin_target_top"
      />

      <Handle
        type="target"
        position="left"
        id="plugin_target_left"
        className="handle_in"
      >
        <div style={{}}>IN</div>
      </Handle>
      <Handle
        type="source"
        position="right"
        id="plugin_output_right"
        className="handle_out"
        isValidConnection={(params) => canConnectNodes(params, nodeElements)}
      >
        OUT
      </Handle>
      <Handle
        type="target"
        position="bottom"
        id="plugin_target_bottom"
        isConnectable={isConnectable}
        className="handle_plugin_target_bottom"
      />
    </div>
  );
};

export const PatchNode = ({ data, isConnectable }) => {
  const nodeElements = useSelector((state) => state.assets.nodes);
  return (
    <div className="node_patch_wrapper">
      <div className="node_header">
        <img alt="" src={IconPatch} className="node_icon" />
        <div className="node_guid">{_.toUpper(data.guid)}</div>
      </div>
      <div className="node_body">{data.label}</div>
      <Handle
        type="source"
        position="top"
        id="patch"
        className="handle_patch_source_top"
        isValidConnection={(params) => canConnectNodes(params, nodeElements)}
      />
    </div>
  );
};

export const OutputNode = ({ data, isConnectable }) => {
  return (
    <div className="node_output_wrapper">
      <div className="node_header">
        <img alt="" src={IconChannelSpeaker} className="node_icon" />
        <div className="control_wrapper">
          <div className="volume_wrapper">
            <div className="control_elem mr-3">
              <span>vol</span>
            </div>
            <div className="control_elem">
              <span>{data.vol}</span>
            </div>
          </div>
          <div className="pan_wrapper">
            <div className="control_elem mr-3">
              <span>pan</span>
            </div>
            <div className="control_elem">
              <span>{data.pan}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="node_body"></div>
      <div className="node_footer">
        <div className="channel_name mr-3">{`CH ${data.channel}`}</div>
      </div>
      <Handle
        type="target"
        position="left"
        id="output_target_left"
        isConnectable={isConnectable}
        onConnect={(params) => console.log("handle onConnect", params)}
        className="handle_output_target_left"
      />
    </div>
  );
};
