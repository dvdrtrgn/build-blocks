import * as Tone from 'tone';

export function makeMelody(volume) {
  const mainMelody = [
    { note: 'G4', duration: '8n', time: '0:0:0' },
    { note: 'F4', duration: '8n', time: '0:0:2' },
    { note: 'D4', duration: '8n', time: '0:1:0' },
    { note: 'D4', duration: '8n', time: '0:2:0' },
    { note: 'F4', duration: '8n', time: '0:2:2' },
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

  const synth2 = new Tone.Synth({
    oscillator: {
      volume: volume,
      count: 3,
      spread: 40,
      type: 'fatsawtooth',
    },
  }).toDestination();

  const melodyPart = new Tone.Part(function(time, note) {
    synth2.triggerAttackRelease(note.note, note.duration, time);
  }, mainMelody).start(0);

  return melodyPart;
}
