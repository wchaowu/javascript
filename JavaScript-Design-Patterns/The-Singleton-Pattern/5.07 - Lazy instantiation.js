/* Singleton with Private Members, step 3. */

MyNamespace.Singleton = (function() {
  // Private members.
  var privateAttribute1 = false;
  var privateAttribute2 = [1, 2, 3];
  
  function privateMethod1() {
    ...
  }
  function privateMethod2(args) {
    ...
  }

  return { // Public members.
    publicAttribute1: true,
    publicAttribute2: 10,
    
    publicMethod1: function() {
      ...
    },
    publicMethod2: function(args) {
      ...
    }
  };
})();

/* General skeleton for a lazy loading singleton, step 1. */

MyNamespace.Singleton = (function() {

  function constructor() { // All of the normal singleton code goes here.
    // Private members.
    var privateAttribute1 = false;
    var privateAttribute2 = [1, 2, 3];
  
    function privateMethod1() {
      ...
    }
    function privateMethod2(args) {
      ...
    }

    return { // Public members.
      publicAttribute1: true,
      publicAttribute2: 10,
    
      publicMethod1: function() {
        ...
      },
      publicMethod2: function(args) {
        ...
      }
    }
  }
  
})();

/* General skeleton for a lazy loading singleton, step 2. */

MyNamespace.Singleton = (function() {
  
  function constructor() { // All of the normal singleton code goes here.
    ...
  }
  
  return {
    getInstance: function() {
      // Control code goes here.
    }
  }
})();

/* General skeleton for a lazy loading singleton, step 3. */

MyNamespace.Singleton = (function() {
  
  var uniqueInstance; // Private attribute that holds the single instance.
  
  function constructor() { // All of the normal singleton code goes here.
    ...
  }
  
  return {
    getInstance: function() {
      if(!uniqueInstance) { // Instantiate only if the instance doesn't exist.
        uniqueInstance = constructor();
      }
      return uniqueInstance;
    }
  }
})();
