/* Interfaces. */
// 创建那些组合对象和叶对象需要实现的两个接口
var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var FormItem = new Interface('FormItem', ['save']);

/* CompositeForm class. */

// 创建组合表单对象，继承 Composite 和 FormItem 接口
var CompositeForm = function(id, method, action) { // implements Composite, FormItem
  this.formComponents = [];

  this.element = document.createElement('form');
  this.element.id = id;
  this.element.method = method || 'POST';
  this.element.action = action || '#';
};

// add方法：为组合表单添加一个子元素，要求子元素为实现了Composite和FormItem方法
CompositeForm.prototype.add = function(child) {
  Interface.ensureImplements(child, Composite, FormItem);
  this.formComponents.push(child);
  this.element.appendChild(child.getElement());
};

// 从组合表单中移除子元素
CompositeForm.prototype.remove = function(child) {
  for(var i = 0, len = this.formComponents.length; i < len; i++) {
    if(this.formComponents[i] === child) {
      this.formComponents.splice(i, 1); // Remove one element from the array at 
                                        // position i.
      break;
    }
  }
};

// 获取组合表单的子元素
CompositeForm.prototype.getChild = function(i) {
  return this.formComponents[i];
};

// save方法，遍历表单所有子元素，并执行其save方法
CompositeForm.prototype.save = function() {
  for(var i = 0, len = this.formComponents.length; i < len; i++) {
    this.formComponents[i].save();
  }
};

// 获取组合表单的dom节点
CompositeForm.prototype.getElement = function() { 
  return this.element; 
};

/* Field class, abstract. */
// 叶对象类，实现Composite和FormItem方法
var Field = function(id) { // implements Composite, FormItem
  this.id = id;
  this.element;
};

// 由于叶节点不会有子对象，所以从Composite接口中继承过来的以下方法实现为空函数
Field.prototype.add = function() {};
Field.prototype.remove = function() {};
Field.prototype.getChild = function() {};
// save方法，保存到Cookie中
Field.prototype.save = function() {
  // 用getValue方法获取元素的值，每个子类中的getValue实现各不相同
  setCookie(this.id, this.getValue); 
};
// 获取叶对象的dom节点
Field.prototype.getElement = function() { 
  return this.element; 
};

Field.prototype.getValue = function() { 
  throw new Error('Unsupported operation on the class Field.'); 
};

/* InputField class. */
// 创建一个输入域
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
// 继承自Field类，从Field类继承方法，并实现了自己的getValue方法
extend(InputField, Field); // Inherit from Field.

InputField.prototype.getValue = function() { 
  return this.input.value;
};

/* TextareaField class. */
// 创建一个文本域
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
contactForm.add(new SelectField('state', 'State', stateArray)); 
// var stateArray = [{'al', 'Alabama'}, ...]
contactForm.add(new InputField('zip', 'Zip'));
contactForm.add(new TextareaField('comments', 'Comments'));
// 调用CompositeForm的save方法，既可以依次获取到每一个叶元素的值进行保存
addEvent(window, 'unload', contactForm.save);
