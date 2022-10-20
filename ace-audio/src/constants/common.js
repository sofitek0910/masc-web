import { Circle as IconCircle } from "react-bootstrap-icons";

export const LIST_BPM = ["110.00", "126.25"];

export const LIST_CATEGORY = [
  "FULL",
  "KICK",
  "SNARE",
  "TOP",
  "STAB",
  "RISE",
  "BASS",
  "LEAD-SOFT",
  "LEAD-HARD",
  "ARP",
  "FX",
];

export const LIST_KEY_SIGNATURE = [
  "A",
  "A♯m",
  "A♭",
  "A♭m",
  "Am",
  "B",
  "B♭",
  "B♭m",
  "Bm",
  "C",
  "C♯",
  "C♯m",
  "C♭",
  "Cm",
  "D",
  "D♯m",
  "D♭",
  "E",
  "E♭",
  "E♭m",
  "F",
  "F♯",
  "F♯m",
  "Fm",
  "G",
  "G♯m",
  "G♭",
  "Gm",
];

export const TRACKING_EVENT = {
  ASSET_PLAYER_STOP: "ASSET_PLAYER_STOP",
  PATTERN_PLAYER_STOP: "PATTERN_PLAYER_STOP",
};

// User groups
export const GROUP_DEVELOPERS = "developers";

// created temporary to help show the library routes
export const LIBRARIES_PAGE_NAVBAR_ITEMS = [
  {
    key: "/asset",
    val: "asset",
    icon: IconCircle,
  },
  {
    key: "/midi",
    val: "midi",
    icon: IconCircle,
  },
  {
    key: "/pattern",
    val: "pattern",
    icon: IconCircle,
  },
];

// use in library editor tabs
export const LIBRARIES_EDITOR_TABS = [
  {
    key: "json",
    label: "json",
    editorMode: "json",
  },
  {
    key: "text",
    label: "csv",
    editorMode: "text",
  },
  {
    key: "text",
    label: "input",
    editorMode: "io",
  },
];
