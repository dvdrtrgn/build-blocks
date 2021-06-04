const W = window;
const D = document.documentElement;

const vw = () => Math.max(D.clientWidth || 0, W.innerWidth || 0);
const vh = () => Math.max(D.clientHeight || 0, W.innerHeight || 0);

class Pixels {
  classes = null;

  constructor() {
    this.update = this.update.bind(this);
    this.update();
  }

  watch() {
    W.addEventListener('resize', this.update);
  }
  unwatch() {
    W.removeEventListener('resize', this.update);
  }

  update() {
    return (this.classes = [
      this.readArea(),
      this.readDetail(),
      this.readShape(),
      this.readSpace(),
    ]).join('\n');
  }

  readDetail() {
    if (this.ppx >= 3) return 'hires';
    if (this.ppx <= 1) return 'lores';
    return 'okres';
  }
  readSpace() {
    if (this.area < 1) return 'mobile';
    if (this.area < 2) return 'small';
    if (this.area > 4) return 'large';
    if (this.area > 6) return 'huge';
    return 'average';
  }
  readShape() {
    if (this.ratio < 0.8) return 'portrait';
    if (this.ratio > 1.2) return 'landscape';
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
  readArea() {
    return `area-${this.area.toPrecision(1)}`;
  }

  readAll() {
    const obj = this;
    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
    const vals = [];

    keys.forEach(function(key) {
      let val = obj[key];
      if (key === 'constructor' || key === 'readAll') return;
      if (typeof val === 'function') val = val.bind(obj)();
      vals.push(`${key} = ${val}`);
    });

    return vals;
  }

  get area() {
    return (vw() * vh() * this.ppx) / 1e6;
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

export default Pixels;
