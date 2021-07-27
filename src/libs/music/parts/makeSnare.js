import * as Tone from 'tone';

export function makeSnare(volume) {
  const vol = new Tone.Volume(volume).toDestination();

  const lowPass = new Tone.Filter({
    frequency: 8000,
  });

  const synth = new Tone.NoiseSynth({
    noise: {
      type: 'white',
      playbackRate: 3,
    },
    envelope: {
      attack: 0.001,
      decay: 0.2,
      sustain: 0.15,
      release: 0.03,
    },
  })
    .connect(lowPass)
    .connect(vol);

  const data = [
    { time: '0:2' },
    { time: '1:2' },
    { time: '2:2' },
    { time: '3:2' },
    { time: '4:2' },
    { time: '5:2' },
    { time: '6:2' },
    { time: '7:2' },
  ];

  const addPart = () => {
    return new Tone.Part(function(time) {
      try {
        synth.triggerAttackRelease('4n', time);
      } catch (err) {
        console.log(err.message);
      }
    }, data).start(0);
  };

  return { data, synth, vol, addPart };
}
