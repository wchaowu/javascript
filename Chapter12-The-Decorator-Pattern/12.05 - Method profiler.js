/* ListBuilder class. */

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
