/* PublicLibrary class. */

var PublicLibrary = function(books) { // implements Library
  ...
};
PublicLibrary.prototype = {
  findBooks: function(searchString, genres) {
    // If the optional genres argument is given, search for books only in
    // those genres. Use the chain of responsibility to perform the search.
    if(typeof genres === 'array' && genres.length > 0) {
      var requestObject = {
        searchString: searchString,
        genres: genres,
        results: []
      };
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
  checkoutBook: function(book) { ... },
  returnBook: function(book) { ... },
  addBook: function(newBook) { ... }
};

/* GenreCatalog class, used as a superclass for specific catalog classes. */

var GenreCatalog = function() { // implements Catalog
  this.successor = null;
  this.catalog = [];
  this.genreNames = [];
};
GenreCatalog.prototype = {
  _bookMatchesCriteria: function(book) { ... }
  handleFilingRequest: function(book) { ... },
  findBooks: function(request) {
    var found = false;
    for(var i = 0, len = request.genres.length; i < len; i++) {
      for(var j = 0, nameLen = this.genreNames.length; j < nameLen; j++) {
        if(this.genreNames[j] === request.genres[i]) {
          found = true; // This link in the chain should handle
                        // the request.
          break;
        }
      }
    }

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
          request.results.push(book); // The book matches and doesn't already
                                      // appear in the results. Add it.
        }
      }
    }

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
  setSuccessor: function(successor) { ... }
};


/* SciFiCatalog class. */

var SciFiCatalog = function() { // implements Catalog
  this.genreNames = ['sci-fi', 'scifi', 'science fiction'];
};
extend(SciFiCatalog, GenreCatalog);
SciFiCatalog.prototype._bookMatchesCriteria = function(book) { ... };
