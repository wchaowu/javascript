/* QueuedHandler class. */

var QueuedHandler = function() { // implements AjaxHandler
  this.queue = [];
  this.requestInProgress = false;
  this.retryDelay = 5; // In seconds.
};
extend(QueuedHandler, SimpleHandler);
QueuedHandler.prototype.request = function(method, url, callback, postVars, 
  override) {
  if(this.requestInProgress && !override) {
    this.queue.push({ 
      method: method, 
      url: url, 
      callback: callback, 
      postVars: postVars 
    });
  }
  else {
    this.requestInProgress = true;
    var xhr = this.createXhrObject();
    var that = this;
    xhr.onreadystatechange = function() {
      if(xhr.readyState !== 4) return;
      if(xhr.status === 200) {
        callback.success(xhr.responseText, xhr.responseXML);
        that.advanceQueue();
      }
      else {
        callback.failure(xhr.status);
        setTimeout(function() { that.request(method, url, callback, postVars); }, 
          that.retryDelay * 1000);
      }
    };
    xhr.open(method, url, true);
    if(method !== 'POST') postVars = null;
    xhr.send(postVars);    
  }
}; 
QueuedHandler.prototype.advanceQueue = function() {
  if(this.queue.length === 0) {
    this.requestInProgress = false;    
    return;
  }
  var req = this.queue.shift();
  this.request(req.method, req.url, req.callback, req.postVars, true);
};


/* OfflineHandler class. */

var OfflineHandler = function() { // implements AjaxHandler
  this.storedRequests = [];
};
extend(OfflineHandler, SimpleHandler);
OfflineHandler.prototype.request = function(method, url, callback, postVars) {
  if(XhrManager.isOffline()) { // Store the requests until we are online.
    this.storedRequests.push({ 
      method: method, 
      url: url, 
      callback: callback, 
      postVars: postVars 
    });
  }
  else { // Call SimpleHandler's request method if we are online.
    this.flushStoredRequests();
    OfflineHandler.superclass.request(method, url, callback, postVars);
  }
};
OfflineHandler.prototype.flushStoredRequests = function() {
  for(var i = 0, len = storedRequests.length; i < len; i++) {
    var req = storedRequests[i];
    OfflineHandler.superclass.request(req.method, req.url, req.callback,
      req.postVars);
  }
};
