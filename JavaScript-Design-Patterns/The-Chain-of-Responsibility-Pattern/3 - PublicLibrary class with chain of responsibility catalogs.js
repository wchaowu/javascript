/* PublicLibrary class, with genre catalogs in a chain of responsibility. */
// 改进方法
var PublicLibrary = function(books, firstGenreCatalog) { // implements Library
  this.catalog = {};
  this.firstGenreCatalog = firstGenreCatalog;

  for(var i = 0, len = books.length; i < len; i++) {
    this.addBook(books[i]);
  }
};
PublicLibrary.prototype = {
  findBooks: function(searchString) { //todo },
  checkoutBook: function(book) { //todo },
  returnBook: function(book) { //todo },
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
// 这个例子中，原来的链上有5个环节，第6个环节是后来加的。这意味着图书馆每增加一本书都会通过调用链上第一个环节的
// handleFilingRequest方法发起对该书的编目请求。该请求将沿目录链逐一经过6个目录，最后从链尾离开。
// 链上新增的任何目录都会被挂到链尾。
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
