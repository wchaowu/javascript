var Book = function(isbn, title, author) { // implements Publication
  this.setIsbn(isbn);
  this.setTitle(title);
  this.setAuthor(author);
}

Book.prototype = {
  _checkIsbn: function(isbn) {
    ...
  },
  getIsbn: function() {
    return this._isbn;
  },
  setIsbn: function(isbn) {
    if(!this._checkIsbn(isbn)) throw new Error('Book: Invalid ISBN.');
    this._isbn = isbn;
  },

  getTitle: function() {
    return this._title;
  },
  setTitle: function(title) {
    this._title = title || 'No title specified';
  },

  getAuthor: function() {
    return this._author;
  },
  setAuthor: function(author) {
    this._author = author || 'No author specified';
  },
  
  display: function() {
    ...
  }
};
