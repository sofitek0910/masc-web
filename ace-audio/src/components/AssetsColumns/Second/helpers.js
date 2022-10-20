import settings from "settings";
import yaml from "js-yaml";

export const createRequestBody = (property) => {
  switch (property.midi_type) {
    case "rhythm": {
      return yaml.dump({
        apiVersion: 2,
        kind: "com.musicascode.midi.track",
        metadata: {
          pps: 24,
          tempo: 126.25,
          numerator: 4,
          denominator: 4,
          velocity: parseInt(property.velocity),
          bars: 4,
        },
        spec: {
          track: {
            [property.note]: property.rhythm,
          },
        },
      });
    }
    case "lfo": {
      const envelopes = property.envelope.trimEnd().split(" ");
      const envObj = {};
      envelopes.map((env) => {
        let as = env.split(":");
        let asKey = parseInt(as[0]);
        envObj[asKey] = parseInt(as[1]);
      });

      return yaml
        .dump({
          apiVersion: 2,
          kind: "com.musicascode.midi.lfo.linear",
          metadata: {
            pps: 24,
            tempo: 126.25,
            numerator: 4,
            denominator: 4,
            velocity: parseInt(property.velocity),
            bars: 4,
          },
          spec: {
            offset_pps: parseInt(property.offset),
            interpolate_last_to_first: property.interpolate_last_to_first,
            control: parseInt(property.control_program),
            envelope: envObj,
          },
        })
        .replaceAll("'", "");
    }
    case "qwerty": {
      return yaml.dump({
        apiVersion: 2,
        kind: "com.musicascode.midi.track",
        metadata: {
          pps: 24,
          tempo: 126.25,
          numerator: 4,
          denominator: 4,
          velocity: parseInt(property.velocity),
          transpose: parseInt(property.transpose),
          step: parseInt(property.step),
        },
        spec: {
          track: property.qwerty_midi,
        },
      });
    }

    default:
      return ``;
  }
};

export const createRequestFactoryAudioBody = (channels) => {
  return yaml.dump(
    {
      apiVersion: 3,
      kind: "com.musicascode.factory.audio",
      metadata: {
        tempo: 126.25,
        numerator: 4,
        denominator: 4,
        bars: 4,
      },
      spec: {
        offset16th: 0,
        channel: channels,
      },
    },
    {
      noRefs: true,
    }
  );
};

export const createRequestLink = (requestType) => {
  switch (requestType) {
    case "rhythm":
      return `${settings.jgenApiUrl}/factory/midi`;
    case "lfo":
      return `${settings.jgenApiUrl}/factory/lfo`;
    case "qwerty":
      return `${settings.jgenApiUrl}/factory/midi/qwerty`;
    case "audioFactory":
      return `${settings.jgenApiUrl}/factory/audio`;
    default:
      return ``;
  }
};
