const glob = Object.create({
  assigns: function(obj) {
    Object.assign(glob, obj);
  },
});

export default {};
window.glob = glob;
