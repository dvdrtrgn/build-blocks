const glob = Object.create({
  exposes: function(obj) {
    Object.assign(glob, obj);
  },
  yelp: function(arg, clr) {
    let c = 'background: black; color: yellow; font-size: 200%;';
    if (clr) console.clear();
    if (arg === 0) debugger;
    else console.log('%cYELP', c, arg);
  },
});

window.glob = glob; // expose the exposer

export default glob;
