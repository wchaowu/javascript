/* DynamicGallery class. */

var DynamicGallery = function(id) { // implements Composite, GalleryItem
  ...
}
DynamicGallery.prototype = {
  add: function(child) { ... },
  remove: function(child) { ... },
  getChild: function(i) { ... },
  hide: function() {
    this.element.style.display = 'none';
  },
  show: function() { ... },
  getElement: function() { ... }
};
