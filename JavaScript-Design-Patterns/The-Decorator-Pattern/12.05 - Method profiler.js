/* ListBuilder class. */
// 一个测试的样例类，其唯一的目的是在网页上创建一个有序列表
var ListBuilder = function(parent, listLength) {
  this.parentEl = $(parent);
  this.listLength = listLength;
};
ListBuilder.prototype = {
  buildList: function() {
    var list = document.createElement('ol');
    this.parentEl.appendChild(list);
    
    for(var i = 0; i < this.listLength; i++) {
      var item = document.createElement('li');
      list.appendChild(item);
    }
  }
};

/* SimpleProfiler class. */
// 创建一个专用于这个ListBuilder类的装饰者，记录执行buildList方法所耗用的时间
var SimpleProfiler = function(component) {
  this.component = component;
};
SimpleProfiler.prototype = {
  buildList: function() {
    var startTime = new Date();
    this.component.buildList();
    var elapsedTime = (new Date()).getTime() - startTime.getTime();
    console.log('buildList: ' + elapsedTime + ' ms');
  }
};

/* Usage. */

var list = new ListBuilder('list-container', 5000); // Instantiate the object.
list = new SimpleProfiler(list); // Wrap the object in the decorator.
list.buildList(); // Creates the list and displays "buildList: 298 ms".



/* MethodProfiler class. */
// 对上面的装饰者进行通用化改造，使其可用于任何对象。
var MethodProfiler = function(component) {
  this.component = component;
  this.timers = {};

  for(var key in this.component) {
    // Ensure that the property is a function.
    if(typeof this.component[key] !== 'function') {
      continue;
    }

    // Add the method.
    var that = this;
    (function(methodName) {
      that[methodName] = function() {
        that.startTimer(methodName);
        var returnValue = that.component[methodName].apply(that.component, 
          arguments);
        that.displayTime(methodName, that.getElapsedTime(methodName));
        return returnValue;
      };
    })(key); }
};
MethodProfiler.prototype = {
  startTimer: function(methodName) {
    this.timers[methodName] = (new Date()).getTime();
  },
  getElapsedTime: function(methodName) {
    return (new Date()).getTime() - this.timers[methodName];
  },
  displayTime: function(methodName, time) {
    console.log(methodName + ': ' + time + ' ms');
  }
};

/* Usage. */

var list = new ListBuilder('list-container', 5000);
list = new MethodProfiler(list);
list.buildList('ol'); // Displays "buildList: 301 ms".
list.buildList('ul'); // Displays "buildList: 287 ms".
list.removeLists('ul'); // Displays "removeLists: 10 ms".
list.removeLists('ol'); // Displays "removeLists: 12 ms".
