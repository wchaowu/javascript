// Original function.

var addRequest = function(request) {
  var data = request.split('-')[1];
  // etc...
};

// Function de-coupled.

var addRequest = function(data) {
  // etc...
};

// Bridge

var addRequestFromClick = function(request) {
  addRequest(request.split(‘-‘)[0]);
};
