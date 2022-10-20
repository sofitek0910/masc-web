import React, { Fragment } from "react";
import {
  FormControl,
  InputLabel,
  InputBase,
  NativeSelect,
  Typography,
  Slider,
} from "@material-ui/core";
import { alpha, withStyles } from "@material-ui/core/styles";
import IconAddChannel from "../../../assets/img/add_channel.svg";
import IconDeleteChannel from "../../../assets/img/delete_channel.svg";

const MIDI_TYPE = ["", "rhythm", "lfo", "qwerty"];
// const NOTES = ["C2", "G4", "E1", "A2"];
const INTERPOLATE_LAST_TO_FIRST = [true, false];
const STEPS = [1, 2, 4, 8, 16];
const PLUGINS = [
  {
    key: "Surge.vst3",
    label: "Surge",
  },
  {
    key: "SurgeEffectsBank.vst3",
    label: "Surge Effects Bank",
  },
];

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 14,
    width: "100%",
    padding: "5px 6px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const formControlStyle = { marginBottom: ".5rem", width: "100%" };

const VolPanSlider = withStyles((theme) => ({
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  thumb: {
    "&:hover": {
      outline: "solid 2px #ffffff",
      boxShadow: "none",
    },
  },
}))(Slider);

export const MidiForm = ({ propValues, onChangeInput }) => {
  return (
    <Fragment>
      <FormControl style={formControlStyle}>
        <InputLabel shrink htmlFor="native-select">
          MIDI Type
        </InputLabel>
        <NativeSelect
          size="small"
          fullWidth
          name="midi_type"
          value={propValues.midi_type}
          onChange={onChangeInput}
          input={<BootstrapInput />}
        >
          {MIDI_TYPE.map((midi, key) => (
            <option key={`id-${key}`} value={midi}>
              {midi}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      {propValues.midi_type === "rhythm" && (
        <Fragment>
          <FormControl style={formControlStyle}>
            <InputLabel shrink htmlFor="native-select">
              Velocity
            </InputLabel>
            <BootstrapInput
              size="small"
              fullWidth
              name="velocity"
              value={propValues.velocity}
              onChange={onChangeInput}
            />
          </FormControl>
          <FormControl style={formControlStyle}>
            <InputLabel shrink htmlFor="native-select">
              Note
            </InputLabel>
            <BootstrapInput
              size="small"
              fullWidth
              name="note"
              value={propValues.note}
              onChange={onChangeInput}
            />
          </FormControl>
          <FormControl style={formControlStyle}>
            <InputLabel shrink htmlFor="native-select">
              Rhythm
            </InputLabel>
            <BootstrapInput
              name="rhythm"
              value={propValues.rhythm}
              onChange={onChangeInput}
              size="small"
            />
          </FormControl>
        </Fragment>
      )}

      {propValues.midi_type === "lfo" && (
        <Fragment>
          <FormControl style={formControlStyle}>
            <InputLabel shrink htmlFor="native-select">
              Velocity
            </InputLabel>
            <BootstrapInput
              name="velocity"
              size="small"
              value={propValues.velocity}
              onChange={onChangeInput}
            />
          </FormControl>
          <FormControl style={formControlStyle}>
            <InputLabel shrink htmlFor="native-select">
              control program
            </InputLabel>
            <BootstrapInput
              name="control_program"
              value={propValues.control_program}
              onChange={onChangeInput}
              size="small"
            />
          </FormControl>

          <FormControl style={formControlStyle}>
            <InputLabel shrink htmlFor="native-select">
              offset (PPS)
            </InputLabel>
            <BootstrapInput
              name="offset"
              value={propValues.offset}
              onChange={onChangeInput}
              size="small"
            />
          </FormControl>

          <FormControl style={formControlStyle}>
            <InputLabel shrink htmlFor="native-select">
              Interpolate_last_to_first
            </InputLabel>
            <NativeSelect
              size="small"
              name="interpolate_last_to_first"
              value={propValues.interpolate_last_to_first}
              onChange={onChangeInput}
              input={<BootstrapInput />}
            >
              {INTERPOLATE_LAST_TO_FIRST.map((item, key) => (
                <option key={`id-${key}`}>{item.toString()}</option>
              ))}
            </NativeSelect>
          </FormControl>

          <FormControl style={formControlStyle}>
            <InputLabel shrink htmlFor="native-select">
              Envelope
            </InputLabel>
            <BootstrapInput
              multiline
              name="envelope"
              value={propValues.envelope}
              onChange={onChangeInput}
              rows={4}
            />
          </FormControl>
        </Fragment>
      )}

      {propValues.midi_type === "qwerty" && (
        <Fragment>
          <FormControl style={formControlStyle}>
            <InputLabel shrink htmlFor="native-select">
              Velocity
            </InputLabel>
            <BootstrapInput
              size="small"
              name="velocity"
              value={propValues.velocity}
              onChange={onChangeInput}
            />
          </FormControl>
          <FormControl style={formControlStyle}>
            <InputLabel shrink htmlFor="native-select">
              Transpose
            </InputLabel>
            <BootstrapInput
              name="transpose"
              value={propValues.transpose}
              onChange={onChangeInput}
              size="small"
            />
          </FormControl>

          <FormControl style={formControlStyle}>
            <InputLabel shrink htmlFor="native-select">
              STEP
            </InputLabel>
            <NativeSelect
              size="small"
              name="step"
              value={propValues.step}
              onChange={onChangeInput}
              input={<BootstrapInput />}
            >
              {STEPS.map((step, key) => (
                <option key={`id-${key}`} value={step}>
                  {step}
                </option>
              ))}
            </NativeSelect>
          </FormControl>

          <FormControl style={formControlStyle}>
            <InputLabel shrink htmlFor="native-select">
              QWERTY MIDI
            </InputLabel>
            <BootstrapInput
              name="qwerty_midi"
              value={propValues.qwerty_midi}
              onChange={onChangeInput}
              size="small"
            />
          </FormControl>
        </Fragment>
      )}
    </Fragment>
  );
};

export const ChannelForm = ({
  channelNodes,
  addRemoveChannel,
  onSliderChange,
  ChannelLength,
}) => {
  return (
    <Fragment>
      <div className="channel_properties_wrapper">
        <button
          className="channel_button"
          onClick={(ev) => addRemoveChannel(ev, "delete")}
        >
          <img alt="" src={IconDeleteChannel} />
        </button>
        <div className="channel_number_wrapper">
          <FormControl>
            <BootstrapInput
              size="small"
              fullWidth
              name="number_of_channels"
              value={ChannelLength}
              readOnly
            />
          </FormControl>
        </div>
        <button
          className="channel_button"
          onClick={(ev) => addRemoveChannel(ev, "add")}
        >
          <img alt="" src={IconAddChannel} />
        </button>
      </div>
      {/* slider */}

      {channelNodes.map((node, idx) => {
        let { data } = node;
        return (
          <Fragment>
            <hr />

            <div className="channel_label_value_wrapper">
              <Typography variant="body2">Volume</Typography>
              <span>{data.vol}</span>
            </div>
            <div className="channel_volpan_wrapper">
              <VolPanSlider
                name="vol"
                value={data.vol}
                min={-70}
                max={-10}
                onChange={(evt, value) =>
                  onSliderChange(evt, "vol", value, idx)
                }
              />
            </div>

            <div className="channel_label_value_wrapper">
              <Typography variant="body2">Pan</Typography>
              <span>{data.pan}</span>
            </div>
            <div className="channel_volpan_wrapper">
              <VolPanSlider
                name="pan"
                value={data.pan}
                min={-64}
                max={60}
                onChange={(evt, value) =>
                  onSliderChange(evt, "pan", value, idx)
                }
              />
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export const PluginForm = ({ propValues, onChangeInput }) => {
  return (
    <Fragment>
      <FormControl style={formControlStyle}>
        <InputLabel shrink htmlFor="native-select">
          Plugins
        </InputLabel>
        <NativeSelect
          size="small"
          fullWidth
          name="plugin"
          value={propValues.plugin}
          onChange={onChangeInput}
          input={<BootstrapInput />}
        >
          <option value=""></option>
          {PLUGINS.map((plugin, key) => (
            <option key={`id-${key}`} value={plugin.key}>
              {plugin.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Fragment>
  );
};
