// Prototype $ function.
function $() {
  var elements = new Array();
  for(var i = 0; i < arguments.length; i++) {
    var element = arguments[i];
    if(typeof element == 'string')
      element = document.getElementById(element);
    if(arguments.length == 1)
      return element;
    elements.push(element);
  }
  return elements;
}

/* YUI get method. */
YAHOO.util.Dom.get = function(el) {
  if(YAHOO.lang.isString(el)) { 
    return document.getElementById(el);
  }
  if(YAHOO.lang.isArray(el)) {
    var c = [];
    for(var i = 0, len = el.length; i < len; ++i) {
      c[c.length] = Y.Dom.get(el[i]);
    }
    return c;
  }
  if(el) {
    return el;
  }
  return null;
};

function PrototypeToYUIAdapter() {
  return YAHOO.util.Dom.get(arguments);
}
function YUIToPrototypeAdapter(el) {
  return $.apply(window, el);
}

$ = PrototypeToYUIAdapter;
or vice-versa, for those who are migrating from YUI to Prototype:
YAHOO.util.Dom.get = YUIToPrototypeAdapter;
