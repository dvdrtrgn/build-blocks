const list = [1, 2, 3, 4, 5, 6];

function make(num = 4) {
  let temp = 'CX C#X DX D#X EX FX F#X GX G#X AX A#X BX';
  let octave = temp.replaceAll('X', num);

  return octave.split(' ');
}

export default {
  list,
  make,
};
