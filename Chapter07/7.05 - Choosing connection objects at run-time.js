/* XhrManager singleton. */

var XhrManager = {
  createXhrHandler: function() {
    var xhr;
    if(this.isOffline()) {
      xhr = new OfflineHandler();
    }
    else if(this.isHighLatency()) {
      xhr = new QueuedHandler();
    }
    else {
      xhr = new SimpleHandler()
    }
    
    Interface.ensureImplements(xhr, AjaxHandler);
    return xhr
  },
  isOffline: function() { // Do a quick request with SimpleHandler and see if
    ...                   // it succeeds.
  },
  isHighLatency: function() { // Do a series of requests with SimpleHandler and
    ...                       // time the responses. Best done once, as a 
                              // branching function.
  }
};


/* Usage. */

var myHandler = XhrManager.createXhrHandler();
var callback = { 
  success: function(responseText) { alert('Success: ' + responseText); }, 
  failure: function(statusCode) { alert('Failure: ' + statusCode); } 
};
myHandler.request('GET', 'script.php', callback);
