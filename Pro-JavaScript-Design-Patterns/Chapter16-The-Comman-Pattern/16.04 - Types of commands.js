/* SimpleCommand, a loosely coupled, simple command class. */

var SimpleCommand = function(receiver) { // implements Command
  this.receiver = receiver;
};
SimpleCommand.prototype.execute = function() {
  this.receiver.action();
};

/* ComplexCommand, a tightly coupled, complex command class. */

var ComplexCommand = function() { // implements Command
  this.logger = new Logger();
  this.xhrHandler = XhrManager.createXhrHandler();
  this.parameters = {};
};
ComplexCommand.prototype = {
  setParameter: function(key, value) {
    this.parameters[key] = value;
  },
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

var GreyAreaCommand = function(recevier) { // implements Command
  this.logger = new Logger();
  this.receiver = receiver;
};
GreyAreaCommand.prototype.execute = function() {
  this.logger.log('Executing command');
  this.receiver.prepareAction();
  this.receiver.action();
};
