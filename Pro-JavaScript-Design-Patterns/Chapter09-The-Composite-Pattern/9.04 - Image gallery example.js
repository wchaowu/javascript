// Interfaces.
// 创建图片库和图片接口
var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var GalleryItem = new Interface('GalleryItem', ['hide', 'show']);


// DynamicGallery class.
// 创建动态图片库类
var DynamicGallery = function(id) { // implements Composite, GalleryItem
  this.children = [];

  this.element = document.createElement('div');
  this.element.id = id;
  this.element.className = 'dynamic-gallery';
}

DynamicGallery.prototype = {

  // Implement the Composite interface.
  // 添加子元素
  add: function(child) {
    Interface.ensureImplements(child, Composite, GalleryItem);
    this.children.push(child);
    this.element.appendChild(child.getElement());
  },
  // 移除子元素
  remove: function(child) {
    for(var node, i = 0; node = this.getChild(i); i++) {
      if(node == child) {
        this.formComponents[i].splice(i, 1);
        break;
      }
    }
    this.element.removeChild(child.getElement());
  },
  // 获取子元素
  getChild: function(i) {
    return this.children[i];
  },

  // Implement the GalleryItem interface.
  // 隐藏该图片库的所有子元素
  hide: function() {
    for(var node, i = 0; node = this.getChild(i); i++) {
      node.hide();
    }
    this.element.style.display = 'none';
  },
  // 显示该图片库的所有子元素
  show: function() {
    this.element.style.display = 'block';
    for(var node, i = 0; node = this.getChild(i); i++) {
      node.show();
    }    
  },
  
  // Helper methods.
  // 获取图片库的dom节点
  getElement: function() {
    return this.element;
  }
};

// GalleryImage class.
// 图片类
var GalleryImage = function(src) { // implements Composite, GalleryItem
  this.element = document.createElement('img');
  this.element.className = 'gallery-image';
  this.element.src = src;
}

GalleryImage.prototype = {

  // Implement the Composite interface.

  add: function() {},       // This is a leaf node, so we don't
  remove: function() {},    // implement these methods, we just
  getChild: function() {},  // define them.

  // Implement the GalleryItem interface.
  
  hide: function() {
    this.element.style.display = 'none';
  },
  show: function() {
    this.element.style.display = ''; // Restore the display attribute to its 
                                     // previous setting.
  },
  
  // Helper methods.
  
  getElement: function() {
    return this.element;
  }
};

// Usage.

var topGallery = new DynamicGallery('top-gallery');

topGallery.add(new GalleryImage('/img/image-1.jpg'));
topGallery.add(new GalleryImage('/img/image-2.jpg'));
topGallery.add(new GalleryImage('/img/image-3.jpg'));

var vacationPhotos = new DynamicGallery('vacation-photos');

for(var i = 0; i < 30; i++) {
  vacationPhotos.add(new GalleryImage('/img/vac/image-' + i + '.jpg'));
}

topGallery.add(vacationPhotos);
topGallery.show();      // Show the main gallery,
vacationPhotos.hide();  // but hide the vacation gallery.
