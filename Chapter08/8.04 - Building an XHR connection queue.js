var asyncRequest = (function() {
  function handleReadyState(o, callback) {
    var poll = window.setInterval(
      function() {
        if (o && o.readyState == 4) {
          window.clearInterval(poll);
          if (callback) {
            callback(o);
          }
        }
      },
      50
    );
  }
  var getXHR = function() {
    var http;
    try {
      http = new XMLHttpRequest;
      getXHR = function() {
        return new XMLHttpRequest;
      };
    }
    catch(e) {
      var msxml = [
        'MSXML2.XMLHTTP.3.0', 
        'MSXML2.XMLHTTP', 
        'Microsoft.XMLHTTP'
      ];
      for (var I = 0, len = msxml.length; i < len; ++i) {
        try {
          http = new ActiveXObject(msxml[i]);
          getXHR = function() {
            return new ActiveXObject(msxml[i]);
          };
          break;
        }
        catch(e) {}
      }
    }
    return http;
  };
  return function(method, uri, callback, postData) {
    var http = getXHR();
    http.open(method, uri, true);
    handleReadyState(http, callback);
    http.send(postData || null);
    return http;
  };
})();


Function.prototype.method = function(name, fn) {
  this.prototype[name] = fn;
  return this;
};


// From the Mozilla Developer Center website at http://developer.mozilla.org/en/docs/New_in_JavaScript_1.6#Array_extras.

if ( !Array.prototype.forEach ) { 
  Array.method('forEach', function(fn, thisObj) {
    var scope = thisObj || window;
    for ( var i = 0, len = this.length; i < len; ++i ) {
      fn.call(scope, this[i], i, this);
    }
  });
}

if ( !Array.prototype.filter ) {
  Array.method('filter', function(fn, thisObj) {
    var scope = thisObj || window;
    var a = [];
    for ( var i = 0, len = this.length; i < len; ++i ) {
      if ( !fn.call(scope, this[i], i, this) ) {
        continue;
      }
      a.push(this[i]);
    }
    return a;
  });
}


window.DED = window.DED || {};
DED.util = DED.util || {};
DED.util.Observer = function() {
  this.fns = [];
}
DED.util.Observer.prototype = {
  subscribe: function(fn) {
    this.fns.push(fn);
  },
  unsubscribe: function(fn) {
    this.fns = this.fns.filter(
      function(el) {
        if ( el !== fn ) {
          return el;
        }
      }
    );
  },
  fire: function(o) {
    this.fns.forEach(
      function(el) {
        el(o);
      }
    );
  }
};


DED.Queue = function() {
  // Queued requests.
  this.queue = [];

  // Observable Objects that can notify the client of interesting moments
  // on each DED.Queue instance.
  this.onComplete = new DED.util.Observer;
  this.onFailure = new DED.util.Observer;
  this.onFlush = new DED.util.Observer;
    
  // Core properties that set up a frontend queueing system.
  this.retryCount = 3;
  this.currentRetry = 0;
  this.paused = false;
  this.timeout = 5000;
  this.conn = {};
  this.timer = {};
};

DED.Queue.
  method('flush', function() {
    if (!this.queue.length > 0) {
      return;
    }
    if (this.paused) {
      this.paused = false;
      return;
    }
    var that = this;
    this.currentRetry++;
    var abort = function() {
      that.conn.abort();
      if (that.currentRetry == that.retryCount) {
        that.onFailure.fire();
        that.currentRetry = 0;
      } else {
        that.flush();
      }
    };
    this.timer = window.setTimeout(abort, this.timeout);
    var callback = function(o) {
      window.clearTimeout(that.timer);
      that.currentRetry = 0;
      that.queue.shift();
      that.onFlush.fire(o.responseText);
      if (that.queue.length == 0) {
        that.onComplete.fire();
        return;
      }
      // recursive call to flush
      that.flush();
    };
    this.conn = asyncRequest(
      this.queue[0]['method'],
      this.queue[0]['uri'],
      callback,
      this.queue[0]['params']
    );
  }).
  method('setRetryCount', function(count) {
    this.retryCount = count;
  }).
  method('setTimeout', function(time) {
    this.timeout = time;
  }).
  method('add', function(o) {
    this.queue.push(o);
  }).
  method('pause', function() {
    this.paused = true;
  }).
  method('dequeue', function() {
    this.queue.pop();
  }).
  method('clear', function() {
    this.queue = [];
  });


/* Usage. */

var q = new DED.Queue;
// Reset our retry count to be higher for slow connections.
q.setRetryCount(5);
// Decrease timeout limit because we still want fast connections to benefit.
q.setTimeout(1000);
// Add two slots.
q.add({
  method: 'GET',
  uri: '/path/to/file.php?ajax=true'
});
q.add({
  method: 'GET',
  uri: '/path/to/file.php?ajax=true&woe=me'
});
// Flush the queue.
q.flush();
// Pause the queue, retaining the requests.
q.pause();
// Clear our queue and start fresh.
q.clear();
// Add two requests.
q.add({
  method: 'GET',
  uri: '/path/to/file.php?ajax=true'
});
q.add({
  method: 'GET',
  uri: '/path/to/file.php?ajax=true&woe=me'
});
// Remove the last request from the queue.
q.dequeue();
// Flush the queue again.
q.flush();
