export default function focusNext() {
  let self = document.activeElement;

  return () => {
    let next = self.nextElementSibling;

    if (next) {
      // console.log('going to next', next);
      next.focus();
    } else {
      self.parentElement.focus();
    }
  };
}
