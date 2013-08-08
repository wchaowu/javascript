var Book = function(newIsbn, newTitle, newAuthor) { // implements Publication

  // Private attributes.
  var isbn, title, author;

  // Private method.
  function checkIsbn(isbn) {
    ... 
  }  

  // Privileged methods.
  this.getIsbn = function() {
    return isbn;
  };
  this.setIsbn = function(newIsbn) {
    if(!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN.');
    isbn = newIsbn;
  };

  this.getTitle = function() {
    return title;
  };
  this.setTitle = function(newTitle) {
    title = newTitle || 'No title specified';
  };

  this.getAuthor = function() {
    return author;
  };
  this.setAuthor = function(newAuthor) {
    author = newAuthor || 'No author specified';
  };

  // Constructor code.
  this.setIsbn(newIsbn);
  this.setTitle(newTitle);
  this.setAuthor(newAuthor);
};

// Public, non-privileged methods.
Book.prototype = {
  display: function() {
    ...
  }
};
