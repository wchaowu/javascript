/* Class Person. */

function Person(name) {
  this.name = name;
}

Person.prototype.getName = function() {
  return this.name;
}

var reader = new Person('John Smith');
reader.getName();
