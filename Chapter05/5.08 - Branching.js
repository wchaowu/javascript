/* Branching Singleton (skeleton). */

MyNamespace.Singleton = (function() {
  var objectA = {
    method1: function() {
      ...
    },
    method2: function() {
      ...
    }
  };
  var objectB = {
    method1: function() {
      ...
    },
    method2: function() {
      ...
    }
  };

  return (someCondition) ? objectA : objectB;
})();
