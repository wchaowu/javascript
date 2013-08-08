/* SimpleCommand, a loosely coupled, simple command class. */
// 简单命令对象
// 这种情况下的命令对象所起的作用只不过是把现有接受者的操作与调用者绑定在一起
// 它们与客户、接受者和调用者之间只是松散地耦合在一起
var SimpleCommand = function(receiver) { // implements Command
  this.receiver = receiver;
};
SimpleCommand.prototype.execute = function() {
  this.receiver.action();
};

/* ComplexCommand, a tightly coupled, complex command class. */
// 复杂命令对象
// 封装这一套复杂指令的命令对象，这种命令对象实际上没有接受者，因为它自己提供了操作的具体实现。
var ComplexCommand = function() { // implements Command
  this.logger = new Logger();
  this.xhrHandler = XhrManager.createXhrHandler();
  this.parameters = {};
};
ComplexCommand.prototype = {
  setParameter: function(key, value) {
    this.parameters[key] = value;
  },
  // 把所有的实现相关操作的代码都包含在其内部，而不是把操作委托给接受者实现。
  execute: function() {
    this.logger.log('Executing command');
    var postArray = [];
    for(var key in this.parameters) {
      postArray.push(key + '=' + this.parameters[key]);
    }
    var postString = postArray.join('&');
    this.xhrHandler.request(
      'POST', 
      'script.php', 
      function() {}, 
      postString
    );
  }
};

/* GreyAreaCommand, somewhere between simple and complex. */
// 灰色地带，有些命令对象不但封装了接收者操作，而且其execute方法也具有一些实现代码
var GreyAreaCommand = function(recevier) { // implements Command
  this.logger = new Logger();
  this.receiver = receiver;
};
GreyAreaCommand.prototype.execute = function() {
  this.logger.log('Executing command');
  this.receiver.prepareAction();
  this.receiver.action();
};
