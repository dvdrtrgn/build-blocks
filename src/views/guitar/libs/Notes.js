const NOTES = 'C C# D D# E F F# G G# A A# B'.split(' ');

export default {
  nameFromMidi: function(num) {
    let mid = Number(num);
    let oct = -1;

    if (mid < 12) {
      throw 'too low';
    } else if (mid > 119) {
      throw 'too high';
    } else {
      while (mid > 11) {
        oct += 1;
        mid -= 12;
      }
    }
    return NOTES[mid] + oct;
  },
  midiFromName: function(str) {
    const sci = String(str);
    const nom = sci.slice(0, -1);
    const oct = Number(sci.slice(-1));
    const num = NOTES.indexOf(nom);
    const mid = 12 * (oct + 1) + num;

    if (mid < 12) throw 'too low';
    else if (mid > 119) throw 'too high';

    return mid;
  },
  detab: function(str) {
    let sci = str;
    let arr = sci.split('+');
    let fret = 0;
    let midi = 0;

    if (arr.length > 1) {
      sci = arr[0];
      fret = Number(arr[1]);
    }
    midi = this.midiFromName(sci) + fret;

    return {
      raw: str,
      sci: this.nameFromMidi(midi),
      midi: midi,
      fret: fret,
    };
  },
};
