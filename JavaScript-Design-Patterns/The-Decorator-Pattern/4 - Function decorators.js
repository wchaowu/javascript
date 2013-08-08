// 一个简单的函数装饰者的例子
function upperCaseDecorator(func) {
  return function() {
    return func.apply(this, arguments).toUpperCase();
  }
}
// 这个装饰者可以用来创建新函数
// 如下，先定义一个普通函数，然后将其装饰为一个新函数
function getDate() {
  return (new Date()).toString();
}
getDateCaps = upperCaseDecorator(getDate);

alert(getDate()); // Returns Wed Sep 26 2007 20:11:02 GMT-0700 (PDT)
alert(getDateCaps()); // Returns WED SEP 26 2007 20:11:02 GMT-0700 (PDT)

BellDecorator.prototype.ringBellLoudly = 
    upperCaseDecorator(BellDecorator.prototype.ringBell);

var myBicycle = new AcmeComfortCruiser(); 
myBicycle = new BellDecorator(myBicycle);

alert(myBicycle.ringBell()); // Returns 'Bell rung.'
alert(myBicycle.ringBellLoudly()); // Returns 'BELL RUNG.'
