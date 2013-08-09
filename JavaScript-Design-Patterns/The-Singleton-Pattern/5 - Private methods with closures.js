/* Singleton as an Object Literal. */

MyNamespace.Singleton = {};

/* Singleton with Private Members, step 1. */

MyNamespace.Singleton = (function() {
  return {};
})();

/* Singleton with Private Members, step 2. */

MyNamespace.Singleton = (function() {
  return { // Public members.
    publicAttribute1: true,
    publicAttribute2: 10,
    
    publicMethod1: function() {
      //todo
    },
    publicMethod2: function(args) {
      //todo
    }
  };
})();

/* Singleton with Private Members, step 3. */

MyNamespace.Singleton = (function() {
  // Private members.
  var privateAttribute1 = false;
  var privateAttribute2 = [1, 2, 3];
  
  function privateMethod1() {
    //todo
  }
  function privateMethod2(args) {
    //todo
  }

  return { // Public members.
    publicAttribute1: true,
    publicAttribute2: 10,
    
    publicMethod1: function() {
      //todo
    },
    publicMethod2: function(args) {
      //todo
    }
  };
})();
