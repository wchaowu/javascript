/* Manually making the calls. */

var xhrHandler = XhrManager.createXhrHandler();

/* Get the pageview statistics. */

var callback = { 
  success: function(responseText) {
    var stats = eval('(' + responseText + ')'); // Parse the JSON data.
    displayPageviews(stats); // Display the stats on the page.
  }, 
  failure: function(statusCode) { 
    throw new Error('Asynchronous request for stats failed.');
  } 
};
xhrHandler.request('GET', '/stats/getPageviews/?page=index.html', callback);

/* Get the browser statistics. */

var callback = { 
  success: function(responseText) {
    var stats = eval('(' + responseText + ')'); // Parse the JSON data.
    displayBrowserShare(stats); // Display the stats on the page.
  }, 
  failure: function(statusCode) { 
    throw new Error('Asynchronous request for stats failed.');
  } 
};
xhrHandler.request('GET', '/stats/getBrowserShare/?page=index.html', callback);



/* Using a remote proxy. */
// 把这些调用包装在一个对象中，这个对象应该展现出一个用来访问数据的原生Javascript接口。
// 这样就不会有前例中那样多的重复性代码。
// 这个对象需要实现那个Web服务中的5个方法，每个方法都会执行对Web服务的XHR调用以获取数据，
// 然后将其提供给回调函数
/* PageStats interface. */
// 定义Web服务的接口。其目的在于以后有需要的时候能够换用其他类型的代理
var PageStats = new Interface('PageStats', ['getPageviews', 'getUniques', 
  'getBrowserShare', 'getTopSearchTerms', 'getMostVisitedPages']);

/* StatsProxy singleton. */
// 定义远程代理StatsProxy本身
var StatsProxy = function() { // implements PageStats
  
  /* Private attributes. */
  
  var xhrHandler = XhrManager.createXhrHandler();
  var urls = {
    pageviews: '/stats/getPageviews/',
    uniques: '/stats/getUniques/',
    browserShare: '/stats/getBrowserShare/',
    topSearchTerms: '/stats/getTopSearchTerms/',
    mostVisitedPages: '/stats/getMostVisitedPages/'
  };
  
  /* Private methods. */
  
  function xhrFailure() {
    throw new Error('StatsProxy: Asynchronous request for stats failed.');
  }
  
  function fetchData(url, dataCallback, startDate, endDate, page) {
    var callback = { 
      success: function(responseText) {
        var stats = eval('(' + responseText + ')');
        dataCallback(stats);
      }, 
      failure: xhrFailure
    };
    
    var getVars = [];
    if(startDate != undefined) {
      getVars.push('startDate=' + encodeURI(startDate));
    }
    if(endDate != undefined) {
      getVars.push('endDate=' + encodeURI(endDate));
    }    
    if(page != undefined) {
      getVars.push('page=' + page);
    }
    
    if(getVars.length > 0) {
      url = url + '?' + getVars.join('&');
    }
    
    xhrHandler.request('GET', url, callback);    
  }
  
  /* Public methods. */
  
  return {
    getPageviews: function(callback, startDate, endDate, page) {
      fetchData(urls.pageviews, callback, startDate, endDate, page);
    },
    getUniques: function(callback, startDate, endDate, page) {
      fetchData(urls.uniques, callback, startDate, endDate, page);    
    },
    getBrowserShare: function(callback, startDate, endDate, page) {
      fetchData(urls.browserShare, callback, startDate, endDate, page);    
    },
    getTopSearchTerms: function(callback, startDate, endDate, page) {
      fetchData(urls.topSearchTerms, callback, startDate, endDate, page);    
    },
    getMostVisitedPages: function(callback, startDate, endDate) {
      fetchData(urls.mostVisitedPages, callback, startDate, endDate);    
    }  
  };
}();
