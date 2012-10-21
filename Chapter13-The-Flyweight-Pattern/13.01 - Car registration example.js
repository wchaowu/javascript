/* Car class, un-optimized. */

var Car = function(make, model, year, owner, tag, renewDate) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
  this.tag = tag;
  this.renewDate = renewDate;
};
Car.prototype = {
  getMake: function() {
    return this.make;
  },
  getModel: function() {
    return this.model;
  },
  getYear: function() {
    return this.year;
  },
  
  transferOwnership: function(newOwner, newTag, newRenewDate) {
    this.owner = newOwner;
    this.tag = newTag;
    this.renewDate = newRenewDate;
  },
  renewRegistration: function(newRenewDate) {
    this.renewDate = newRenewDate;    
  },
  isRegistrationCurrent: function() {
    var today = new Date();
    return today.getTime() < Date.parse(this.renewDate);
  }
};

 /* Car class, optimized as a flyweight. */

var Car = function(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
};
Car.prototype = {
  getMake: function() {
    return this.make;
  },
  getModel: function() {
    return this.model;
  },
  getYear: function() {
    return this.year;
  }
};

/* CarFactory singleton. */

var CarFactory = (function() {
  
  var createdCars = {};
  
  return {
    createCar: function(make, model, year) {
      // Check to see if this particular combination has been created before.
      if(createdCars[make + '-' + model + '-' + year]) {
        return createdCars[make + '-' + model + '-' + year];
      }
      // Otherwise create a new instance and save it.
      else {
        var car = new Car(make, model, year);
        createdCars[make + '-' + model + '-' + year] = car;
        return car;
      }
    }
  };
})();

/* CarRecordManager singleton. */

var CarRecordManager = (function() {
  
  var carRecordDatabase = {};
  
  return {
    // Add a new car record into the city's system. 
    addCarRecord: function(make, model, year, owner, tag, renewDate) {
      var car = CarFactory.createCar(make, model, year);
      carRecordDatabase[tag] = {
        owner: owner,
        renewDate: renewDate,
        car: car
      };
    },
    
    // Methods previously contained in the Car class.
    transferOwnership: function(tag, newOwner, newTag, newRenewDate) {
      var record = carRecordDatabase[tag];
      record.owner = newOwner;
      record.tag = newTag;
      record.renewDate = newRenewDate;
    },
    renewRegistration: function(tag, newRenewDate) {
      carRecordDatabase[tag].renewDate = newRenewDate;    
    },
    isRegistrationCurrent: function(tag) {
      var today = new Date();
      return today.getTime() < Date.parse(carRecordDatabase[tag].renewDate);
    }
  };
})();
