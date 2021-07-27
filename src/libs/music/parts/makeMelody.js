import * as Tone from 'tone';

export function makeMelody(volume) {
  const vol = new Tone.Volume(volume).toDestination();

  const data = [
    { note: 'G4', time: '0:0:0', duration: '8n' },
    { note: 'F4', time: '0:0:2', duration: '8n' },
    { note: 'D4', time: '0:1:0', duration: '8n.' },
    { note: 'D4', time: '0:2:0', duration: '8n' },
    { note: 'F4', time: '0:2:2', duration: '8n.' },
    { note: 'G4', time: '0:3:0', duration: '8n' },
    { note: 'A4', time: '0:3:2', duration: '2n' },
    { note: 'A4', time: '2:0:0', duration: '8n' },
    { note: 'G4', time: '2:0:2', duration: '8n' },
    { note: 'F4', time: '2:1:0', duration: '8n' },
    { note: 'A4', time: '2:2:0', duration: '8n' },
    { note: 'G4', time: '2:2:2', duration: '8n' },
    { note: 'E4', time: '2:3:0', duration: '8n' },
    { note: 'F4', time: '2:3:2', duration: '2n' },
    { note: 'G4', time: '4:0:0', duration: '8n' },
    { note: 'F4', time: '4:0:2', duration: '8n' },
    { note: 'D4', time: '4:1:0', duration: '8n' },
    { note: 'F4', time: '4:2:0', duration: '8n' },
    { note: 'A4', time: '4:2:2', duration: '8n' },
    { note: 'G4', time: '4:3:0', duration: '8n' },
    { note: 'A4', time: '4:3:2', duration: '2n' },
    { note: 'G4', time: '5:2:2', duration: '8n' },
    { note: 'A4', time: '5:3:0', duration: '8n' },
    { note: 'B4', time: '5:3:2', duration: '8n' },
    { note: 'C5', time: '6:0:0', duration: '8n' },
    { note: 'B4', time: '6:1:0', duration: '8n' },
    { note: 'A4', time: '6:1:2', duration: '8n' },
    { note: 'B4', time: '6:2:0', duration: '8n' },
    { note: 'A4', time: '6:2:2', duration: '8n' },
    { note: 'G4', time: '6:3:0', duration: '8n' },
    { note: 'A4', time: '6:3:2', duration: '1n' },
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
