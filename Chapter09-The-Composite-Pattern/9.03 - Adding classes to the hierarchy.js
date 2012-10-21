/* CompositeFieldset class. */

var CompositeFieldset = function(id, legendText) { // implements Composite, FormItem
  this.components = {};

  this.element = document.createElement('fieldset');
  this.element.id = id;

  if(legendText) { // Create a legend if the optional second 
                   // argument is set.
    this.legend = document.createElement('legend');
    this.legend.appendChild(document.createTextNode(legendText);
    this.element.appendChild(this.legend);
  }
};

CompositeFieldset.prototype.add = function(child) {
  Interface.ensureImplements(child, Composite, FormItem);
  this.components[child.getElement().id] = child;
  this.element.appendChild(child.getElement());
};

CompositeFieldset.prototype.remove = function(child) {
  delete this.components[child.getElement().id];
};

CompositeFieldset.prototype.getChild = function(id) {
  if(this.components[id] != undefined) {
    return this.components[id];
  }
  else {
    return null;
  }
};

CompositeFieldset.prototype.save = function() {
  for(var id in this.components) {
    if(!this.components.hasOwnProperty(id)) continue;
    this.components[id].save();
  }
};

CompositeFieldset.prototype.restore = function() {
  for(var id in this.components) {
    if(!this.components.hasOwnProperty(id)) continue;
    this.components[id].restore();
  }
};

CompositeFieldset.prototype.getElement = function() { 
  return this.element; 
};


/* Usage. */

var contactForm = new CompositeForm('contact-form', 'POST', 'contact.php');

var nameFieldset = new CompositeFieldset('name-fieldset');
nameFieldset.add(new InputField('first-name', 'First Name'));
nameFieldset.add(new InputField('last-name', 'Last Name'));
contactForm.add(nameFieldset);

var addressFieldset = new CompositeFieldset('address-fieldset');
addressFieldset.add(new InputField('address', 'Address'));
addressFieldset.add(new InputField('city', 'City'));
addressFieldset.add(new SelectField('state', 'State', stateArray));
addressFieldset.add(new InputField('zip', 'Zip'));
contactForm.add(addressFieldset);

contactForm.add(new TextareaField('comments', 'Comments'));

body.appendChild(contactForm.getElement());

addEvent(window, 'unload', contactForm.save);
addEvent(window, 'load', contactForm.restore);

addEvent('save-button', 'click', nameFieldset.save);
addEvent('restore-button', 'click', nameFieldset.restore);
