/* below is five method to do the same thing */
/* a. Start and stop animations using functions. */

function startAnimation() {
  //todo
}

function stopAnimation() {
  //todo
}



/* b. Anim class. */

var Anim = function() {
  //todo
};
Anim.prototype.start = function() {
  //todo
};
Anim.prototype.stop = function() {
  //todo
};

/* Usage. */

var myAnim = new Anim();
myAnim.start();
//todo
myAnim.stop();



/* c. Anim class, with a slightly different syntax for declaring methods. */

var Anim = function() { 
  //todo
};
Anim.prototype = {
  start: function() {
    //todo
  },
  stop: function() {
    //todo
  }
};



/* d. Add a method to the Function class that can be used to declare methods. */

Function.prototype.method = function(name, fn) {
  this.prototype[name] = fn;
};

/* Anim class, with methods created using a convenience method. */

var Anim = function() { 
  //todo
};
Anim.method('start', function() {
  //todo
});
Anim.method('stop', function() {
  //todo
});



/* e. This version allows the calls to be chained. */

Function.prototype.method = function(name, fn) {
    this.prototype[name] = fn;
    return this;
};

/* Anim class, with methods created using a convenience method and chaining. */

var Anim = function() { 
  //todo
};
Anim.
  method('start', function() {
    //todo
  }).
  method('stop', function() {
    //todo
  });
