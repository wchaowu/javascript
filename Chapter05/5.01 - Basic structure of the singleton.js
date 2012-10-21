/* Basic Singleton. */

var Singleton = {
  attribute1: true,
  attribute2: 10,

  method1: function() {

  },
  method2: function(arg) {

  }
};

Singleton.attribute1 = false;
var total = Singleton.attribute2 + 5;
var result = Singleton.method1();
