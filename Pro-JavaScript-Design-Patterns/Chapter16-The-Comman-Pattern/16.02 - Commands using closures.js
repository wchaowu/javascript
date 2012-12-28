/* Commands using closures. */
// 这种方法不需要创建一个具有execute方法的对象，而是把想要执行的方法包装在闭包中。
function makeStart(adObject) {
  return function() { 
    adObject.start();
  };
}
function makeStop(adObject) {
  return function() {
    adObject.stop();
  };
}

/* Implementation code. */

var startCommand = makeStart(ads[i]);
var stopCommand = makeStop(ads[i]);

startCommand(); // Execute the functions directly instead of calling a method.
stopCommand();
