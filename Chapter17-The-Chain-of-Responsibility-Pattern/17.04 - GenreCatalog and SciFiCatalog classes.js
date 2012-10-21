/* GenreCatalog class, used as a superclass for specific catalog classes. */

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

var SciFiCatalog = function() {}; // implements Catalog
extend(SciFiCatalog, GenreCatalog);
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
