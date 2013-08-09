/* Interfaces. */

var Composite = new Interface('Composite', ['add', 'remove', 'getChild',
    'getAllLeaves']);
// 添加使用标签进行搜索的方法
var GalleryItem = new Interface('GalleryItem', ['hide', 'show', 'addTag',
    'getPhotosWithTag']);

/* DynamicGallery class. */

var DynamicGallery = function(id) { // implements Composite, GalleryItem
  this.children = [];
  // 标签
  this.tags = [];
  this.element = document.createElement('div');
  this.element.id = id;
  this.element.className = 'dynamic-gallery';
}
DynamicGallery.prototype = {
  //todo
  addTag: function(tag) {
    this.tags.push(tag);
    for(var node, i = 0; node = this.getChild(i); i++) {
      node.addTag(tag);
    }
  },
  getAllLeaves: function() {
    var leaves = [];
    for(var node, i = 0; node = this.getChild(i); i++) {
      leaves.concat(node.getAllLeaves());
    }
    return leaves;
  },
  // 职责链模式从组合对象中查找对应标签的对象
  getPhotosWithTag: function(tag) {
    // First search in this object's tags; if the tag is found here, we can stop
    // the search and just return all the leaf nodes.
    for(var i = 0, len = this.tags.length; i < len; i++) {
      if(this.tags[i] === tag) {
        return this.getAllLeaves();
      }
    }

    // If the tag isn't found in this object's tags, pass the request down
    // the hierarchy.
    for(var results = [], node, i = 0; node = this.getChild(i); i++) {
      results.concat(node.getPhotosWithTag(tag));
    }
    return results;
  },
  //todo
};

/* GalleryImage class. */
// 在叶类中的实现很简单，返回的结果都只包含叶对象自身。
var GalleryImage = function(src) { // implements Composite, GalleryItem
  this.element = document.createElement('img');
  this.element.className = 'gallery-image';
  this.element.src = src;
  this.tags = [];
}
GalleryImage.prototype = {
  //todo
  addTag: function(tag) {
    this.tags.push(tag);
  },
  getAllLeaves: function() { // Just return this.
    return [this];
  },
  getPhotosWithTag: function(tag) {
    for(var i = 0, len = this.tags.length; i < len; i++) {
      if(this.tags[i] === tag) {
        return [this];
      }
    }
    return []; // Return an empty array if no matches were found.
  },
  //todo
};
