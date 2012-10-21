/* WebserviceProxy class */

var WebserviceProxy = function() {
  this.xhrHandler = XhrManager.createXhrHandler();
};
WebserviceProxy.prototype = {  
  _xhrFailure: function(statusCode) {
    throw new Error('StatsProxy: Asynchronous request for stats failed.');
  },
  _fetchData: function(url, dataCallback, getVars) {
    var that = this;
    var callback = { 
      success: function(responseText) {
        var obj = eval('(' + responseText + ')');
        dataCallback(obj);
      }, 
      failure: that._xhrFailure
    };
    
    var getVarArray = [];
    for(varName in getVars) {
      getVarArray.push(varName + '=' + getVars[varName]);
    }
    if(getVarArray.length > 0) {
      url = url + '?' + getVarArray.join('&');
    }
    
    xhrHandler.request('GET', url, callback);    
  }
};

/* StatsProxy class, using WebserviceProxy. */

var StatsProxy = function() {}; // implements PageStats
extend(StatsProxy, WebserviceProxy);

/* Implement the needed methods. */

StatsProxy.prototype.getPageviews = function(callback, startDate, endDate, 
    page) {
  this._fetchData('/stats/getPageviews/', callback, { 
    'startDate': startDate, 
    'endDate': endDate, 
    'page': page 
  });
};
StatsProxy.prototype.getUniques = function(callback, startDate, endDate, 
    page) {
  this._fetchData('/stats/getUniques/', callback, { 
    'startDate': startDate, 
    'endDate': endDate, 
    'page': page 
  });
};
StatsProxy.prototype.getBrowserShare = function(callback, startDate, endDate, 
   page) {
  this._fetchData('/stats/getBrowserShare/', callback, { 
    'startDate': startDate, 
    'endDate': endDate, 
    'page': page 
  });
};
StatsProxy.prototype.getTopSearchTerms = function(callback, startDate, 
    endDate, page) {
  this._fetchData('/stats/getTopSearchTerms/', callback, { 
    'startDate': startDate, 
    'endDate': endDate, 
    'page': page 
  });
};
StatsProxy.prototype.getMostVisitedPages = function(callback, startDate, 
    endDate) {
  this._fetchData('/stats/getMostVisitedPages/', callback, { 
    'startDate': startDate, 
    'endDate': endDate 
  });
};
