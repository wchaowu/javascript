/* An anonymous function, executed immediately. */

(function() {
  var foo = 10;
  var bar = 2;
  alert(foo * bar);
})();


/* An anonymous function with arguments. */

(function(foo, bar) {
  alert(foo * bar);
})(10, 2);


/* An anonymous function that returns a value. */

var baz = (function(foo, bar) {
  return foo * bar;
})(10, 2);

// baz will equal 20.


/* An anonymous function used as a closure. */

var baz;

(function() {
  var foo = 10;
  var bar = 2;
  baz = function() { 
    return foo * bar; 
  };
})();

baz(); // baz can access foo and bar, even though is it executed outside of the
       // anonymous function.
