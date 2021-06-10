const NOTES = 'C C# D D# E F F# G G# A A# B'.split(' ');

export default {
  sciNoteFromMidiNum: function(num) {
    var mid = Number(num);
    var oct = -1;

    if (mid < 12) throw 'too low';
    else if (mid > 119) throw 'too high';
    else while (mid > 11) (oct += 1), (mid -= 12);

    return NOTES[mid] + oct;
  },
  midiNumFromSciNote: function(str) {
    var sci = String(str);
    var nom = sci.slice(0, -1);
    var oct = Number(sci.slice(-1));
    var num = NOTES.indexOf(nom);
    var mid = 12 * (oct + 1) + num;

    if (mid < 12) throw 'too low';
    else if (mid > 119) throw 'too high';

    return mid;
  },
  detab: function(str) {
    var sci = str;
    var arr = sci.split('+');
    var off = 0;
    var mid = 0;

    if (arr.length > 1) {
      sci = arr[0];
      off = Number(arr[1]);
    }
    mid = this.midiNumFromSciNote(sci) + off;

    return {
      raw: str,
      sci: this.sciNoteFromMidiNum(mid),
      mid: mid,
    };
  },
};
