import * as Tone from 'tone';

export function makeKick(volume) {
  const vol = volume;

  const data = [
    { time: '0:0:0' },
    { time: '0:3:2' },
    { time: '1:1:0' },
    { time: '2:0:0' },
    { time: '2:1:2' },
    { time: '2:3:2' },
    { time: '3:0:2' },
    { time: '3:1:0' },
    { time: '4:0:0' },
    { time: '4:3:2' },
    { time: '5:1:0' },
    { time: '6:0:0' },
    { time: '6:1:2' },
    { time: '6:3:2' },
    { time: '7:0:2' },
    { time: '7:1:0' },
  ];

  const synth = new Tone.MembraneSynth({
    // volume: volume,
  });

  const trigger = (time, value) => {
    synth.triggerAttackRelease('C1', '8n', time);
    void value;
  };

  return { data, synth, vol, trigger };
}
