var FormItem = new Interface('FormItem', ['save', 'restore']);

Field.prototype.restore = function() {
  this.element.value = getCookie(this.id);
};

CompositeForm.prototype.restore = function() {
  for(var i = 0, len = this.formComponents.length; i < len; i++) {
    this.formComponents[i].restore();
  }
};

addEvent(window, 'load', contactForm.restore);
