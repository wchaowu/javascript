/* Interfaces. */

var Publication = new Interface('Publication', ['getIsbn', 'setIsbn', 'getTitle',
    'setTitle', 'getAuthor', 'setAuthor', 'getGenres', 'setGenres', 'display']);
var Library = new Interface('Library', [‘addBook’, 'findBooks', 'checkoutBook',
    'returnBook']);
var Catalog = new Interface('Catalog', ['handleFilingRequest', 'findBooks',
    'setSuccessor']);

/* Book class. */

var Book = function(isbn, title, author, genres) { // implements Publication
  ...
}


/* PublicLibrary class. */

var PublicLibrary = function(books) { // implements Library
  this.catalog = {};
  for(var i = 0, len = books.length; i < len; i++) {
    this.addBook(books[i]);
  }
};
PublicLibrary.prototype = {
  findBooks: function(searchString) {
    var results = [];
    for(var isbn in this.catalog) {
      if(!this.catalog.hasOwnProperty(isbn)) continue;
      if(this.catalog[isbn].getTitle().match(searchString) ||
          this.catalog[isbn].getAuthor().match(searchString)) {
        results.push(this.catalog[isbn]);
      }
    }
    return results;
  },
  checkoutBook: function(book) {
    var isbn = book.getIsbn();
    if(this.catalog[isbn]) {
      if(this.catalog[isbn].available) {
        this.catalog[isbn].available = false;
        return this.catalog[isbn];
      }
      else {
        throw new Error('PublicLibrary: book ' + book.getTitle() +
            ' is not currently available.');
      }
    }
    else {
      throw new Error('PublicLibrary: book ' + book.getTitle() + ' not found.');
    }
  },
  returnBook: function(book) {
    var isbn = book.getIsbn();
    if(this.catalog[isbn]) {
      this.catalog[isbn].available = true;
    }
    else {
      throw new Error('PublicLibrary: book ' + book.getTitle() + ' not found.');
    }
  },
  addBook: function(newBook) {
    this.catalog[newBook.getIsbn()] = { book: newBook, available: true };
  }
};
