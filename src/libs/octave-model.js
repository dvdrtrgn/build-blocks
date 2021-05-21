function make(num = 4) {
  let temp = 'CX C#X DX D#X EX FX F#X GX G#X AX A#X BX';
  let octave = temp.replaceAll('X', num);

  return octave.split(' ');
}

export default {
  make,
};
