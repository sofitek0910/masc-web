// svg icons
import IconMidi from "../../../assets/img/midi.svg";
import IconPlugin from "../../../assets/img/plugin.svg";
import IconPatch from "../../../assets/img/patch.svg";
import IconNew from "../../../assets/img/plus.svg";
import IconLoad from "../../../assets/img/load_asset.svg";
import IconDuplicate from "../../../assets/img/duplicate_asset.svg";
import IconLike from "../../../assets/img/like_asset.svg";

export const BUTTONS = [
  {
    type: "midi",
    icon: IconMidi,
    desc: "asset",
  },
  {
    type: "plugin",
    icon: IconPlugin,
    desc: "asset",
  },
  {
    type: "patch",
    icon: IconPatch,
    desc: "asset",
  },
  {
    type: "new",
    icon: IconNew,
    desc: "asset_ops",
  },
  {
    type: "load",
    icon: IconLoad,
    desc: "asset_ops",
  },
  {
    type: "duplicate",
    icon: IconDuplicate,
    desc: "asset_ops",
  },
  {
    type: "like",
    icon: IconLike,
    desc: "asset_ops",
  },
];

export const ASSETS_SPEC = [
  {
    type: "midi",
    label: "midi",
    midi_type: "rhythm",
    guid: "",
    slot: 1,
    velocity: 60,
    note: "C3",
    rhythm: "1...1...1...1...",
  },
  {
    type: "midi",
    label: "midi",
    midi_type: "lfo",
    guid: "",
    slot: 1,
    velocity: 60,
    control_program: 2,
    offset: 0,
    interpolate_last_to_first: false,
    envelope: "1:45 34:56",
  },
  {
    type: "midi",
    label: "midi",
    midi_type: "qwerty",
    guid: "",
    slot: 1,
    velocity: 60,
    transpose: 0,
    step: 1,
    interpolate_last_to_first: false,
    qwerty_midi: "zz.qqq.sdsasafs.qq.zz",
  },
  {
    type: "plugin",
    label: "output",
    guid: "",
    plugin: "",
  },
  {
    type: "patch",
  },
];
