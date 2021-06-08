/*
  simply a tempate for a C scale with an octave number
*/
function make(num = 4) {
  let temp = 'C? C#? D? D#? E? F? F#? G? G#? A? A#? B?';
  let octave = temp.replaceAll('?', num);

  return octave.split(' ');
}

export default {
  make,
};
