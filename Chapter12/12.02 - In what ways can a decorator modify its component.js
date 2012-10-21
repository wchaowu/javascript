HeadlightDecorator.prototype.getPrice = function() {
  return this.bicycle.getPrice() + 15.00;
};

var myBicycle = new AcmeComfortCruiser(); // Instantiate the bicycle.
alert(myBicycle.getPrice()); // Returns 399.00

myBicycle = new HeadlightDecorator(myBicycle); // Decorate the bicycle object
                                               // with the first headlight.
myBicycle = new HeadlightDecorator(myBicycle); // Decorate the bicycle object
                                               // with the second headlight.
myBicycle = new TaillightDecorator(myBicycle); // Decorate the bicycle object
                                               // with a taillight.
alert(myBicycle.getPrice()); // Now returns 438.00


/* FrameColorDecorator class. */

var FrameColorDecorator = function(bicycle, frameColor) { // implements Bicycle
  this.superclass.constructor(bicycle); // Call the superclass's constructor.
  this.frameColor = frameColor;
}
extend(FrameColorDecorator, BicycleDecorator); // Extend the superclass.
FrameColorDecorator.prototype.assemble = function() {
  return 'Paint the frame ' + this.frameColor + ' and allow it to dry. ' + 
      this.bicycle.assemble();
};
FrameColorDecorator.prototype.getPrice = function() {
  return this.bicycle.getPrice() + 30.00;
}; 

var myBicycle = new AcmeComfortCruiser(); // Instantiate the bicycle.
myBicycle = new FrameColorDecorator(myBicycle, 'red'); // Decorate the bicycle
                                               // object with the frame color.
myBicycle = new HeadlightDecorator(myBicycle); // Decorate the bicycle object
                                               // with the first headlight.
myBicycle = new HeadlightDecorator(myBicycle); // Decorate the bicycle object
                                               // with the second headlight.
myBicycle = new TaillightDecorator(myBicycle); // Decorate the bicycle object
                                               // with a taillight.
alert(myBicycle.assemble()); 
/* Returns:
    "Paint the frame red and allow it to dry. (Full instructions for assembling
    the bike itself go here) Attach headlight to handlebars. Attach headlight 
    to handlebars. Attach taillight to the seat post."
*/




/* LifetimeWarrantyDecorator class. */

var LifetimeWarrantyDecorator = function(bicycle) { // implements Bicycle
  this.superclass.constructor(bicycle); // Call the superclass's constructor.
}
extend(LifetimeWarrantyDecorator, BicycleDecorator); // Extend the superclass.
LifetimeWarrantyDecorator.prototype.repair = function() {
  return 'This bicycle is covered by a lifetime warranty. Please take it to ' +
      'an authorized Acme Repair Center.';
};
LifetimeWarrantyDecorator.prototype.getPrice = function() {
  return this.bicycle.getPrice() + 199.00;
};

/* TimedWarrantyDecorator class. */

var TimedWarrantyDecorator = function(bicycle, coverageLengthInYears) { 
    // implements Bicycle
  this.superclass.constructor(bicycle); // Call the superclass's constructor.
  this.coverageLength = coverageLengthInYears;
  this.expDate = new Date();
  var coverageLengthInMs = this.coverageLength * 365 * 24 * 60 * 60 * 1000;
  expDate.setTime(expDate.getTime() + coverageLengthInMs);
}
extend(TimedWarrantyDecorator, BicycleDecorator); // Extend the superclass.
TimedWarrantyDecorator.prototype.repair = function() {
  var repairInstructions;
  var currentDate = new Date();
  if(currentDate < expDate) {
    repairInstructions = 'This bicycle is currently covered by a warranty. ' +
        'Please take it to an authorized Acme Repair Center.';
  }
  else {
    repairInstructions = this.bicycle.repair();
  }
  return repairInstructions;
};
TimedWarrantyDecorator.prototype.getPrice = function() {
  return this.bicycle.getPrice() + (40.00 * this.coverageLength);
};



/* BellDecorator class. */

var BellDecorator = function(bicycle) { // implements Bicycle
  this.superclass.constructor(bicycle); // Call the superclass's constrcutor.
}
extend(BellDecorator, BicycleDecorator); // Extend the superclass.
BellDecorator.prototype.assemble = function() {
  return this.bicycle.assemble() + ' Attach bell to handlebars.';
};
BellDecorator.prototype.getPrice = function() {
  return this.bicycle.getPrice() + 6.00;
};
BellDecorator.prototype.ringBell = function() {
  return 'Bell rung.';
};

var myBicycle = new AcmeComfortCruiser(); // Instantiate the bicycle.
myBicycle = new BellDecorator(myBicycle); // Decorate the bicycle object 
                                          // with a bell.
alert(myBicycle.ringBell()); // Returns 'Bell rung.'

var myBicycle = new AcmeComfortCruiser(); // Instantiate the bicycle.
myBicycle = new BellDecorator(myBicycle); // Decorate the bicycle object 
                                          // with a bell.
myBicycle = new HeadlightDecorator(myBicycle); // Decorate the bicycle object
                                               // with a headlight.                                          
alert(myBicycle.ringBell()); // Method not found.



/* The BicycleDecorator abstract decorator class, improved. */

var BicycleDecorator = function(bicycle) { // implements Bicycle
  this.bicycle = bicycle;
  this.interface = Bicycle;
  
  // Loop through all of the attributes of this.bicycle and create pass-through
  // methods for any methods that aren't currently implemented.
  outerloop: for(var key in this.bicycle) {
    // Ensure that the property is a function.
    if(typeof this.bicycle[key] !== 'function') {
      continue outerloop;
    }
    
    // Ensure that the method isn't in the interface.
    for(var i = 0, len = this.interface.methods.length; i < len; i++) {
      if(key === this.interface.methods[i]) {
        continue outerloop;
      }
    }
    
    // Add the new method.
    var that = this;
    (function(methodName) {
      that[methodName] = function() {
        return that.bicycle[methodName]();
      };
    })(key); 
  }
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
