// 首先需要一个发布者的构造函数，其中定义了一个类型为数组的属性，用来保存订阅者的引用
function Publisher() {
  this.subscribers = [];
}
// 接下来所有的Publisher实例都应该能够投送数据，所以在prototype中添加deliver方法
Publisher.prototype.deliver = function(data) {
  this.subscribers.forEach(
    function(fn) {
      // subscriber实际上是函数，所以可以按如下方式使用，实现回调
      fn(data);
    }
  );
  // 返回this用作返回值，所以可以对该方法进行链式调用
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
