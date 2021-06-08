const aorb = (a, b) => (a !== undefined ? a : b);
const limit = (min, max, val) => Math.min(max, Math.max(min, val));
const numalize = num => limit(-1, 1, Number(num) || 0);
const xor = (x, y) => Boolean(y ? !x : x);

function modulate(dividend, divisor) {
  // a mod n
  var quotient = Math.floor(dividend / divisor);
  var posoffset = Math.abs(quotient) * divisor;
  var remainder = (posoffset + dividend) % divisor;

  return [quotient, remainder];
}

function resolveOctaves(num) {
  if (num < -50) return 0; // inaudible, so rest
  /*jshint validthis: true */
  var cnt = this.length - 1;
  var [oct, idx] = modulate(num, cnt);
  return this[idx] * Math.pow(2, oct);
}

export default {
  aorb,
  limit,
  numalize,
  xor,
  resolveOctaves,
};

/*
  collalesce null // covers null and undefined
  (value != null) ? value : 'default value'
*/
