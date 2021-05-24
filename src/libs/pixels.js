const W = window;
const D = document.documentElement;

const vw = () => Math.max(D.clientWidth || 0, W.innerWidth || 0);
const vh = () => Math.max(D.clientHeight || 0, W.innerHeight || 0);

class Pixels {
  constructor() {
    this.update();
  }

  update() {
    if (this.constructor !== Pixels) console.error('whoops');
    this.vw = vw();
    this.vh = vh();
    console.log('pixels update', this.dims);
  }

  get dims() {
    return `dims-${vw()}-${vh()}`;
  }

  get screen() {
    let w = W.screen.width;
    let h = W.screen.height;
    return `screen-${w}-${h}`;
  }
  get avail() {
    let w = W.screen.availWidth;
    let h = W.screen.availHeight;
    return `avail-${w}-${h}`;
  }
  get win() {
    let w = W.innerWidth;
    let h = W.innerHeight;
    return `win-${w}-${h}`;
  }
  get orient() {
    let deg = Math.abs(W.orientation);
    return deg - 90 == 0 ? 'landscape' : 'portrait';
  }
  get ppp() {
    return 'ppp-' + W.devicePixelRatio;
  }

  classObj() {
    return {};
  }
}

const pixels = new Pixels();

export default pixels;
