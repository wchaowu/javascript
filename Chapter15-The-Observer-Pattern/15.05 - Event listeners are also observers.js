// example using listeners
var element = document.getElementById(‘a’);
var fn1 = function(e) {
  // handle click
};
var fn2 = function(e) {
  // do other stuff with click
};

addEvent(element, ‘click’, fn1);
addEvent(element, ‘click’, fn2);



// example using handlers
var element = document.getElementById(‘b’);
var fn1 = function(e) {
  // handle click
};
var fn2 = function(e) {
  // do other stuff with click
};

element.onclick = fn1;
element.onclick = fn2;
