/* DataParser singleton, converts character delimited strings into arrays. */ 
/*   Now using true private methods. */

GiantCorp.DataParser = (function() {
  // Private attributes.
  var whitespaceRegex = /\s+/;
  
  // Private methods.
  function stripWhitespace(str) {
    return str.replace(whitespaceRegex, '');
  }
  function stringSplit(str, delimiter) {
    return str.split(delimiter);
  }
  
  // Everything returned in the object literal is public, but can access the
  // members in the closure created above.
  return { 
    // Public method.
    stringToArray: function(str, delimiter, stripWS) {
      if(stripWS) {
        str = stripWhitespace(str);
      }
      var outputArray = stringSplit(str, delimiter);
      return outputArray;
    }
  };
})(); // Invoke the function and assign the returned object literal to 
     // GiantCorp.DataParser.
