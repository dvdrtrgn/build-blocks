// find active and go to next

function seekTabParent(ele) {
  let parent = ele;
  while ((parent = parent.parentElement)) {
    if (~parent.tabIndex) return parent;
  }
  return ele;
}

export default function focusNext(auto) {
  let self = document.activeElement;

  return () => {
    let next = self.nextElementSibling;

    if (next && next.type !== 'submit') next = false;

    if (auto && next) {
      // console.log('going to next', next);
      next.focus();
    } else {
      seekTabParent(self).focus();
    }
  };
}
