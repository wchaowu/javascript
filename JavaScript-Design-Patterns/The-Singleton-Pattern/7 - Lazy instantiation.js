/* Singleton with Private Members, step 3. */
/**
 * 惰性加载：在大型或复杂的项目中，起到了优化的作用：那些开销较大却很少用到的组件可以被包装到惰性加载单例中，示例程序：
 */

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
     //todo.
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
    }
  }
  
})();

/* General skeleton for a lazy loading singleton, step 2. */

MyNamespace.Singleton = (function() {
  
  function constructor() { // All of the normal singleton code goes here.
    //todo
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
    //todo
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
