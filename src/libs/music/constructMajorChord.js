/*global define, */
define([], function() {
  'use strict';

  const SCALE = {
    AMinor: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  };

  const addOctaveNumbers = (scale, octaveNumber) =>
    scale.map(note => {
      const firstOctaveNoteIndex =
        scale.indexOf('C') !== -1 ? scale.indexOf('C') : scale.indexOf('C#');
      const lower = scale.indexOf(note) < firstOctaveNoteIndex;
      const noteOctaveNumber = lower ? octaveNumber - 1 : octaveNumber;
      return `${note}${noteOctaveNumber}`;
    });

  const constructMajorChord = (scaleName, octave, rootNote) => {
    const scale = SCALE[scaleName];
    const scaleWithOctave = addOctaveNumbers(scale, octave);

    const getNextChordNote = (note, nextNoteNumber) => {
      const nextNoteInScaleIndex =
        scaleWithOctave.indexOf(note) + nextNoteNumber - 1;
      let nextNote;
      if (typeof scaleWithOctave[nextNoteInScaleIndex] !== 'undefined') {
        nextNote = scaleWithOctave[nextNoteInScaleIndex];
      } else {
        nextNote = scaleWithOctave[nextNoteInScaleIndex - 7];
        const updatedOctave = parseInt(nextNote.slice(1)) + 1;
        nextNote = `${nextNote.slice(0, 1)}${updatedOctave}`;
      }

      return nextNote;
    };

    const thirdNote = getNextChordNote(rootNote, 3);
    const fifthNote = getNextChordNote(rootNote, 5);
    const chord = [rootNote, thirdNote, fifthNote];

    return chord;
  };

  return constructMajorChord;
});
