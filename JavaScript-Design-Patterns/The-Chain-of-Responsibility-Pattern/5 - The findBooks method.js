/* PublicLibrary class. */

var PublicLibrary = function(books) { // implements Library
  //todo
};
PublicLibrary.prototype = {
  // 修改findBooks方法，以便可以根据类别来缩小搜索范文。
  // 如果调用该方法时提供了可选的genres参数，那么搜索将只在属于其指定类别的图书中进行
  findBooks: function(searchString, genres) {
    // If the optional genres argument is given, search for books only in
    // those genres. Use the chain of responsibility to perform the search.
    if(typeof genres === 'array' && genres.length > 0) {
      var requestObject = {
        searchString: searchString,
        genres: genres,
        results: []
      };
      // 在分类中进行搜索
      var responseObject = this.firstGenreCatalog.findBooks(requestObject);
      return responseObject.results;
    }
    // Otherwise, search through all books.
    else {
      var results = [];
      for(var isbn in this.catalog) {
        if(!this.catalog.hasOwnProperty(isbn)) continue;
        if(this.catalog[isbn].getTitle().match(searchString) ||
            this.catalog[isbn].getAuthor().match(searchString)) {
          results.push(this.catalog[isbn]);
        }
      }
      return results;
    }
  },
  checkoutBook: function(book) {
        //todo
   },
  returnBook:function(book) {
  //todo
  },
  addBook: function(newBook) {
        //todo

  }
};

/* GenreCatalog class, used as a superclass for specific catalog classes. */

var GenreCatalog = function() { // implements Catalog
  this.successor = null;
  this.catalog = [];
  this.genreNames = [];
};
GenreCatalog.prototype = {
  _bookMatchesCriteria: function(book) { //todo
   },
  handleFilingRequest: function(book) { //todo
   },
  // 实现GenreCatalog这个超类中的findBooks方法，这个方法将被用在所有子类中，不需要被重写。
  findBooks: function(request) {
    var found = false;
    // 逐一检查请求对象中的每一个类别名称，看看其是否与对象中保存的一组类别名称中的某一个匹配。
    for(var i = 0, len = request.genres.length; i < len; i++) {
      for(var j = 0, nameLen = this.genreNames.length; j < nameLen; j++) {
        if(this.genreNames[j] === request.genres[i]) {
          found = true; // This link in the chain should handle
                        // the request.
          break;
        }
      }
    }
	// 如果匹配，代码的第二部分会逐一检查目录中的所有图书，看看其书名和作者姓名是否与搜索用词匹配。
    if(found) { // Search through this catalog for books that match the search
                // string and aren't already in the results.
      outerloop: for(var i = 0, len = this.catalog.length; i < len; i++) {
        var book = this.catalog[i];
        if(book.getTitle().match(searchString) ||
            book.getAuthor().match(searchString)) {
          for(var j = 0, requestLen = request.results.length; j < requestLen; j++) {
            if(request.results[j].getIsbn() === book.getIsbn()) {
              continue outerloop; // The book is already in the results; skip it.
            }
          }
          // 与搜索名匹配的图书将被添加到请求对象中的results数组中
          request.results.push(book); // The book matches and doesn't already
                                      // appear in the results. Add it.
        }
      }
    }
	// 如果当前目录对象不是链上的最后一环，那么请求将被沿目录链继续下去
    // Continue to pass the request down the chain if the successor is set.
    if(this.successor) {
      return this.successor.findBooks(request);
    }
    // Otherwise, we have reached the end of the chain. Return the request
    // object back up the chain.
    else {
      return request;
    }
  },
  setSuccessor: function(successor) { //todo

}
}



/* SciFiCatalog class. */

var SciFiCatalog = function() { // implements Catalog
  // 在子类中填入一些具体的类别名称
  this.genreNames = ['sci-fi', 'scifi', 'science fiction'];
};
extend(SciFiCatalog, GenreCatalog);
SciFiCatalog.prototype._bookMatchesCriteria = function(book) {
//todo
 };
