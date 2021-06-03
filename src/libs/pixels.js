const W = window;
const D = document.documentElement;

const vw = () => Math.max(D.clientWidth || 0, W.innerWidth || 0);
const vh = () => Math.max(D.clientHeight || 0, W.innerHeight || 0);

class Pixels {
  classArray = null;

  constructor() {
    this.update = this.update.bind(this);
    this.update();
  }

  update() {
    this.vw = vw();
    this.vh = vh();
    this.classArray = [
      this.shape,
      // this.size,
      this.readSpace(),
      this.readDetail(),
    ].join('\n');
  }

  readDetail() {
    if (this.ppx >= 3) return 'hires';
    if (this.ppx <= 1) return 'lores';
    return '';
  }
  readSpace() {
    if (this.area < 5e5) return 'mobile';
    if (this.area < 1e6) return 'small';
    if (this.area > 2e6) return 'large';
    return 'desktop';
  }

  readMax() {
    return Math.max(...this.dims);
  }
  readMin() {
    return Math.min(...this.dims);
  }

  get area() {
    return vw() * vh();
  }
  get dims() {
    return [vw(), vh()];
  }
  get ppx() {
    // return 'ppx-' + W.devicePixelRatio;
    return Number(W.devicePixelRatio || 2);
  }
  get size() {
    // (page size "viewport") the only useful one!
    return `size-${this.dims.join('-')}`;
  }
  get shape() {
    let diff = vh() - vw();
    return diff > 0 ? 'tall' : 'wide';
  }

  // LESS USEFUL STUFF
  //
  // get avail() { /* (minus dock and menu) */
  //   let w = W.screen.availWidth; let h = W.screen.availHeight;
  //   return `avail-${w}-${h}`;
  // }
  // get outer() { /* (basically avail) */
  //   let w = W.outerWidth; let h = W.outerHeight;
  //   return `outer-${w}-${h}`;
  // }
  // get screen() { /* (display size) */
  //   let w = W.screen.width; let h = W.screen.height;
  //   return `screen-${w}-${h}`;
  // }
  // get client() { /* (same as inner) */
  //   let w = D.clientWidth; let h = D.clientHeight;
  //   return `client-${w}-${h}`;
  // }
  // get orient() { // deprecated, no good on safari
  //   let deg = Math.abs(W.orientation);
  //   return deg - 90 == 0 ? 'landscape' : 'portrait';
  // }
  //
}

const pixels = new Pixels();

export default pixels;
