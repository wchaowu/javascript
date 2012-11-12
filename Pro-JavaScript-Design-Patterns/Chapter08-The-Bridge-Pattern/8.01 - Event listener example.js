addEvent(element, 'click', getBeerById);
function getBeerById(e) {
  var id = this.id;
  asyncRequest('GET', 'beer.uri?id=' + id, function(resp) {
    // Callback response.
    console.log('Requested Beer: ' + resp.responseText);
  });
}

// 把事件处理的语句封装到回调函数中，现在我们通过接口而不是实现进行编程
// getBeerById并没有和事件对象捆绑在一起。
function getBeerById(id, callback) {
  // Make request for beer by ID, then return the beer data.
  asyncRequest('GET', 'beer.uri?id=' + id, function(resp) {
    // callback response
    callback(resp.responseText);
  });
}
// 桥接器的使用：事件监听器回调函数
addEvent(element, 'click', getBeerByIdBridge);
function getBeerByIdBridge (e) {
  getBeerById(this.id, function(beer) {
    console.log('Requested Beer: '+beer);
  });
}
