/* DisplayModule interface. */

var DisplayModule = new Interface('DisplayModule', ['show', 'hide', 'state']);

/* DialogBox class. */

var DialogBox = function() { // implements DisplayModule
  ...  
};
DialogBox.prototype = {
  show: function(header, body, footer) { // Sets the content and shows the
    ...                                  // dialog box.
  },
  hide: function() { // Hides the dialog box.
    ...
  },
  state: function() { // Returns 'visible' or 'hidden';
    ...
  }
};

/* DialogBoxManager singleton. */

var DialogBoxManager = (function() {
  var created = []; // Stores created instances.
  
  return {
    displayDialogBox: function(header, body, footer) {
      var inUse = this.numberInUse(); // Find the number currently in use.
      if(inUse > created.length) {
        created.push(this.createDialogBox()); // Augment it if need be.
      }
      created[inUse].show(header, body, footer); // Show the dialog box.
    },
    createDialogBox: function() { // Factory method.
      var db = new DialogBox();
      return db;
    },
    numberInUse: function() {
      var inUse = 0;
      for(var i = 0, len = created.length; i < len; i++) {
        if(created[i].state() === 'visible') {
          inUse++;
        }
      }
      return inUse;
    }
  };
})();
