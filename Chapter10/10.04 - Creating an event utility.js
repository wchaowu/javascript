DED.util.Event = {
  getEvent: function(e) {
    return e || window.event;
  },
  getTarget: function(e) {
    return e.target || e.srcElement;
  },
  stopPropagation: function(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } 
    else {
      e.cancelBubble = true;
    }
  },
  preventDefault: function(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } 
    else {
      e.returnValue = false;
    }
  },
  stopEvent: function(e) {
    this.stopPropagation(e);
    this.preventDefault(e);
  }
};

addEvent($('example'), 'click', function(e) {
  // Who clicked me.
  console.log(DED.util.Event.getTarget(e));
  // Stop propgating and prevent the default action.
  DED.util.Event.stopEvent(e);
});
