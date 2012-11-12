/* Person Prototype Object. */

var Person = {
  name: 'default name',
  getName: function() {
    return this.name;
  }
};

var reader = clone(Person);
alert(reader.getName()); // This will output 'default name'.
reader.name = 'John Smith';
alert(reader.getName()); // This will now output 'John Smith'.

/* Author Prototype Object. */

var Author = clone(Person);
Author.books = []; // Default value.
Author.getBooks = function() {
  return this.books;
}

var author = [];

author[0] = clone(Author);
author[0].name = 'Dustin Diaz';
author[0].books = ['JavaScript Design Patterns'];

author[1] = clone(Author);
author[1].name = 'Ross Harmes';
author[1].books = ['JavaScript Design Patterns'];

author[1].getName();
author[1].getBooks();
