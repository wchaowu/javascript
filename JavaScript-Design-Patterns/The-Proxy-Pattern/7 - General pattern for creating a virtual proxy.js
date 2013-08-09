/* DynamicProxy abstract class, incomplete. */
// 创建动态代理类的壳体以及_initialize和_checkInitialization这两个方法。
var DynamicProxy = function() {
  this.args = arguments;
  this.initialized = false;
};
DynamicProxy.prototype = {
  // 触发本体实例化过程，它可以被关联到各种触发器或条件
  _initialize: function() {
    this.subject = {}; // Instantiate the class.
    this.class.apply(this.subject, this.args);
    this.subject.__proto__ = this.class.prototype;

    var that = this;
    this.interval = setInterval(function() { that._checkInitialization(); }, 100);
  },
  // 每隔一段预定的时间会被调用一次
  _checkInitialization: function() {
  	// 调用_isInitialized方法判断是否初始化好了
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
// 现在正在构造函数中添加一些代码，以便针对本体类中的每一个方法为代理创建一个相应的方法。
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
// 创建TestClass的代理
// 在子类中必须要做的事有4件：
//    将this.class设置为本体类
//    创建某种实例化触发器（本例的设计是在点击一个链接时进行实例化）
//    调用超类的构造函数（就像所有子类都要做的那样）
//    实现_isInitialized方法（根据本体是否已经初始化返回true或false）
var TestProxy = function() {
  // 将this.class设置为本体类
  this.class = TestClass;
  var that = this;
  // 创建某种实例化触发器
  addEvent($('test-link'), 'click', function() { that._initialize(); }); 
    // Initialization trigger.
  // 调用超类的构造函数
  TestProxy.superclass.constructor.apply(this, arguments);
};
extend(TestProxy, DynamicProxy);
// 实现_isInitialized方法
TestProxy.prototype._isInitialized = function() {
  //todo // Initialization condition goes here.
};
