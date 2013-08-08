// 向FormItem添加操作
var FormItem = new Interface('FormItem', ['save', 'restore']);
// 在超类Field中添加实现，以供其所有子类直接继承使用
Field.prototype.restore = function() {
  this.element.value = getCookie(this.id);
};
// 为组合表单添加同样的操作
CompositeForm.prototype.restore = function() {
  for(var i = 0, len = this.formComponents.length; i < len; i++) {
    this.formComponents[i].restore();
  }
};

addEvent(window, 'load', contactForm.restore);
