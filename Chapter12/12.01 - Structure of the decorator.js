/* The Bicycle interface. */

var Bicycle = new Interface('Bicycle', ['assemble', 'wash', 'ride', 'repair', 
    'getPrice']);

/* The AcmeComfortCruiser class. */

var AcmeComfortCruiser = function() { // implements Bicycle
  ...
};
AcmeComfortCruiser.prototype = {
  assemble: function() {
    ...
  },
  wash: function() {
    ...
  },
  ride: function() {
    ...
  },
  repair: function() {
    ...
  },
  getPrice: function() {
    return 399.00;
  }
};

/* The BicycleDecorator abstract decorator class. */

var BicycleDecorator = function(bicycle) { // implements Bicycle
  Interface.ensureImplements(bicycle, Bicycle);
  this.bicycle = bicycle;
}
BicycleDecorator.prototype = {
  assemble: function() {
    return this.bicycle.assemble();
  },
  wash: function() {
    return this.bicycle.wash();
  },
  ride: function() {
    return this.bicycle.ride();
  },
  repair: function() {
    return this.bicycle.repair();
  },
  getPrice: function() {
    return this.bicycle.getPrice();
  }
};

/* HeadlightDecorator class. */

var HeadlightDecorator = function(bicycle) { // implements Bicycle
  this.superclass.constructor(bicycle); // Call the superclass's constructor.
}
extend(HeadlightDecorator, BicycleDecorator); // Extend the superclass.
HeadlightDecorator.prototype.assemble = function() {
  return this.bicycle.assemble() + ' Attach headlight to handlebars.';
};
HeadlightDecorator.prototype.getPrice = function() {
  return this.bicycle.getPrice() + 15.00;
};


/* TaillightDecorator class. */

var TaillightDecorator = function(bicycle) { // implements Bicycle
  this.superclass.constructor(bicycle); // Call the superclass's constructor.
}
extend(TaillightDecorator, BicycleDecorator); // Extend the superclass.
TaillightDecorator.prototype.assemble = function() {
  return this.bicycle.assemble() + ' Attach taillight to the seat post.';
};
TaillightDecorator.prototype.getPrice = function() {
  return this.bicycle.getPrice() + 9.00;
};


/* Usage. */

var myBicycle = new AcmeComfortCruiser(); // Instantiate the bicycle.
alert(myBicycle.getPrice()); // Returns 399.00

myBicycle = new TaillightDecorator(myBicycle); // Decorate the bicycle object
                                               // with a taillight.
alert(myBicycle.getPrice()); // Now returns 408.00

myBicycle = new HeadlightDecorator(myBicycle); // Decorate the bicycle object
                                               // again, now with a headlight.
alert(myBicycle.getPrice()); // Now returns 423.00
