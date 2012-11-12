/* Generic Page Object. */

Namespace.PageName = {

  // Page constants.
  CONSTANT_1: true,
  CONSTANT_2: 10,

  // Page methods.
  method1: function() {

  },
  method2: function() {

  },

  // Initialization method.
  init: function() {

  }
}

// Invoke the initialization method after the page loads.
addLoadEvent(Namespace.PageName.init);


var GiantCorp = window.GiantCorp || {};

/* RegPage singleton, page handler object. */

GiantCorp.RegPage = {

  // Constants.
  FORM_ID: 'reg-form',
  OUTPUT_ID: 'reg-results',

  // Form handling methods.
  handleSubmit: function(e) {
    e.preventDefault(); // Stop the normal form submission.

    var data = {};
    var inputs = GiantCorp.RegPage.formEl.getElementsByTagName('input');

    // Collect the values of the input fields in the form.
    for(var i = 0, len = inputs.length; i < len; i++) {
      data[inputs[i].name] = inputs[i].value;
    }

    // Send the form values back to the server.
    GiantCorp.RegPage.sendRegistration(data);
  },
  sendRegistration: function(data) {
    // Make an XHR request and call displayResult() when the response is
    // received.
    ...
  },
  displayResult: function(response) {
    // Output the response directly into the output element. We are
    // assuming the server will send back formatted HTML.
    GiantCorp.RegPage.outputEl.innerHTML = response;
  },

  // Initialization method.
  init: function() {
    // Get the form and output elements.
    GiantCorp.RegPage.formEl = $(GiantCorp.RegPage.FORM_ID);
    GiantCorp.RegPage.outputEl = $(GiantCorp.RegPage.OUTPUT_ID);

    // Hijack the form submission.
    addEvent(GiantCorp.RegPage.formEl, 'submit', GiantCorp.RegPage.handleSubmit);
  }
};

// Invoke the initialization method after the page loads.
addLoadEvent(GiantCorp.RegPage.init);

