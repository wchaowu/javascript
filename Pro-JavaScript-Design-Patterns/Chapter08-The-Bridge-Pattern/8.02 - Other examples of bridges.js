// 使用桥接模式收集某些私用性的信息，用特权方法作为桥梁以便访问私用变量空间 。
var Public = function() {
  var secret = 3;
  this.privilegedGetter = function() {
    return secret;
  };
};

var o = new Public;
var data = o.privilegedGetter();
