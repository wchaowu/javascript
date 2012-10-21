/* Interfaces. */

var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var FormItem = new Interface('FormItem', ['save']);

/* CompositeForm class. */

var CompositeForm = function(id, method, action) { // implements Composite, FormItem
  this.formComponents = [];

  this.element = document.createElement('form');
  this.element.id = id;
  this.element.method = method || 'POST';
  this.element.action = action || '#';
};

CompositeForm.prototype.add = function(child) {
  Interface.ensureImplements(child, Composite, FormItem);
  this.formComponents.push(child);
  this.element.appendChild(child.getElement());
};

CompositeForm.prototype.remove = function(child) {
  for(var i = 0, len = this.formComponents.length; i < len; i++) {
    if(this.formComponents[i] === child) {
      this.formComponents.splice(i, 1); // Remove one element from the array at 
                                        // position i.
      break;
    }
  }
};

CompositeForm.prototype.getChild = function(i) {
  return this.formComponents[i];
};

CompositeForm.prototype.save = function() {
  for(var i = 0, len = this.formComponents.length; i < len; i++) {
    this.formComponents[i].save();
  }
};

CompositeForm.prototype.getElement = function() { 
  return this.element; 
};

/* Field class, abstract. */

var Field = function(id) { // implements Composite, FormItem
  this.id = id;
  this.element;
};

Field.prototype.add = function() {};
Field.prototype.remove = function() {};
Field.prototype.getChild = function() {};

Field.prototype.save = function() {
  setCookie(this.id, this.getValue);
};

Field.prototype.getElement = function() { 
  return this.element; 
};

Field.prototype.getValue = function() { 
  throw new Error('Unsupported operation on the class Field.'); 
};

/* InputField class. */

var InputField = function(id, label) { // implements Composite, FormItem
  Field.call(this, id);

  this.input = document.createElement('input');
  this.input.id = id;

  this.label = document.createElement('label');
  var labelTextNode = document.createTextNode(label);
  this.label.appendChild(labelTextNode);

  this.element = document.createElement('div');
  this.element.className = 'input-field';
  this.element.appendChild(this.label);
  this.element.appendChild(this.input);
};
extend(InputField, Field); // Inherit from Field.

InputField.prototype.getValue = function() { 
  return this.input.value;
};

/* TextareaField class. */

var TextareaField = function(id, label) { // implements Composite, FormItem
  Field.call(this, id);

  this.textarea = document.createElement('textarea');
  this.textarea.id = id;

  this.label = document.createElement('label');
  var labelTextNode = document.createTextNode(label);
  this.label.appendChild(labelTextNode);

  this.element = document.createElement('div');
  this.element.className = 'input-field';
  this.element.appendChild(this.label);
  this.element.appendChild(this.textarea);
};
extend(TextareaField, Field); // Inherit from Field.

TextareaField.prototype.getValue = function() { 
  return this.textarea.value;
};

/* SelectField class. */

var SelectField = function(id, label) { // implements Composite, FormItem
  Field.call(this, id);

  this.select = document.createElement('select');
  this.select.id = id;

  this.label = document.createElement('label');
  var labelTextNode = document.createTextNode(label);
  this.label.appendChild(labelTextNode);

  this.element = document.createElement('div');
  this.element.className = 'input-field';
  this.element.appendChild(this.label);
  this.element.appendChild(this.select);
};
extend(SelectField, Field); // Inherit from Field.

SelectField.prototype.getValue = function() {
  return this.select.options[this.select.selectedIndex].value;
};


/* Usage. */

var contactForm = new CompositeForm('contact-form', 'POST', 'contact.php');

contactForm.add(new InputField('first-name', 'First Name'));
contactForm.add(new InputField('last-name', 'Last Name'));
contactForm.add(new InputField('address', 'Address'));
contactForm.add(new InputField('city', 'City'));
contactForm.add(new SelectField('state', 'State', stateArray)); // var stateArray =
    [{'al', 'Alabama'}, ...]
contactForm.add(new InputField('zip', 'Zip'));
contactForm.add(new TextareaField('comments', 'Comments'));

addEvent(window, 'unload', contactForm.save);
