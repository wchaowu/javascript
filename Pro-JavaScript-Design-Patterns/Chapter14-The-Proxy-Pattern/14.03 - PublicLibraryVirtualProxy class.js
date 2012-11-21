/* PublicLibraryVirtualProxy class. */
// 假设PublicLibrary的实例化很慢，不能在网页加载的时候立即完成。我们可以为其创建一个虚拟代理。
// 让它把PublicLibrary的实例化推迟到必要的时候
var PublicLibraryVirtualProxy = function(catalog) { // implements Library
  // 把构造函数的参数保存起来，知道有方法被调用时才真正执行本体的实例化
  this.library = null;
  this.catalog = catalog; // Store the argument to the constructor.
};
PublicLibraryVirtualProxy.prototype = {
  _initializeLibrary: function() {
    if(this.library === null) {
      this.library = new PublicLibrary(this.catalog);
    }
  },
  findBooks: function(searchString) {
    this._initializeLibrary();
    return this.library.findBooks(searchString);
  },
  checkoutBook: function(book) {
    this._initializeLibrary();
    return this.library.checkoutBook(book);
  },
  returnBook: function(book) {
    this._initializeLibrary();
    return this.library.returnBook(book);
  }
};
