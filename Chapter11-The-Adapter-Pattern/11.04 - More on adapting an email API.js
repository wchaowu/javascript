var substitutionObject = {
  name: "world"
  place: "Google"
};
var text = 'Hello {name}, welcome to {place}';
var replacedText = DED.util.substitute(text, substitutionObject);
console.log(replacedText); 
// produces "Hello world, welcome to Google"


fooMail.getMail(function(text) {
  $('message-pane').innerHTML = text;
});

var dedMailtoFooMailAdapter = {};
dedMailtoFooMailAdapter.getMail = function(id, callback) {
  dedMail.getMail(id, function(resp) {
    var resp = eval('('+resp+')');
    var details =  '<p><strong>From:</strong> {from}<br>';
    details += '<strong>Sent:</strong> {date}</p>';
    details += '<p><strong>Message:</strong><br>';
    details += '{message}</p>';
    callback(DED.util.substitute(details, resp));
  });
};
// Other methods needed to adapt dedMail to the fooMail interface.
...

// Assign the adapter to the fooMail variable.
fooMail = dedMailtoFooMailAdapter;
