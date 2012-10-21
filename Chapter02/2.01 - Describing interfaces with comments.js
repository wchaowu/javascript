/*

interface Composite {
    function add(child);
    function remove(child);
    function getChild(index);
}

interface FormItem {
    function save();
}

*/

var CompositeForm = function(id, method, action) { // implements Composite, FormItem
    ...
};

// Implement the Composite interface.

CompositeForm.prototype.add = function(child) {
    ...
};
CompositeForm.prototype.remove = function(child) {
    ...
};
CompositeForm.prototype.getChild = function(index) {
    ...
};

// Implement the FormItem interface.

CompositeForm.prototype.save = function() {
    ...
};
