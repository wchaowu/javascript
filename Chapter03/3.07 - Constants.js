var Class = (function() {
  
  // Constants (created as private static attributes).
  var UPPER_BOUND = 100;
  
  // Privileged static method.
  this.getUPPER_BOUND() {
    return UPPER_BOUND;
  }

  ...

  // Return the constructor.
  return function(constructorArgument) {
    ...
  }
})();


/* Grouping constants together. */

var Class = (function() {
  
  // Private static attributes.
  var constants = {
    UPPER_BOUND: 100,
    LOWER_BOUND: -100
  }
  
  // Privileged static method.
  this.getConstant(name) {
    return constants[name];
  }

  ...

  // Return the constructor.
  return function(constructorArgument) {
    ...
  }
})();


/* Usage. */

Class.getConstant('UPPER_BOUND');
