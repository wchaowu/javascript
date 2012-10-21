// Without chaining:
addEvent($('example'), 'click', function() {
  setStyle(this, 'color', 'green');
  show(this);
});

// With chaining:
$('example').addEvent('click', function() {
  $(this).setStyle('color', 'green').show();
});
