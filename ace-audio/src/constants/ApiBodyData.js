export const midi = [
`apiVersion: 2
kind: com.musicascode.midi.track
metadata:
  pps: 24
  tempo: 126.25
  numerator: 4
  denominator: 4
  velocity: 60
  bars: 4
spec:
  track:
    C3: 1...1...1...1...`,
];

export const audio = [
`apiVersion: 2
kind: com.musicascode.factory.audio
metadata:
  tempo: 126.25
  numerator: 4
  denominator: 4
  bars: 4
spec:      
  tracks:
    - midi: 5CF11FC7C8504B6FBC26B4D164026C30
      instrument: OB-Xd.vst3
      channel: 1
    - midi: 47082127233A4579A4A988E27056028A
      instrument: MEqualizer.vst3
      channel: 1
    - midi: AA082127233A4579A4A988E27056028A
      instrument: AAAAA.vst3
      channel: 1
    - midi: 5CF11FC7C8504B6FBC26B4D164026C30
      instrument: BBBBBBB.vst3
      channel: 2
    - midi: 47082127233A4579A4A988E27056028A
      instrument: CCCCCCC.vst3
      channel: 2
    - midi: AA082127233A4579A4A988E27056028A
      instrument: DDDDDDD.vst3
      channel: 3
    
mix:
  - channel: 1
    volume: -24
    pan: -50`,
];

export const lfo = [
`apiVersion: 2
kind: com.musicascode.midi.lfo.linear
metadata:
  pps: 24
  tempo: 126.25
  numerator: 4
  denominator: 4
  velocity: 60
  bars: 4
spec:
  offset_pps: 0
  interpolate_last_to_first: true
  control: 2
  envelope:
    1: 50
    25: 80
    45: 40`,
];
