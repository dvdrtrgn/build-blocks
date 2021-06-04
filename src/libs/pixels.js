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
      this.readClient(),
      this.readPort(),
      this.readScreen(),
      this.readDetail(),
      this.readShape(),
      this.readSpace(),
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
  readShape() {
    if (this.ratio < 0.8) return 'tall';
    if (this.ratio > 1.2) return 'wide';
    return 'square';
  }
  readPort() {
    return `port-${this.inner.join('-')}`;
  }
  readClient() {
    return `client-${this.client.join('-')}`;
  }
  readScreen() {
    return `screen-${this.screen.join('-')}`;
  }

  readAll() {
    const keys = Object.keys(this);
    const obj = this;
    const vals = [];

    keys.forEach(function(e) {
      vals.push(`${e} = ${obj[e]}`);
    });

    return vals;
  }

  get area() {
    return vw() * vh();
  }
  get client() {
    return [D.clientWidth, D.clientHeight];
  }
  get inner() {
    return [W.innerWidth, W.innerHeight];
  }
  get screen() {
    return [W.screen.width, W.screen.height];
  }
  get dims() {
    return [vw(), vh()];
  }
  get max() {
    return Math.max(vw(), vh());
  }
  get min() {
    return Math.min(vw(), vh());
  }
  get ppx() {
    return Number(W.devicePixelRatio || 2);
  }
  get ratio() {
    return vw() / vh();
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
  // get orient() { // deprecated, no good on safari
  //   let deg = Math.abs(W.orientation);
  //   return deg - 90 == 0 ? 'landscape' : 'portrait';
  // }
  //
}

export default new Pixels();
