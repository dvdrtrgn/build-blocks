const W = window;
const D = document.documentElement;

const vw = () => Math.max(D.clientWidth || 0, W.innerWidth || 0);
const vh = () => Math.max(D.clientHeight || 0, W.innerHeight || 0);

function resetDocEl(oldList, newList) {
  if (oldList) oldList.forEach(e => D.classList.remove(e));
  if (newList) newList.forEach(e => D.classList.add(e));
  return newList;
}

function round(num) {
  return Number(num.toFixed(5));
}

class Pixels {
  classes = null;
  #resets = false;

  constructor() {
    this.update = this.update.bind(this);
    this.update();
  }

  watchWindow(ctrldoc) {
    this.updateDoc(ctrldoc);
    W.addEventListener('resize', this.update);
  }
  unwatchWindow() {
    W.removeEventListener('resize', this.update);
    this.updateDoc(false);
  }

  update() {
    this.classes = [
      this.classMega(),
      this.classRes(),
      this.classShape(),
      this.classSize(),
    ];
    this.updateDoc();
  }

  classMega() {
    let mp = this.totalRes;
    if (mp < 0.7) mp = 'submega';
    else if (mp < 1) mp = 'mega1';
    else mp = 'mega' + mp.toPrecision(1);
    return mp;
  }
  classRes() {
    if (this.ppx >= 3) return 'hires';
    if (this.ppx <= 1) return 'lores';
    return 'okres';
  }
  classSize() {
    if (this.cssArea < 0.5) return 'mobile';
    if (this.cssArea < 1) return 'small';
    if (this.cssArea > 3) return 'huge';
    if (this.cssArea > 2) return 'large';
    return 'average';
  }
  classShape() {
    if (this.aspectRatio < 0.8) return 'portrait';
    if (this.aspectRatio > 1.2) return 'landscape';
    return 'square';
  }

  updateDoc(doit) {
    if (doit != null) doit = Boolean(doit);
    else if (!this.#resets) return;
    if (doit == null) doit = true; // permissive continuation

    let newClasses = doit ? this.classes : false;
    this.#resets = resetDocEl(this.#resets, newClasses);
  }

  stats() {
    const self = this;
    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(self));
    const vals = {};
    const skip = [
      'constructor',
      'stats',
      'toString',
      'update',
      'updateDoc',
      'unwatchWindow',
      'watchWindow',
    ];

    keys.forEach(function(key) {
      if (skip.includes(key)) return;
      let val = self[key];
      if (typeof val === 'function') val = val.bind(self)();
      vals[key] = val;
    });

    return vals;
  }

  toString() {
    let obj = this.stats();
    let arr = Object.entries(obj).map(e => e.join(': '));
    return arr.join('\n');
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
  get aspectRatio() {
    return round(vw() / vh());
  }
  get cssArea() {
    return (vw() * vh()) / 1e6;
  }
  get totalRes() {
    return round(this.cssArea * this.ppx);
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
