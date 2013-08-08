/* GenreCatalog class, used as a superclass for specific catalog classes. */
// 链上的对象，分类目录对象的实现
var GenreCatalog = function() { // implements Catalog
  this.successor = null;
  this.catalog = [];
};
GenreCatalog.prototype = {
  _bookMatchesCriteria: function(book) {
    return false; // Default implementation; this method will be overriden in
                  // the subclasses.
  }
  handleFilingRequest: function(book) {
    // Check to see if the book belongs in this catagory.
    if(this._bookMatchesCriteria(book)) {
      this.catalog.push(book);
    }
    // Pass the request on to the next link.
    if(this.successor) {
      this.successor.handleFilingRequest(book);
    }
  },
  findBooks: function(request) {
    if(this.successor) {
      return this.successor.findBooks(request);
    }
  },
  setSuccessor: function(successor) {
    if(Interface.ensureImplements(successor, Catalog) {
      this.successor = successor;
    }
  }
};


/* SciFiCatalog class. */
// 从这个超类中派生一个分类目录
var SciFiCatalog = function() {}; // implements Catalog
extend(SciFiCatalog, GenreCatalog);
// 这个方法对图书的书名和类别进行检查，判断是否二者中有一个能够匹配搜索用词。
SciFiCatalog.prototype._bookMatchesCriteria = function(book) {
  var genres = book.getGenres();
  if(book.getTitle().match(/space/i)) {
    return true;
  }
  for(var i = 0, len = genres.length; i < len; i++) {
    var genre = genres[i].toLowerCase();
    if(genres === 'sci-fi' || genres === 'scifi' || genres === 'science fiction') {
      return true;
    }
  }
  return false;
};
