/* PublicLibraryProxy class, a useless proxy. */
// 一个没有实现任何访问控制的PublicLibrary类的代理
var PublicLibraryProxy = function(catalog) { // implements Library
  this.library = new PublicLibrary(catalog);
};
PublicLibraryProxy.prototype = {
  findBooks: function(searchString) {
    return this.library.findBooks(searchString);
  },
  checkoutBook: function(book) {
    return this.library.checkoutBook(book);
  },
  returnBook: function(book) {
    return this.library.returnBook(book);
  }
};
