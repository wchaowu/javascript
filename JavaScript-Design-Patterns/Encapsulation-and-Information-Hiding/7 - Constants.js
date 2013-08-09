var Class = (function() {
  
  // Constants (created as private static attributes).
  var UPPER_BOUND = 100;
  
  // Privileged static method.
  this.getUPPER_BOUND = function(){
    return UPPER_BOUND;
  }

  //todo

  // Return the constructor.
  return function(constructorArgument) {
    //todo
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
  this.getConstant=function(name) {
    return constants[name];
  }

  //todo

  // Return the constructor.
  return function(constructorArgument) {
    //todo
  }
})();


/* Usage. */

Class.getConstant('UPPER_BOUND');
