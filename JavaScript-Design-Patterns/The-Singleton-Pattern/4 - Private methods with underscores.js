/* DataParser singleton, converts character delimited strings into arrays. */ 

GiantCorp.DataParser = {
  // Private methods.
  _stripWhitespace: function(str) {
    return str.replace(/\s+/, '');
  },
  _stringSplit: function(str, delimiter) {
    return str.split(delimiter);
  },
  // Public method.
  stringToArray: function(str, delimiter, stripWS) {
    if(stripWS) {
      str = this._stripWhitespace(str);  // 在单例模式中，推荐使用 GiantCorp.DataParser._stripWhitespace() 这种调用方式，防止弄错了this作用域
    }
    var outputArray = this._stringSplit(str, delimiter);
    return outputArray;
  }
};
