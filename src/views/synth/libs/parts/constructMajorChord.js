const SCALE = {
  AMinor: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ],
};

const addOctaveNums = (scale, octaveNum) =>
  scale.map(note => {
    let cIndex = scale.indexOf('C');
    cIndex = cIndex !== -1 ? cIndex : scale.indexOf('C#');

    const lower = scale.indexOf(note) < cIndex;
    const noteOctaveNum = lower ? octaveNum - 1 : octaveNum;

    return `${note}${noteOctaveNum}`;
  });

const constructMajorChord = (scaleName, octave, rootNote) => {
  const scale = SCALE[ scaleName ];

  const scaleWithOctave = addOctaveNums(scale, octave);

  const getNextChordNote = (note, nextNoteNum) => {
    const nextNoteIndex = scaleWithOctave.indexOf(note) + nextNoteNum - 1;
    let nextNote;

    if (typeof scaleWithOctave[ nextNoteIndex ] !== 'undefined') {
      nextNote = scaleWithOctave[ nextNoteIndex ];
    } else {
      nextNote = scaleWithOctave[ nextNoteIndex - 7 ];
      const updatedOctave = parseInt(nextNote.slice(1)) + 1;
      nextNote = `${nextNote.slice(0, 1)}${updatedOctave}`;
    }

    return nextNote;
  };

  const thirdNote = getNextChordNote(rootNote, 3);
  const fifthNote = getNextChordNote(rootNote, 5);

  const chord = [ rootNote, thirdNote, fifthNote ];

  return chord;
};

export default constructMajorChord;
