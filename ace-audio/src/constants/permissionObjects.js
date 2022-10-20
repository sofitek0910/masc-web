export const permissionObjects = {
  AssetStar: [
    /* *****************************    authorized private routes     ******************************* */
    {
      url: "/search/audio",
      permission: "authorized",
      visibility: true,
    },
    /* *****************************    anonymous public routes     ******************************* */
    {
      url: "/search/assets",
      permission: "anonymous",
      visibility: false,
    },
    {
      url: "/search/audio",
      permission: "anonymous",
      visibility: true,
    },
    {
      url: "/search/midi",
      permission: "anonymous",
      visibility: true,
    },
    {
      url: "/search/audio",
      permission: "developers",
      visibility: true,
    },
    {
      url: "/midi/:guid",
      permission: "anonymous",
      visibility: true,
    }
  ],
  Pattern: [
    /* *****************************    authorized private routes     ******************************* */
    {
      url: "/search/audio",
      permission: "authorized",
      visibility: true,
    },
    /* *****************************    anonymous public routes     ******************************* */
    {
      url: "/search/assets",
      permission: "anonymous",
      visibility: false,
    },
    {
      url: "/search/audio",
      permission: "anonymous",
      visibility: true,
    },
    {
      url: "/search/midi",
      permission: "anonymous",
      visibility: true,
    },
    {
      url: "/midi/:guid",
      permission: "anonymous",
      visibility: true,
    }
  ],
  ViewHeader: [
    {
      url: "",
      permission: "anonymous",
      visibility: true,
      component: "ViewHeader",
      name: "AUDIO",
      groups: [],
      web: true,
      mobile: false,
    },
    {
      url: "",
      permission: "developers",
      visibility: true,
      component: "ViewHeader",
      name: "PLUGIN",
      groups: ["web-dev"],
      web: true,
      mobile: false,
    },
    {
      url: "",
      permission: "developers",
      visibility: true,
      component: "ViewHeader",
      name: "PATCH",
      groups: ["web-dev"],
      web: true,
      mobile: false,
    },
    {
      url: "",
      permission: "developers",
      visibility: true,
      component: "ViewHeader",
      name: "MIDI",
      groups: ["web-dev"],
      web: true,
      mobile: false,
    },
    {
      url: "",
      permission: "developers",
      visibility: true,
      component: "ViewHeader",
      name: "RHYTHM",
      groups: ["web-dev"],
      web: true,
      mobile: false,
    },
    {
      url: "",
      permission: "developers",
      visibility: true,
      component: "ViewHeader",
      name: "PATTERN",
      groups: ["web-dev"],
      web: true,
      mobile: false,
    },
    {
      url: "",
      permission: "developers",
      visibility: true,
      component: "ViewHeader",
      name: "TRANSITION",
      groups: ["web-dev"],
      web: true,
      mobile: false,
    },
    {
      url: "",
      permission: "developers",
      visibility: true,
      component: "ViewHeader",
      name: "SEQUENCE",
      groups: ["web-dev"],
      web: true,
      mobile: false,
    },
  ],
};
