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

/* PageStats interface. */

var PageStats = new Interface('PageStats', ['getPageviews', 'getUniques', 
  'getBrowserShare', 'getTopSearchTerms', 'getMostVisitedPages']);

/* StatsProxy singleton. */

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
