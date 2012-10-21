/* PublicLibrary class, with genre catalogs in a chain of responsibility. */

var PublicLibrary = function(books, firstGenreCatalog) { // implements Library
  this.catalog = {};
  this.firstGenreCatalog = firstGenreCatalog;

  for(var i = 0, len = books.length; i < len; i++) {
    this.addBook(books[i]);
  }
};
PublicLibrary.prototype = {
  findBooks: function(searchString) { ... },
  checkoutBook: function(book) { ... },
  returnBook: function(book) { ... },
  addBook: function(newBook) {
    // Always add the book to the main catalog.
    this.catalog[newBook.getIsbn()] = { book: newBook, available: true };

    // Try to add the book to each genre catalog.
    this.firstGenreCatalog.handleFilingRequest(newBook);
  }
};


// -----------------------------------------------------------------------------
// Usage example.
// -----------------------------------------------------------------------------

 // Instantiate the catalogs.
var biographyCatalog = new BiographyCatalog();
var fantasyCatalog = new FantasyCatalog();
var mysteryCatalog = new MysteryCatalog();
var nonFictionCatalog = new NonFictionCatalog();
var sciFiCatalog = new SciFiCatalog();

// Set the links in the chain.
biographyCatalog.setSuccessor(fantasyCatalog);
fantasyCatalog.setSuccessor(mysteryCatalog);
mysteryCatalog.setSuccessor(nonFictionCatalog);
nonFictionCatalog.setSuccessor(sciFiCatalog);

// Give the first link in the chain as an argument to the constructor.
var myLibrary = new PublicLibrary(books, biographyCatalog);

// You can add links to the chain whenever you like.
var historyCatalog = new HistoryCatalog();
sciFiCatalog.setSuccessor(historyCatalog);
