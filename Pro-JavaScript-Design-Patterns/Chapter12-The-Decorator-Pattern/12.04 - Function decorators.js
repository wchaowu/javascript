function upperCaseDecorator(func) {
  return function() {
    return func.apply(this, arguments).toUpperCase();
  }
}

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
