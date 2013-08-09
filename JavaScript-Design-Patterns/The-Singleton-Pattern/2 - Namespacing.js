/* Declared globally.
 * 用作命名空间：将自己的所有代码组织在一个全局变量名下，方便日后维护，示例程序
  * */

function findProduct(id) {
  //todo
}



// Later in your page, another programmer adds...
var resetProduct = $('reset-product-button');
var findProduct = $('find-product-button'); // The findProduct function just got
                                            // overwritten.


/* Using a namespace. */

var MyNamespace = {
  findProduct: function(id) {
	 //todo ...
  }
  // Other methods can go here as well.
};

// Later in your page, another programmer adds...
var resetProduct = $('reset-product-button');
var findProduct = $('find-product-button'); // Nothing was overwritten.

/* GiantCorp namespace. */
var GiantCorp = {};

GiantCorp.Common = {
  // A singleton with common methods used by all objects and modules.
};

GiantCorp.ErrorCodes = {
  // An object literal used to store data.
};

GiantCorp.PageHandler = {
  // A singleton with page specific methods and attributes.
};
