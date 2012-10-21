function Publisher() {
  this.subscribers = [];
}

Publisher.prototype.deliver = function(data) {
  this.subscribers.forEach(
    function(fn) {
      fn(data);
    }
  );
  return this;
};

Function.prototype.subscribe = function(publisher) {
  var that = this;
  var alreadyExists = publisher.subscribers.some(
    function(el) {
      if ( el === that ) {
        return;
      }
    }
  );
  if ( !alreadyExists ) {
    publisher.subscribers.push(this);
  }
  return this;
};

Function.prototype.unsubscribe = function(publisher) {
  var that = this;
  publisher.subscribers = publisher.subscribers.filter(
    function(el) {
      if ( el !== that ) {
        return el;
      }
    }
  );
  return this;
};

var publisherObject = new Publisher;

var observerObject = function(data) {
  // process data
  console.log(data);
  // unsubscribe from this publisher
  arguments.callee.unsubscribe(publisherObject);
};

observerObject.subscribe(publisherObject);
