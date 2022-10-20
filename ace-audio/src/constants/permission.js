export const permissions = [
  /* *****************************    anonymous public routes     ******************************* */
  /*   {
    url: "/",
    permission: "anonymous",
    visibility: true,
  }, */
  {
    url: "/login",
    permission: "anonymous",
    visibility: true,
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
  },
  {
    url: "/search/patch",
    permission: "anonymous",
    visibility: true,
  },
  {
    url: "/patch/new/editor",
    permission: "anonymous",
    visibility: true,
  },

  {
    url: "/search/pattern",
    permission: "anonymous",
    visibility: true,
  },
  {
    url: "/audio/:guid",
    permission: "anonymous",
    visibility: true,
  },
  {
    url: "/patch/:guid",
    permission: "anonymous",
    visibility: true,
  },
  {
    url: "/patchv2/:guid/editor",
    permission: "anonymous",
    visibility: true,
  },
  {
    url: "/pattern/:guid",
    permission: "anonymous",
    visibility: true,
  },
  /* *****************************    authorized private routes     ******************************* */
  {
    url: "/editor",
    permission: "authorized",
    visibility: true,
  },
  {
    url: "/sequence",
    permission: "authorized",
    visibility: true,
  },
  {
    url: "/pattern",
    permission: "authorized",
    visibility: true,
  },
  {
    url: "/jwt",
    permission: "authorized",
    visibility: true,
  },
  {
    url: "/search/sequence",
    permission: "authorized",
    visibility: true,
  },
  {
    url: "/search/plugin",
    permission: "authorized",
    visibility: true,
  },
  {
    url: "/search/rhythm",
    permission: "authorized",
    visibility: true,
  },
  {
    url: "/search/transition",
    permission: "authorized",
    visibility: true,
  },
  {
    url: "/settings",
    permission: "authorized",
    visibility: true,
  },
  {
    url: "/search/asset",
    permission: "authorized",
    visibility: true,
  },
  {
    url: "/midi/:guid/editor",
    permission: "authorized",
    visibility: true,
  },
  {
    url: "/lfo/:guid/editor",
    permission: "authorized",
    visibility: true,
  },
  /* *****************************    developers private routes     ******************************* */
  {
    url: "/audio/:guid/editor",
    permission: "developers",
    visibility: true,
  },
];
