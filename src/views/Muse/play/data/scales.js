export default {
  // major
  ionian: [0, 2, 2, 1, 2, 2, 2, 1],
  lydian: [0, 2, 2, 2, 1, 2, 2, 1],
  myxolydian: [0, 2, 2, 1, 2, 2, 1, 2],
  // minor
  dorian:   [0, 2, 1, 2, 2, 2, 1, 2],
  phrygian: [0, 1, 2, 2, 2, 1, 2, 2],
  aeolian:  [0, 2, 1, 2, 2, 1, 2, 2],
  // variants
  locrian:  [0, 1, 2, 2, 1, 2, 2, 2],
  harmonic: [0, 2, 1, 2, 2, 1, 3, 1],
  melodic:  [0, 2, 1, 2, 2, 2, 2, 1],
  // dbl harmonic
  arabic: [0, 1, 3, 1, 2, 1, 3, 1],
  gypsy:  [0, 2, 1, 3, 1, 1, 3, 1],
  // blue
  blues:  [0, 3, 2, 2, 3, 2],
  blues1: [0, 3, 2, 1, 1, 3, 2],
  blues2: [0, 3, 2, 1, 1, 3, 1, 1],
  blues3: [0, 2, 1, 2, 1, 1, 3, 2],
  // odd
  half: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  whole: [0, 2, 2, 2, 2, 2, 2],
  _all: [
    'ionian', 'dorian', 'phrygian', 'lydian', 'myxolydian', 'aeolian', 'locrian', // 0 - 6
    'harmonic', 'melodic', 'blues', 'blues1', 'blues2', 'blues3', 'arabic', 'gypsy', // 7 - 14
    'half', 'whole'], // 15 -
  _alias: {
    'major': 'ionian',
    'the simpsons': 'lydian',
    'royals': 'myxolydian',
    'mixolydian': 'myxolydian',
    // minors
    'drunken sailor': 'dorian',
    'harmonic minor': 'harmonic',
    'melodic minor': 'melodic',
    'minor': 'aeolian',
    'natural minor': 'aeolian',
    'pentatonic': 'blues',
    'rare': 'locrian',
    'the fridge': 'phrygian',
    // other
    'chromatic': 'half',
    'dodecatonic': 'half',
    'half steps': 'half',
    'genie': 'whole',
    'whole steps': 'whole',
    'double harmonic major': 'arabic',
    'byzantine': 'arabic',
    'gypsy major': 'arabic',
    'double harmonic minor': 'gypsy',
    'hungarian minor': 'gypsy',
    'gypsy minor': 'gypsy',
  },
  _steps: ['tonic', 'half', 'whole', 'augsec', '', '', '', '', '', '', '', '', 'octave'],
};

/*

  heptatonic (seven-pitch)

  ARABIC
    STEPS
      half, augmented second, half, whole, half, augmented second, half
    TONIC
      minor 2nd, major 3rd, perfect 4th and 5th, minor 6th, major 7th

  var NAMES = [
    'I    Tonic         / First / Unison',
    'II   Supertonic    / Minor second / Half-step / Semi-tone',
                         'Major second / Full-step / Whole-tone',
    'III  Mediant       / Minor third',
                         'Major third',
    'IV   Subdominant   / Perfect fourth',
                         'Augmented fourth / Diminished fifth / Tri-tone',
    'V    Dominant      / Perfect fifth',
    'VI   Submediant    / Minor sixth',
                         'Major sixth',
    'VII  Leading tone  / Minor seventh',
                         'Major seventh',
    'VIII Tonic / Octave',
  ];

 */
