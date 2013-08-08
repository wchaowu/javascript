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
// 给予订阅者订阅的能力
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
// 退订方法，该方法供订阅者用来停止对指定发布者的观察
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
// 有些订阅者在监听到某种一次性的事件之后会在回调阶段立刻退订该事件，大致做法如下
var publisherObject = new Publisher;

var observerObject = function(data) {
  // process data
  console.log(data);
  // unsubscribe from this publisher
  arguments.callee.unsubscribe(publisherObject);
};

observerObject.subscribe(publisherObject);
