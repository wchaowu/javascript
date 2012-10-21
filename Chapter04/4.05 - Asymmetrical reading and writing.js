var authorClone = clone(Author);
alert(authorClone.name); // Linked to the primative Person.name, which is the 
                         // string 'default name'.
authorClone.name = 'new name'; // A new primative is created and added to the 
                               // authorClone object itself.
alert(authorClone.name); // Now linked to the primative authorClone.name, which 
                         // is the string 'new name'.

authorClone.books.push('new book'); // authorClone.books is linked to the array 
                                    // Author.books. We just modified the 
                                    // prototype object's default value, and all 
                                    // other objects that link to it will now 
                                    // have a new default value there.
authorClone.books = []; // A new array is created and added to the authorClone 
                        // object itself.
authorClone.books.push('new book'); // We are now modifying that new array.

var CompoundObject = {
  string1: 'default value',
  childObject: {
    bool: true,
    num: 10
  }
}

var compoundObjectClone = clone(CompoundObject);

// Bad! Changes the value of CompoundObject.childObject.num.
compoundObjectClone.childObject.num = 5;

// Better. Creates a new object, but compoundObject must know the structure
// of that object, and the defaults. This makes CompoundObject and 
// compoundObjectClone tightly coupled.
compoundObjectClone.childObject = {
  bool: true,
  num: 5
};

// Best approach. Uses a method to create a new object, with the same structure and
// defaults as the original.

var CompoundObject = {};
CompoundObject.string1 = 'default value',
CompoundObject.createChildObject = function() {
  return {
    bool: true,
    num: 10
  }
};
CompoundObject.childObject = CompoundObject.createChildObject();

var compoundObjectClone = clone(CompoundObject);
compoundObjectClone.childObject = CompoundObject.createChildObject();
compoundObjectClone.childObject.num = 5;
