// Accessor without function callbacks: returning requested data in accessors.
window.API = window.API || {};
API.prototype = function() {
  var name = 'Hello world';
  // Privileged mutator method.
  setName: function(newName) {
    name = newName;
    return this;
  },
  // Privileged accessor method.
  getName: function() {
    return name;
  }
}();

// Implementation code.
var o = new API;
console.log(o.getName()); // Displays 'Hello world'.
console.log(o.setName('Meow').getName()); // Displays 'Meow'.

// Accessor with function callbacks.
window.API2 = window.API2 || {};
API2.prototype = function() {
  var name = 'Hello world';
  // Privileged mutator method.
  setName: function(newName) {
    name = newName;
    return this;
  },
  // Privileged accessor method.
  getName: function(callback) {
    callback.call(this, name);
    return this;
  }
}();

// Implementation code.
var o2 = new API2;
o2.getName(console.log).setName('Meow').getName(console.log);
// Displays 'Hello world' and then 'Meow'.
