/* DynamicProxy abstract class, incomplete. */

var DynamicProxy = function() {
  this.args = arguments;
  this.initialized = false;
};
DynamicProxy.prototype = {
  _initialize: function() {
    this.subject = {}; // Instantiate the class.
    this.class.apply(this.subject, this.args);
    this.subject.__proto__ = this.class.prototype;

    var that = this;
    this.interval = setInterval(function() { that._checkInitialization(); }, 100);
  },
  _checkInitialization: function() {
    if(this._isInitialized()) {
      clearInterval(this.interval);
      this.initialized = true;
    }
  },
  _isInitialized: function() { // Must be implemented in the subclass.
    throw new Error('Unsupported operation on an abstract class.');
  }
};

/* DynamicProxy abstract class, complete. */

var DynamicProxy = function() {
  this.args = arguments;
  this.initialized = false;
  
  if(typeof this.class != 'function') {
    throw new Error('DynamicProxy: the class attribute must be set before ' + 
      'calling the super-class constructor.');
  }
  
  // Create the methods needed to implement the same interface.
  for(var key in this.class.prototype) {
    // Ensure that the property is a function.
    if(typeof this.class.prototype[key] !== 'function') {
      continue;
    }

    // Add the method.
    var that = this;
    (function(methodName) {
      that[methodName] = function() {
        if(!that.initialized) {
          return
        }
        return that.subject[methodName].apply(that.subject, arguments);
      };
    })(key);
  }
};
DynamicProxy.prototype = {
  _initialize: function() {
    this.subject = {}; // Instantiate the class.
    this.class.apply(this.subject, this.args);
    this.subject.__proto__ = this.class.prototype;

    var that = this;
    this.interval = setInterval(function() { that._checkInitialization(); }, 100);
  },
  _checkInitialization: function() {
    if(this._isInitialized()) {
      clearInterval(this.interval);
      this.initialized = true;
    }
  },
  _isInitialized: function() { // Must be implemented in the subclass.
    throw new Error('Unsupported operation on an abstract class.');
  }
};

/* TestProxy class. */

var TestProxy = function() {
  this.class = TestClass;
  var that = this;
  addEvent($('test-link'), 'click', function() { that._initialize(); }); 
    // Initialization trigger.
  TestProxy.superclass.constructor.apply(this, arguments);
};
extend(TestProxy, DynamicProxy);
TestProxy.prototype._isInitialized = function() {
  ... // Initialization condition goes here.
};
