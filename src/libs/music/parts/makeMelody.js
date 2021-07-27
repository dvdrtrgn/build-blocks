import * as Tone from 'tone';

export function makeMelody(volume) {
  const vol = new Tone.Volume(volume).toDestination();

  const data = [
    { note: 'G4', duration: '8n', time: '0:0:0' },
    { note: 'F4', duration: '8n', time: '0:0:2' },
    { note: 'D4', duration: '8n.', time: '0:1:0' },
    { note: 'D4', duration: '8n', time: '0:2:0' },
    { note: 'F4', duration: '8n.', time: '0:2:2' },
    { note: 'G4', duration: '8n', time: '0:3:0' },
    { note: 'A4', duration: '2n', time: '0:3:2' },
    { note: 'A4', duration: '8n', time: '2:0:0' },
    { note: 'G4', duration: '8n', time: '2:0:2' },
    { note: 'F4', duration: '8n', time: '2:1:0' },
    { note: 'A4', duration: '8n', time: '2:2:0' },
    { note: 'G4', duration: '8n', time: '2:2:2' },
    { note: 'E4', duration: '8n', time: '2:3:0' },
    { note: 'F4', duration: '2n', time: '2:3:2' },
    { note: 'G4', duration: '8n', time: '4:0:0' },
    { note: 'F4', duration: '8n', time: '4:0:2' },
    { note: 'D4', duration: '8n', time: '4:1:0' },
    { note: 'F4', duration: '8n', time: '4:2:0' },
    { note: 'A4', duration: '8n', time: '4:2:2' },
    { note: 'G4', duration: '8n', time: '4:3:0' },
    { note: 'A4', duration: '2n', time: '4:3:2' },
    { note: 'G4', duration: '8n', time: '5:2:2' },
    { note: 'A4', duration: '8n', time: '5:3:0' },
    { note: 'B4', duration: '8n', time: '5:3:2' },
    { note: 'C5', duration: '8n', time: '6:0:0' },
    { note: 'B4', duration: '8n', time: '6:1:0' },
    { note: 'A4', duration: '8n', time: '6:1:2' },
    { note: 'B4', duration: '8n', time: '6:2:0' },
    { note: 'A4', duration: '8n', time: '6:2:2' },
    { note: 'G4', duration: '8n', time: '6:3:0' },
    { note: 'A4', duration: '1n', time: '6:3:2' },
  ];

  const synth = new Tone.Synth({
    oscillator: {
      count: 3,
      spread: 40,
      type: 'fatsawtooth',
    },
  }).connect(vol);

  const addPart = () => {
    return new Tone.Part(function(time, value) {
      try {
        synth.triggerAttackRelease(value.note, value.duration, time);
      } catch (err) {
        console.log(err.message);
      }
    }, data).start(0);
  };

  return { data, synth, vol, addPart };
}
