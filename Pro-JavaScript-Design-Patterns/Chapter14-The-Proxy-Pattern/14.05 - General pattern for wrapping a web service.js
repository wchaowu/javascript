/* WebserviceProxy class */
// 从上一个例子中提炼出一个更加通用的Web服务包装模式。
// 不是一个单例，而是一个拥有构造函数的普通类，以便以后进行扩展。
var WebserviceProxy = function() {
  this.xhrHandler = XhrManager.createXhrHandler();
};
WebserviceProxy.prototype = {  
  // 请求错误的处理函数
  _xhrFailure: function(statusCode) {
    throw new Error('StatsProxy: Asynchronous request for stats failed.');
  },
  // 发送请求的函数
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
// 使用这个通用模式时，只需从WebserviceProxy派生一个子类，然后再借助_fetchData方法实现需要的方法即可
// 如果把StatsProxy类实现为WebserviceProxy的子类，其结果大致如下：
/* StatsProxy class, using WebserviceProxy. */

var StatsProxy = function() {}; // implements PageStats
extend(StatsProxy, WebserviceProxy);

/* Implement the needed methods. */
// 借助_fetchData方法实现需要的方法
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
