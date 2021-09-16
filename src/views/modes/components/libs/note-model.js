import MidiModel from './midi-model.js';

// take standard name (or number) and reveal the properies
const fromNumber = (num) => MidiModel.getName(num);

function makeTag(parts) {
  const rest = parts.name === '_';
  const nom = rest ? '.' : `<b>${parts.name}</b>`;
  const sup = parts.sharp ? `<sup>♯</sup>` : '';
  const sub = parts.octave ? `<sub>${parts.octave}</sub>` : '';

  return `<span class="notation">${nom}${sup}${sub}</span>`;
}

export default class NoteModel {
  constructor(arg = 'C4') {
    let rest = arg === '_';
    if (typeof arg === 'number') arg = fromNumber(arg);

    let match = arg.match(/^([A-G])(#)?(-?\d)$/);
    if (!match && !rest) throw `NoteModel, bad note ${arg}`;
    if (rest) match = ['_', '_', false, null];

    this.name = arg;
    this.midi = MidiModel.getNumber(arg);
    this.parts = {
      name: match[1],
      sharp: Boolean(match[2]),
      octave: Number(match[3]),
    };

    this.html = makeTag(this.parts);
  }
}
