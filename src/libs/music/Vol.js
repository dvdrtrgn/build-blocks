import { throttle } from 'lodash';

let RAT = 2.9;

function to_dB(num) {
  num = num * 1000;
  num = Math.pow(num, 1 / RAT);
  num = num - 50;
  if (num <= -50) num = -Infinity;
  return Math.round(num);
}

function to_Pc(num) {
  if (num < -50) num = -50;
  num = num + 50;
  num = Math.pow(num, RAT);
  num = num / 1000;
  return Math.round(num);
}

// const to_dB = vol => Math.trunc(vol - 90);
// const to_Pc = db => Math.trunc(db + 90);
const setVal = (x, y) => (x.value = to_dB(y));

const Vol = {
  set: throttle(setVal, 99, {
    leading: true,
    trailing: true,
  }),
  get: x => to_Pc(x.value),
  to_dB,
  to_Pc,
};

export default Vol;
