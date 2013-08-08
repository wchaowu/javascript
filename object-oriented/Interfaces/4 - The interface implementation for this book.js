// Interfaces.

var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var FormItem = new Interface('FormItem', ['save']);

// CompositeForm class

var CompositeForm = function(id, method, action) { // implements Composite, FormItem
   ...
};

...

function addForm(formInstance) {
    Interface.ensureImplements(formInstance, Composite, FormItem);
    // This function will throw an error if a required method is not implemented,
    // halting execution of the function.
    // All code beneath this line will be executed only if the checks pass.
    ...
}	
