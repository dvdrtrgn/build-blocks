export function lazy(name, toObj, fromObj) {
  const duper = () => {
    toObj['lazy_' + name] = fromObj[name];
  };
  setInterval(duper, 333);
  return fromObj[name];
}

export function walkProps(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key]));
}
