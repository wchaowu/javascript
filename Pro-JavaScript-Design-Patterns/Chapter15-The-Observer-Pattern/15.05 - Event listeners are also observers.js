// example using listeners
var element = document.getElementById(‘a’);
var fn1 = function(e) {
  // handle click
};
var fn2 = function(e) {
  // do other stuff with click
};
// 使用事件监听器，所以click事件发生时fn1和fn2都会被调用
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
// 使用事件处理器，onclick事件发生时只会调用fn2
element.onclick = fn1;
element.onclick = fn2;
