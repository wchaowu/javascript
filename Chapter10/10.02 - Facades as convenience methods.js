function a(x) {
  // do stuff here...
}
function b(y) {
  // do stuff here...
}
function ab(x, y) {
  a(x);
  b(y);
}



var DED = window.DED || {};
DED.util = {
  stopPropagation: function(e) {
    if (ev.stopPropagation) {
      // W3 interface
      e.stopPropagation();
    } 
    else {
      // IE's interface
      e.cancelBubble = true;
    }
  },
  preventDefault: function(e) {
    if (e.preventDefault) {
      // W3 interface
      e.preventDefault();
    } 
    else {
      // IE's interface
      e.returnValue = false;
    }
  },
  /* our convenience method */
  stopEvent: function(e) {
    DED.util.stopPropagation(e);
    DED.util.preventDefault(e);
  }
};
