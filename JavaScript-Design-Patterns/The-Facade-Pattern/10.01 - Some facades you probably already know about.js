function addEvent(el, type, fn) {
  if (window.addEventListener) {
    el.addEventListener(type, fn, false);
  } 
  else if (window.attachEvent) {
    el.attachEvent('on' + type, fn);
  } 
  else {
    el['on' + type] = fn;
  }
}
