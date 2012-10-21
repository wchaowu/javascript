/* Interfaces. */

var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var GalleryItem = new Interface('GalleryItem', ['hide', 'show']);

/* DynamicGallery class. */

var DynamicGallery = function(id) { // implements Composite, GalleryItem
  this.children = [];
  this.element = document.createElement('div');
  this.element.id = id;
  this.element.className = 'dynamic-gallery';
}
DynamicGallery.prototype = {
  add: function(child) {
    Interface.ensureImplements(child, Composite, GalleryItem);
    this.children.push(child);
    this.element.appendChild(child.getElement());
  },
  remove: function(child) {
    for(var node, i = 0; node = this.getChild(i); i++) {
      if(node == child) {
        this.formComponents[i].splice(i, 1);
        break;
      }
    }
    this.element.removeChild(child.getElement());
  },
  getChild: function(i) {
    return this.children[i];
  },

  hide: function() {
    for(var node, i = 0; node = this.getChild(i); i++) {
      node.hide();
    }
    this.element.style.display = 'none';
  },
  show: function() {
    this.element.style.display = '';
    for(var node, i = 0; node = this.getChild(i); i++) {
      node.show();
    }
  },

  getElement: function() {
    return this.element;
  }
};

/* GalleryImage class. */

var GalleryImage = function(src) { // implements Composite, GalleryItem
  this.element = document.createElement('img');
  this.element.className = 'gallery-image';
  this.element.src = src;
}
GalleryImage.prototype = {
  add: function() {},       // This is a leaf node, so we don't
  remove: function() {},    // implement these methods, we just
  getChild: function() {},  // define them.

  hide: function() {
    this.element.style.display = 'none';
  },
  show: function() {
    this.element.style.display = '';
  },

  getElement: function() {
    return this.element;
  }
};
