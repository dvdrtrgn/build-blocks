import ScaleNotes from './scaleNotes.js';

// 0 is a sort of rest

// prettier-ignore
const Songs = {
  diatonic: [
    1, 2, 3, 4, 5, 6, 7, 8,
  ],
  gary: [
    3, 2, 1, 2,   3, 3, 3, 0,
    4, 5, 0, 6,   0, 7, 8
  ],
  mary: [
    // rooted on first note -- mary in C major, would need E phrygian
    3, 2, 1, 2,   3, 3, 3, 0,
    2, 2, 2, 0,   3, 5, 5, 0,
    3, 2, 1, 2,   3, 3, 3, 3,
    2, 2, 3, 2,   1
    // rooted on key (last) note -- mary in C major, would need C ionian
  ],
  bonnie: [
    1, 6, 5, 4,   5, 4, 2, 1,   -2
  ],
  twinkle: [
    1, 1, 5, 5,   6, 6, 5, 0,
    4, 4, 3, 3,   2, 2, 1, 0,
    5, 5, 4, 4,   3, 3, 2, 0,
    // 5, 5, 4, 4,   3, 3, 2, 0,
    // 1, 1, 5, 5,   6, 6, 5, 0,
    4, 4, 3, 3,   2, 2, 1, 0,
  ],
  wetta: [
    1, 0, 2, 3,   0, 3, 0, 2,
    1, 2, 3, 1,   0, -3, 0,
  ],
  doe: [
    1, 0, 2, 3, 0, 1, 3, 0, 1, 0, 3, 0, 0,
    2, 0, 3, 4, 4, 3, 2, 4, 0, 0,
    3, 0, 4, 5, 0, 3, 5, 0, 3, 0, 5, 0,
    4, 0, 5, 6, 6, 5, 4, 6, 0,
    5, 0, 1, 2, 3, 4, 5, 6, 0,
    6, 0, 2, 3, 4, 5, 6, 7, 0,
    7, 0, 3, 4, 5, 6, 7, 8, 0,
    8, 7, 6, 0, 4, 0, 7, 0, 5, 0,
    8, 7, 6, 5, 4, 3, 2, 1, 0,
  ],
};

function getIvalsFor(songname = 'mary') {
  return Songs[songname].slice();
}

function getNotesFor(songname = 'mary', modename = 'ionian') {
  let song = getIvalsFor(songname);
  let scaleFactory = ScaleNotes.modelScale(modename);

  let list = song.map((e) => {
    return scaleFactory(e);
  });

  return list;
}

export default {
  names: Object.keys(Songs),
  getIvalsFor,
  getNotesFor,
};
