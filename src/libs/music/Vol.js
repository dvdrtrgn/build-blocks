import { throttle } from 'lodash';

const toDB = vol => Math.trunc(vol - 90);
const toVol = db => Math.trunc(db + 90);
const setVal = (x, y) => (x.value = toDB(y));

const Vol = {
  set: throttle(setVal, 99, {
    leading: true,
    trailing: true,
  }),
  get: x => toVol(x.value),
};

export default Vol;
