var Public = function() {
  var secret = 3;
  this.privilegedGetter = function() {
    return secret;
  };
};

var o = new Public;
var data = o.privilegedGetter();
